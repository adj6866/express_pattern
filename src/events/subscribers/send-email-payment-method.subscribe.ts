import { listenProcess, dlqProcess } from "@/integrations/thrid-party/service-bus.thrid";
import { ServiceBusReceivedMessage } from "@azure/service-bus";

const topicName = 'finance-create-payment';
const subscriptionName = 'send-email-payment-method';

const listen = async() : Promise<void> => {
  const processMessageLogic = async (message: ServiceBusReceivedMessage) => {
    console.log(`from ${topicName}/${subscriptionName} sent to DLQ ${message.messageId}`);
    // Tambahkan logika khusus yang diinginkan di sini
    // throw new Error('test error');
  };

  // Call the generic listener
  await listenProcess(topicName, subscriptionName, processMessageLogic);
}

const dlq = async () : Promise<void> => {
  await dlqProcess(topicName, subscriptionName);
}

export { listen, dlq };
