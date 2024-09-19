import { ServiceBusThird } from "@/integrations/thrid-party/service-bus.third";

class PubSubConfig {
  private static instance: any;

  private constructor() {}

  public static getInstance() {
    if (!PubSubConfig.instance) {
      const service = process.env.PUB_SUB_SERVICE || 'azure-service-bus';
      switch (service) {
        case 'azure-service-bus':
          PubSubConfig.instance = new ServiceBusThird();
          break;
        default:
          throw new Error('Unknown PubSub service');
      }
    }
    return PubSubConfig.instance;
  }
}

export default PubSubConfig.getInstance();
