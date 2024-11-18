import { injectable } from 'inversify';
import { default as pubSub } from '@/utils/pubsub.util';

@injectable()
export class AuthUserResetPassword {
  /**
   * publish topic auth-user-reset-password
   *
   * @param {Object} data - The data to be published.
   * @property {string} name - The user's name.
   * @property {string} email - The user's email.
   * @property {string} token - A unique token for password reset.
   * @property {Object} frontend - Frontend information for the password reset process.
   * @property {string} frontend.url - The frontend application's URL.
   * @property {string} frontend.pathResetPassword - The path for password reset, including the token.
   */
  public async publish(data: any) {
    await pubSub.publish('auth-user-reset-password', data);
  }
}
