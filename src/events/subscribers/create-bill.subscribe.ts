import { listenProcess, dlqProcess } from "@/integrations/thrid-party/service-bus.thrid";
import { ServiceBusReceivedMessage } from "@azure/service-bus";

const topicName = 'finance-create-payment';
const subscriptionName = 'create-bill';

const listen = async() : Promise<void> => {
  const processMessageLogic = async (message: ServiceBusReceivedMessage) => {
    console.log(`Processing message from ${topicName}/${subscriptionName}`);
    console.log(`Received message: ${JSON.stringify(message.body)}`);
    // Tambahkan logika khusus yang diinginkan di sini
  };

  // Call the generic listener
  await listenProcess(topicName, subscriptionName, processMessageLogic);
}

const dlq = async () : Promise<void> => {
  await dlqProcess(topicName, subscriptionName);
}

export { listen, dlq };
