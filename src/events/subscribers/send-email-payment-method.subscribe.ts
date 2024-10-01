import * as path from 'path';
import { default as pubSub } from '@/utils/pubsub.util';
import { ServiceBusReceivedMessage } from '@azure/service-bus';
import { default as email, renderBody } from '@/utils/email.util';

const topicName = 'finance-order-unpaid';
const subscriptionName = 'send-email-payment-method';

const listen = async (): Promise<void> => {
  await pubSub.subscribe(
    topicName,
    subscriptionName,
    async (message: ServiceBusReceivedMessage) => {
      const body = message.body.payload_email;
      const { to, ...bodyEmail } = body;

      await email.send(
        {
          to: body.to,
          subject: 'Astra Car Valuation - Pelunasan Pembayaran Inspeksi',
        },
        await renderBody(
          path.resolve(
            __dirname,
            '../../shared/resources/emails/payment-method-virtual-account.ejs'
          ),
          {
            data: bodyEmail,
          }
        )
      );
    }
  );
};

const dlq = async (): Promise<void> => {
  await pubSub.dlq(topicName, subscriptionName);
};

export { listen, dlq };
