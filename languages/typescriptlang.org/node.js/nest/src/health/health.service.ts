import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus(): { status: string } {
    return { status: 'OK' };
  }
}
