import { default as pubSub } from "@/config/pubsub.config";
import { ServiceBusReceivedMessage } from "@azure/service-bus";

const topicName = 'finance-order-unpaid';
const subscriptionName = 'send-notification-unpaid';

const listen = async() : Promise<void> => {
  await pubSub.subscribe(topicName, subscriptionName,  async (message: ServiceBusReceivedMessage) => {
    console.log(`Processing message from ${topicName}/${subscriptionName}`);
    console.log(`Received message: ${JSON.stringify(message.body)}`);
  });
}

const dlq = async () : Promise<void> => {
  await pubSub.dlq(topicName, subscriptionName);
}

export { listen, dlq };
