import { HttpService, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiClient {
  constructor(private httpService: HttpService, private logger: Logger) {}

  async get(url: string, headers?: object): Promise<any> {
    headers = headers ? headers : { 'Content-Type': 'application/json' };
    try {
      const response = await this.httpService.get(url, { headers }).toPromise();

      this.logger.log(
        `GET URL: ${url} - 
        httpstatus: ${response.status}(${response.statusText.toUpperCase()}) - 
        RESPONSE: ${JSON.stringify(response.data)}`,
        'ApiClient-get',
      );

      return response;
    } catch (error) {
      this.logger.log(
        `GET URL: ${url} - ERROR: ${error.code} ${error.message} ${JSON.stringify(error.response)}`,
        'ApiClient-get',
      );
      throw error;
    }
  }

  async post(url: string, body: object, headers?: object): Promise<any> {
    headers = headers ? headers : { 'Content-Type': 'application/json' };
    try {
      const response = await this.httpService
        .post(url, body, {
          headers,
        })
        .toPromise();

      this.logger.log(
        `POST URL: ${url} - 
        httpstatus: ${response.status}(${response.statusText.toUpperCase()}) - 
        RESPONSE: ${JSON.stringify(response.data)}`,
        'ApiClient-post',
      );
      return response;
    } catch (error) {
      this.logger.log(
        `POST URL: ${url} - 
        ERROR: ${error.code} ${error.message} ${JSON.stringify(error.response)}`,
        'ApiClient-post',
      );
      throw error;
    }
  }
}
