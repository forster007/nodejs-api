import { ServiceBusClient, ServiceBusMessageBatch, ServiceBusSender } from "@azure/service-bus";
import EventEmitter from "events";
import Queues from "../config/queues.config.json";

interface ServiceBusProps {
  logger: any;
  queueName: string;
}

class ServiceBus extends EventEmitter {
  batch: ServiceBusMessageBatch;
  connection: ServiceBusClient;
  sender: ServiceBusSender;
  logger: any;
  queueName: string;

  constructor(options: ServiceBusProps = {} as ServiceBusProps) {
    super();
    this.logger = options.logger;
    this.queueName = options.queueName;
    this.connection = new ServiceBusClient(process.env.SERVICE_BUS);
    this.sender = this.connection.createSender(this.queueName);
  }

  async sendToQueue(body: any) {
    await this.sender.sendMessages({ body });

    this.sender.close();
    this.connection.close();
  }
}

export default {
  villelaBrasilQueueOne: (logger: any) => new ServiceBus({ logger, queueName: Queues.villelaBrasilQueueOne }),
};
