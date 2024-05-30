import { ServiceBusClient, delay } from '@azure/service-bus';

// https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_7.7.1/sdk/servicebus
const connectionString = process.env.SB_CONNECTION_STRING;
export const SbUtil = new ServiceBusClient(connectionString, {
  retryOptions: {
    maxRetries: 5,
    retryDelayInMs: 30000,
  },
});

export class ServiceBusUtil {
  async dlqProcess(topicName: string, subscriptionName: string): Promise<void> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const receiver = SbUtil.createReceiver(topicName, subscriptionName, {
      receiveMode: 'peekLock',
      subQueueType: 'deadLetter',
    });

    const messages = await receiver.receiveMessages(1);

    try {
      if (messages.length > 0) {
        const message = messages[0];
        console.log('DLQ START');

        // Processing logic goes here
        const sendToQueue = SbUtil.createSender(topicName);
        await sendToQueue.sendMessages({
          body: message.body,
          applicationProperties: {
            subscribe: subscriptionName
          }
        });

        await receiver.completeMessage(message);
        console.log('DLQ completed ' + topicName + subscriptionName);
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

// blob storage, dll configuration in here
