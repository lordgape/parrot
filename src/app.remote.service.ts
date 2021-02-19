import { Injectable, Logger } from '@nestjs/common';
import { ApiClientService } from './app.api-client.service';
import { NotificationDto } from './dto/app.notification-dto';

@Injectable()
export class RemoteService {
  constructor(private apiClient: ApiClientService) {}
  async getPosts() {
    
    let response = await this.apiClient.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });

    Logger.log(`${JSON.stringify(response.data)}`, 'RemoteService-getPosts');
  }
  
  async send(notification: NotificationDto) : Promise<void>{

    let {url, payload} = notification;
    
    let response = await this.apiClient.post(url, payload);

    Logger.log(`${JSON.stringify(response.data)}`, 'RemoteService-getPosts');
  }
}
