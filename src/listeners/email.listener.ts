import { SbUtil, ServiceBusUtil } from "@/utils/service-bus.util";
import {
  delay,
  isServiceBusError,
  ProcessErrorArgs,
  ServiceBusReceivedMessage,
} from "@azure/service-bus";

const topicName = 'doku-create-va';
const subscriptionName = 'email'

export class EmailListener {
  async listen(): Promise<void> {
    const receiver = SbUtil.createReceiver(topicName, subscriptionName, {
      receiveMode: 'peekLock'
    });

    try {
      receiver.subscribe({
        processMessage: async(args: ServiceBusReceivedMessage) => {
          try {
            console.log('email listener process');
            // Your message processing logic here

            // throw todlq
            throw new Error(`Throw message: ${JSON.stringify(args.body)}`);

            // After processing, complete the message to remove it from the queue
            await receiver.completeMessage(args);
          } catch (error) {
            await receiver.deadLetterMessage(args)
          }
        },
        processError: async (args: ProcessErrorArgs) => {
          console.log(`Error from source ${args.errorSource} occurred: `, args.error);

          // the `subscribe() call will not stop trying to receive messages without explicit intervention from you.
          if (isServiceBusError(args.error)) {
            switch (args.error.code) {
              case "MessagingEntityDisabled":
              case "MessagingEntityNotFound":
              case "UnauthorizedAccess":
                // It's possible you have a temporary infrastructure change (for instance, the entity being
                // temporarily disabled). The handler will continue to retry if `close()` is not called on the subscription - it is completely up to you
                // what is considered fatal for your program.
                console.log(
                  `An unrecoverable error occurred. Stopping processing. ${args.error.code}`,
                  args.error
                );
                break;
              case "MessageLockLost":
                console.log(`Message lock lost for message`, args.error);
                break;
              case "ServiceBusy":
                // choosing an arbitrary amount of time to wait.
                await delay(1000);
                break;
            }
          }
        },
      });

      await delay(20000);
    } catch (err) {
      console.log("ReceiveMessagesStreaming - Error occurred: ", err);
      process.exit(1);
    }
  }

  async dlq(): Promise<void> {
    (new ServiceBusUtil).dlqProcess(topicName, subscriptionName);
  }
}
