import { HttpModule, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiClientService } from './app.api-client.service';
import { AppController } from './app.controller';
import { RemoteService } from './app.remote.service';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [ApiClientService, RemoteService, AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should have a good health check"', async () => {
      expect(await appController.getHealth()).toBe('Parrot - Your Http Notification Service is Green');
    });
  });
});
