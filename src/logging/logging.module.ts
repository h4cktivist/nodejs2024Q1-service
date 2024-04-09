import { Module } from '@nestjs/common';
import { CustomLogger } from './logging.service';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggingModule {}
