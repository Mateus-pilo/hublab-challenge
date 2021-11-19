import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): string {
    return `RUNNING ON PORT ${process.env.PORT}`;
  }
}
