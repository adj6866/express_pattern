import {
  listen as listenSendNotifUnpaid,
  dlq as dlqSendNotifUnpaid,
} from './send-notification-unpaid.subscribe';
import {
  listen as listenSendEmailPaymentMethod,
  dlq as dlqSendEmailPaymentMethod,
} from './send-email-payment-method.subscribe';

const subscribes = [
  {
    listen: listenSendNotifUnpaid,
    dlq: dlqSendNotifUnpaid,
  },
  {
    listen: listenSendEmailPaymentMethod,
    dlq: dlqSendEmailPaymentMethod,
  },
];

/**
 * Executes the listen and dlq functions of each subscribe object in the subscribes array.
 *
 * @return {Promise<void>} A promise that resolves when all listen and dlq functions have been executed.
 */
export const listenSubscribes = async (): Promise<void> => {
  subscribes.forEach((subscribe) => {
    subscribe.listen();
    subscribe.dlq();
  });
};
