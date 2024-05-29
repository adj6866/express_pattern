import { ServiceBusClient } from '@azure/service-bus';

// https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_7.7.1/sdk/servicebus
const connectionString = process.env.SB_CONNECTION_STRING;
export const SbUtil = new ServiceBusClient(connectionString, {
  retryOptions: {
    maxRetries: 5,
    retryDelayInMs: 30000,
  },
});

// blob storage, dll configuration in here
