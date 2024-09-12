import { PubSubInterface } from "@/shared/interfaces/pubsub.interface";
import {
  ServiceBusClient,
  delay,
  ProcessErrorArgs,
  isServiceBusError,
  ServiceBusReceivedMessage,
  ServiceBusMessage,
} from '@azure/service-bus';

// https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_7.7.1/sdk/servicebus
const connectionString = process.env.SB_CONNECTION_STRING;
const sbClient = new ServiceBusClient(connectionString, {
  retryOptions: {
    maxRetries: 5,
    retryDelayInMs: 30000,
  },
});

export class ServiceBusThird implements PubSubInterface {
  async publish(topicName: string, body: any) {
    const sender = sbClient.createSender(topicName);
    const message : ServiceBusMessage = {
      body: body,
      contentType: 'application/json',
      applicationProperties: {
        topic_name: topicName
      }
    }
    sender.sendMessages(message);
  }

  async subscribe(topicName: string, subscriptionName: string, processMessageCallback: (message: ServiceBusReceivedMessage) => Promise<void>): Promise<void> {
    const receiver = sbClient.createReceiver(topicName, subscriptionName, {
      receiveMode: 'peekLock'
    });

    try {
      receiver.subscribe({
        processMessage: async (message: ServiceBusReceivedMessage) => {
          try {
            // Logika khusus di sini
            await processMessageCallback(message);

            // Setelah logika berhasil, complete message
            await receiver.completeMessage(message);
          } catch (error) {
            await receiver.deadLetterMessage(message);
          }
        },
        processError: async (args: ProcessErrorArgs) => {
          console.error(`Error from source ${args.errorSource}:`, args.error);

          if (isServiceBusError(args.error)) {
            switch (args.error.code) {
              case "MessagingEntityDisabled":
              case "MessagingEntityNotFound":
              case "UnauthorizedAccess":
                console.error(`Unrecoverable error occurred: ${args.error.code}`);
                break;
              case "MessageLockLost":
                console.warn("Message lock lost:", args.error);
                break;
              case "ServiceBusy":
                await delay(1000);
                break;
            }
          }
        }
      });
    } catch (err) {
      console.error("Error occurred while receiving messages:", err);
      process.exit(1);
    }
  }

  async dlq(topicName: string, subscriptionName: string): Promise<void> {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const receiver = sbClient.createReceiver(topicName, subscriptionName, {
        receiveMode: 'peekLock',
        subQueueType: 'deadLetter',
      });

      const messages = await receiver.receiveMessages(1);

      try {
        if (messages.length > 0) {
          const message = messages[0];
          console.log('DLQ START');

          // Processing logic goes here
          const sendToQueue = sbClient.createSender(topicName);
          await sendToQueue.sendMessages({
            body: message.body,
            applicationProperties: {
              subscription_name: subscriptionName
            }
          });

          await receiver.completeMessage(message);
          console.log('DLQ completed ' + topicName + ' ' + subscriptionName);
        } else {
          console.log('no message dlq');
        }
      } catch (error) {
        // logic if waktu expired dan tidak dikirim ke main queue
        console.log(error);
        console.log('error dlq to main queue');
      }

      await delay(20000);
    }
  }
}
