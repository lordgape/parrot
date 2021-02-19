import { Injectable, Logger } from '@nestjs/common';
import { MySubscription } from './app.my.subscription.model';
import { RemoteService } from './app.remote.service';
import { NotificationDto } from './dto/app.notification-dto';
import { SubscriptionDto } from './dto/app.subscription-dto';

@Injectable()
export class AppService {
  // In a real life project we will use a DB
  private subscriptionList: object;

  constructor(private readonly logger: Logger, private readonly remoteService: RemoteService) {
    this.subscriptionList = {};
  }

  async getHealth(): Promise<string> {
    return 'Parrot - Your Http Notification Service is Green';
  }

  async subscribe(subscriptionDto: SubscriptionDto, topic: string): Promise<MySubscription> {
    let { url } = subscriptionDto;
    const mySub: MySubscription = {
      url,
      topic,
    };

    await this.addToSubscriptionList(mySub);

    this.logger.log(`New consumer ${url} subscribe to ${topic}`, 'AppService-subscribe');

    return mySub;
  }

  async getSubscriberByTopic(topic: string): Promise<Array<string>> {
    if (this.subscriptionList[topic]) {
      return this.subscriptionList[topic];
    }

    return [];
  }

  async publishTopic(topic: string, payload: object): Promise<object> {
    const allSubscribers = await this.getSubscriberByTopic(topic);

    const promisifiedSubscribers = allSubscribers.map((url) => {
      let notification: NotificationDto = {
        url,
        payload,
      };
      return this.remoteService.send(notification).then((response) => {
        this.logger.log(`${url} - has be Notified`);
      }).catch((err) => {
        this.logger.log(`We try reaching Subcriber ${url} but no luck`);
      });
    });

    await Promise.all(allSubscribers);

    return { Success: 'Notified subscribers' };
  }

  private async addToSubscriptionList(subscription: MySubscription) {
    const { url, topic } = subscription;
    if (this.subscriptionList[topic]) {
      this.subscriptionList[topic].includes(url) ? null : this.subscriptionList[topic].push(url); // Ensure subscriber is only added once
    } else {
      this.subscriptionList[topic] = [url];
    }
  }
}
