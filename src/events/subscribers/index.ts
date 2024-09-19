import { dlq as dlqSendNotifUnpaid, listen as listenSendNotifUnpaid } from './send-notification-unpaid.subscribe';
import { dlq as dlqSendEmailPaymentMethod, listen as listenSendEmailPaymentMethod } from './send-email-payment-method.subscribe';

const subscribes = [
  {
    listen: listenSendNotifUnpaid,
    dlq: dlqSendNotifUnpaid
  },
  {
    listen: dlqSendEmailPaymentMethod,
    dlq: listenSendEmailPaymentMethod
  }
];

/**
 * Executes the listen and dlq functions of each subscribe object in the subscribes array.
 *
 * @return {Promise<void>} A promise that resolves when all listen and dlq functions have been executed.
 */
export const listenSubscribes = async (): Promise<void> => {
  subscribes.forEach(subscribe => {
    subscribe.listen();
    subscribe.dlq();
  });
}
