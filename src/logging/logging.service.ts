import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: any, ...optionalParams: any[]): any {
    console.log(message);
  }

  error(message: any, ...optionalParams): any {
    console.log(message);
  }

  warn(message: any, ...optionalParams): any {
    console.log(message);
  }
}
