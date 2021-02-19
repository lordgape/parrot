import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MySubscription } from './app.my.subscription.model';
import { AppService } from './app.service';
import { SubscriptionDto } from './dto/app.subscription-dto';
import { RemoteService } from './app.remote.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private remoteService: RemoteService) {}

  @Get()
  async getHealth(): Promise<string> {
    return this.appService.getHealth();
  }

  // @Post('/subscribe/:topic')
  @MessagePattern('subscribe')
  async subscribe(data: MySubscription): Promise<MySubscription> {
    return this.appService.subscribe(data);
  }

  @Get('/subscribe/:topic')
  async getSubscribersByTopic(@Param('topic') topic: string): Promise<Array<string>> {
    return this.appService.getSubscriberByTopic(topic);
  }

  @Post('/publish/:topic')
  async publishTopic(@Param('topic') topic: string, @Body() payload: object): Promise<object> {
    return this.appService.publishTopic(topic, payload);
  }
}
