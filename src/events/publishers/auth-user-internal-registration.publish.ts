import { injectable } from 'inversify';
import { default as pubSub } from '@/utils/pubsub.util';

@injectable()
export class AuthUserInternalRegistration {
  /**
   * publish topic auth-user-internal-registration
   *
   * @param {Object} data - The data to be published.
   * @property {string} userId - The unique identifier of the user.
   * @property {string} email - The user's email address.
   * @property {string} phone - The user's phone number.
   * @property {string[]} roles - The roles of the user.
   */
  public async publish(data: any) {
    await pubSub.publish('auth-user-internal-registration', data);
  }
}
