import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';




const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: '172.25.0.25',
    port: 8877,
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  await app.listen(() => Logger.log(`Parrot - Your HTTP Notification server is listening... `,"Main"));
}
bootstrap();
