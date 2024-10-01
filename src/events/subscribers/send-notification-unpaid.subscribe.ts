import { default as pubSub } from '@/utils/pubsub.util';
import { ServiceBusReceivedMessage } from '@azure/service-bus';
import RealtimeDb from '@/utils/realtime-db.util';

const topicName = 'finance-order-unpaid';
const subscriptionName = 'send-notification-unpaid';

const listen = async (): Promise<void> => {
  await pubSub.subscribe(
    topicName,
    subscriptionName,
    async (message: ServiceBusReceivedMessage) => {
      const body = message.body.payload_notification_unpaid;

      await RealtimeDb.insert(body.root, body.data);
    }
  );
};

const dlq = async (): Promise<void> => {
  await pubSub.dlq(topicName, subscriptionName);
};

export { listen, dlq };
