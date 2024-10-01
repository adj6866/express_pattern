import { ServiceBusThird } from '@/integrations/thrid-party/service-bus.third';

class PubSub {
  private static instance: any;

  private constructor() {}

  public static getInstance() {
    if (!PubSub.instance) {
      const service = process.env.PUB_SUB_SERVICE || 'azure-service-bus';
      switch (service) {
        case 'azure-service-bus':
          PubSub.instance = new ServiceBusThird();
          break;
        default:
          throw new Error('Unknown PubSub service');
      }
    }
    return PubSub.instance;
  }
}

export default PubSub.getInstance();
