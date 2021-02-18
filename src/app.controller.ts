import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MySubscription } from './app.my.subscription.model';
import { AppService } from './app.service';
import { SubscriptionDto } from './dto/app.subscription-dto';
import { RemoteService } from './remote/remote.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private remoteService: RemoteService) {}

  @Get()
  async getHealth(): Promise<string> {
    return this.appService.getHealth();
  }

  @Post('/subscribe/:topic')
  async subscribe(@Body() subcriptionDto: SubscriptionDto, @Param('topic') topic: string): Promise<MySubscription> {
    return this.appService.subscribe(subcriptionDto, topic);
  }

  @Get('/subscribe/:topic')
  async getSubscribersByTopic(@Param('topic') topic: string): Promise<Array<MySubscription>> {
    return this.appService.getSubscriberByTopic(topic);
  }

  @Post('/publish/:topic')
  async publishTopic(@Param('topic') topic: string): Promise<object> {
    return this.appService.publishTopic(topic);
  }
}
