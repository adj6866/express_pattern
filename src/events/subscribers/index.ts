import { dlq as createBillDlq, listen as createBillListen } from './create-bill.subscribe';
import { dlq as sendEmailPaymentDlq, listen as sendEmailPaymentListen } from './send-email-payment-method.subscribe';

const subscribes = [
  {
    listen: createBillListen,
    dlq: createBillDlq
  },
  {
    listen: sendEmailPaymentDlq,
    dlq: sendEmailPaymentListen
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
