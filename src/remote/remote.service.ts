import { Injectable, Logger } from '@nestjs/common';
import { ApiClient } from 'src/app.api-client';

@Injectable()
export class RemoteService {
  constructor(private logger:Logger, private apiClient: ApiClient) {}

  async getPosts() {
      let response =  await this.apiClient.post("https://jsonplaceholder.typicode.com/posts",{
        "title": 'foo',
        "body": 'bar',
        "userId": 1,
      },);

      this.logger.log(`${JSON.stringify(response.data)}`, "RemoteService-getPosts");
      
  }
}
