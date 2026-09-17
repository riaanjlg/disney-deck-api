import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PollingService } from './polling.service.js';

@Controller('polling')
export class PollingController {
  constructor(private readonly pollingService: PollingService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async syncDisneyData(): Promise<void> {
    await this.pollingService.syncDisneyData();
  }
}
