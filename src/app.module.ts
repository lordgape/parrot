import { HttpModule, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RemoteService } from './app.remote.service';
import { ApiClientService } from './app.api-client.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [ApiClientService, Logger, RemoteService, AppService],
})
export class AppModule {}
