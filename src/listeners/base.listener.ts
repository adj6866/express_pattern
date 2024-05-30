import { EmailListener } from './email.listener';
import { OrderUnpaidListener } from './order-unpaid.listener';

export abstract class BaseListener {
  static async run(): Promise<void> {
    await Promise.all([
      (new EmailListener).listen(),
      (new EmailListener).dlq(),
      (new OrderUnpaidListener).listen(),
      (new OrderUnpaidListener).dlq()
    ]);
  }
}
