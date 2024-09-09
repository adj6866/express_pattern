import {
  ServiceBusClient,
} from '@azure/service-bus';

// https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_7.7.1/sdk/servicebus
const connectionString = process.env.SB_CONNECTION_STRING;
const sbClient = new ServiceBusClient(connectionString, {
  retryOptions: {
    maxRetries: 5,
    retryDelayInMs: 30000,
  },
});

export { sbClient };
