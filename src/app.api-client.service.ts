import { HttpService, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiClientService {
    constructor(private httpService: HttpService) {}

  async get(url: string, headers?: object): Promise<any> {
    headers = headers ? headers : { 'Content-Type': 'application/json' };
    try {
      const response = await this.httpService.get(url, { headers }).toPromise();

      Logger.log(
        `GET URL: ${url} - 
        httpstatus: ${response.status}(${response.statusText.toUpperCase()}) - 
        RESPONSE: ${JSON.stringify(response.data)}`,
        'ApiClient-get',
      );

      return response;
    } catch (error) {
      Logger.log(
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

      Logger.log(
        `POST URL: ${url} - 
        httpstatus: ${response.status}(${response.statusText.toUpperCase()}) - 
        RESPONSE: ${JSON.stringify(response.data)}`,
        'ApiClient-post',
      );
      return response;
    } catch (error) {
      Logger.log(
        `POST URL: ${url} - 
        ERROR: ${error.code} ${error.message} ${JSON.stringify(error.response)}`,
        'ApiClient-post',
      );
      throw error;
    }
  }
}
