import { HttpModule, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiClient } from './app.api-client';
import { RemoteService } from './remote/remote.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ApiClient,Logger,AppService, RemoteService],
})
export class AppModule {}
