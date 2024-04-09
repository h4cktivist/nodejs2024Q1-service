import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(CustomLogger));
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
