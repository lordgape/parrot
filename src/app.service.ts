import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MySubscription } from './app.my.subscription.model';
import { SubscriptionDto } from './dto/app.subscription-dto';

@Injectable()
export class AppService {
  // In a real life project we will use a DB
  private subscriptionList: object;

  constructor(private readonly logger: Logger) {
    this.subscriptionList = {};
  }

  async getHealth(): Promise<string> {
    return 'Publisher server is well and alive';
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
  
  async getSubscriberByTopic(topic: string): Promise<Array<MySubscription>> {
    
    if(this.subscriptionList[topic])
    {
       return this.subscriptionList[topic]
    }
    
    return [];
  }

  async publishTopic(topic:string) : Promise<object> {
    const subscriber = this.getSubscriberByTopic(topic);

    return {}
  }

  private async addToSubscriptionList(subscription: MySubscription) {
    const { url, topic } = subscription;
    if (this.subscriptionList[topic]) {
      this.subscriptionList[topic].includes(url) ? null : this.subscriptionList[topic].push(url) ; // Ensure subscriber is only added once
    } else {
      this.subscriptionList[topic] = [url];
    }
  }
}
