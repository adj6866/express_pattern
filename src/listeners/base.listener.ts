import { EmailListener } from './email.listener';
import { OrderUnpaidListener } from './order-unpaid.listener';

export class BaseListener {
  static async run(): Promise<void> {
    await Promise.all([
      EmailListener.listen(),
      // EmailListener.dlq(),
      OrderUnpaidListener.listen(),
    ]);
  }
}
