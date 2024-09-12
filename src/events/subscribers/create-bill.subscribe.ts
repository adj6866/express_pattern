import { pubSubConfig } from "@/config/pubsub.config";
import { ServiceBusReceivedMessage } from "@azure/service-bus";

const pubSub = pubSubConfig();
const topicName = 'finance-create-payment';
const subscriptionName = 'create-bill';

const listen = async() : Promise<void> => {
  // TODO processMessageLogic nya bisa ditaro di interface atau pubsub config
  await pubSub.subscribe(topicName, subscriptionName,  async (message: ServiceBusReceivedMessage) => {
    console.log(`Processing message from ${topicName}/${subscriptionName}`);
    console.log(`Received message: ${JSON.stringify(message.body)}`);
  });
}

const dlq = async () : Promise<void> => {
  await pubSub.dlq(topicName, subscriptionName);
}

export { listen, dlq };
