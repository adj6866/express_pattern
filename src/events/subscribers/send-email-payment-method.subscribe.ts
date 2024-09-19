import { default as pubSub } from "@/config/pubsub.config";
import { ServiceBusReceivedMessage } from "@azure/service-bus";

const topicName = 'finance-order-unpaid';
const subscriptionName = 'send-email-payment-method';

const listen = async() : Promise<void> => {
  await pubSub.subscribe(topicName, subscriptionName, async(message: ServiceBusReceivedMessage) => {
    console.log(`dlq ${JSON.stringify(message.body)} ${topicName}/${subscriptionName}`);
    // Tambahkan logika khusus yang diinginkan di sini
    throw new Error('test error');
  });
}

const dlq = async () : Promise<void> => {
  await pubSub.dlq(topicName, subscriptionName);
}

export { listen, dlq };
