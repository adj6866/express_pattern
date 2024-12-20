import { PubSubInterface } from '@/shared/interfaces/pubsub.interface';
import {
  ServiceBusClient,
  delay,
  ProcessErrorArgs,
  isServiceBusError,
  ServiceBusReceivedMessage,
  ServiceBusMessage,
} from '@azure/service-bus';
import moment from 'moment';

export class ServiceBusThird implements PubSubInterface {
  private static sbClient: ServiceBusClient;

  private static getClient(): ServiceBusClient {
    // https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_7.7.1/sdk/servicebus
    const connectionString = process.env.SB_CONNECTION_STRING;
    if (!ServiceBusThird.sbClient) {
      ServiceBusThird.sbClient = new ServiceBusClient(connectionString, {
        retryOptions: {
          maxRetries: 5,
          retryDelayInMs: 30000,
        },
      });
    }

    return ServiceBusThird.sbClient;
  }

  async publish(topicName: string, body: any) {
    const sbClient = ServiceBusThird.getClient();
    const sender = sbClient.createSender(topicName);

    const adjustBody = {
      ...body,
      publishedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const message: ServiceBusMessage = {
      body: adjustBody,
      contentType: 'application/json',
      applicationProperties: {
        topic_name: topicName,
      },
    };
    sender.sendMessages(message);
  }

  async subscribe(
    topicName: string,
    subscriptionName: string,
    processMessageCallback: (
      message: ServiceBusReceivedMessage
    ) => Promise<void>
  ): Promise<void> {
    const sbClient = ServiceBusThird.getClient();
    const receiver = sbClient.createReceiver(topicName, subscriptionName, {
      receiveMode: 'peekLock',
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
              case 'MessagingEntityDisabled':
              case 'MessagingEntityNotFound':
              case 'UnauthorizedAccess':
                console.error(
                  `Unrecoverable error occurred: ${args.error.code}`
                );
                break;
              case 'MessageLockLost':
                console.warn('Message lock lost:', args.error);
                break;
              case 'ServiceBusy':
                await delay(1000);
                break;
            }
          }
        },
      });
    } catch (err) {
      console.error('Error occurred while receiving messages:', err);
      process.exit(1);
    }
  }

  async dlq(topicName: string, subscriptionName: string): Promise<void> {
    const sbClient = ServiceBusThird.getClient();
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
          const publishedAt = message.body?.publishedAt
            ? message.body.publishedAt
            : null;

          if (
            publishedAt !== null &&
            moment(publishedAt).add(20, 'minutes').isBefore(moment())
          ) {
            console.log(
              'message expired ' + topicName + ' ' + subscriptionName
            );
            await receiver.completeMessage(message);
          } else {
            const sendToQueue = sbClient.createSender(topicName);
            await sendToQueue.sendMessages({
              body: message.body,
              applicationProperties: {
                subscription_name: subscriptionName,
              },
            });

            console.log('DLQ completed ' + topicName + ' ' + subscriptionName);
            await receiver.completeMessage(message);
          }
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
