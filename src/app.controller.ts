import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MySubscription } from './app.my.subscription.model';
import { AppService } from './app.service';
import { SubscriptionDto } from './dto/app.subscription-dto';
import { RemoteService } from './app.remote.service';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationDto } from './dto/app.notification-dto';
import { PublishDto } from './dto/app.publish.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private remoteService: RemoteService) {}

  @Get()
  async getHealth(): Promise<string> {
    return this.appService.getHealth();
  }

  
  @MessagePattern('subscribe')
  async subscribe(sub: MySubscription): Promise<MySubscription> {
    return this.appService.subscribe(sub);
  }


  @MessagePattern('subscriptions')
  async getSubscribersByTopic(topic: string): Promise<Array<string>> {
    return this.appService.getSubscriberByTopic(topic);
  }

  @MessagePattern('publish')
  async publishTopic(data: PublishDto): Promise<object> {
    const {topic, payload} = data
    return this.appService.publishTopic(topic, payload);
  }
}
