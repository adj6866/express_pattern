import {
  delay,
  ProcessErrorArgs,
  ServiceBusClient,
  isServiceBusError,
  ServiceBusReceivedMessage,
} from '@azure/service-bus';

// https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_7.7.1/sdk/servicebus
const connectionString = process.env.SB_CONNECTION_STRING;
const sbClient = new ServiceBusClient(connectionString, {
  retryOptions: {
    maxRetries: 5,
    retryDelayInMs: 30000,
  },
});

/**
 * Listens to a Service Bus topic and processes incoming messages.
 *
 * @param {string} topicName - The name of the Service Bus topic to listen to.
 * @param {string} subscriptionName - The name of the subscription to use.
 * @param {(message: ServiceBusReceivedMessage) => Promise<void>} processMessageCallback - A callback function to process incoming messages.
 * @return {Promise<void>} A promise that resolves when the listening process is complete.
 */
const listenProcess = async(
  topicName: string,
  subscriptionName: string,
  processMessageCallback: (message: ServiceBusReceivedMessage) => Promise<void>
): Promise<void> => {
  const receiver = sbClient.createReceiver(topicName, subscriptionName, {
    receiveMode: 'peekLock'
  });

  try {
    receiver.subscribe({
      processMessage: async (message: ServiceBusReceivedMessage) => {
        try {
          console.log(`Processing message from ${topicName}/${subscriptionName}`);

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

    await delay(20000);
  } catch (err) {
    console.error("Error occurred while receiving messages:", err);
    process.exit(1);
  }
}

/**
 * Processes dead-letter queue (DLQ) messages for a specified topic and subscription.
 *
 * @param {string} topicName - The name of the topic to process DLQ messages for.
 * @param {string} subscriptionName - The name of the subscription to process DLQ messages for.
 * @return {Promise<void>} A promise that resolves when the DLQ processing is complete.
 */
const dlqProcess = async(topicName: string, subscriptionName: string): Promise<void> => {
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

export { sbClient, listenProcess, dlqProcess };
