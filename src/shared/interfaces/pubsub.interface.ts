export interface PubSubInterface {
  publish(topicName: string, body: any);
  subscribe(topicName: string, subscriptionName: string, processMessageCallback: any);
  dlq(topicName: string, subscriptionName: string): Promise<void>;
}
