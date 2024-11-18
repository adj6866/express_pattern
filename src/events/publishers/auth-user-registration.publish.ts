import { injectable } from 'inversify';
import { default as pubSub } from '@/utils/pubsub.util';

@injectable()
export class AuthUserRegistration {
  /**
   * publish topic auth-user-registration
   * subscription send-email-activation
   * subscription create-profile-vendor
   *
   * @param {Object} data - The data to be published.
   * @property {string} userId - The unique identifier of the user.
   * @property {string} email - The user's email address.
   * @property {boolean} isIndividual - Indicates whether the user is an individual.
   * @property {string|null} ownerName - The owner's name (or null if not applicable).
   * @property {string|null} businessEntity - The business entity type (or null if not applicable).
   * @property {string|null} trademarkName - The trademark name (or null if not applicable).
   * @property {string|null} companyName - The company name (or null if not applicable).
   */
  public async publish(data: any) {
    await pubSub.publish('auth-user-registration', data);
  }
}
