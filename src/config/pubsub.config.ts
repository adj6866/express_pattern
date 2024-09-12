import { ServiceBusThird } from "@/integrations/thrid-party/service-bus.third";

export function pubSubConfig() {
  const service = process.env.PUB_SUB_SERIVCE || 'azure-service-bus'
  switch (service) {
    case 'azure-service-bus':
      return new ServiceBusThird();
    default:
      throw new Error('Unknown PubSub service');
  }
}
