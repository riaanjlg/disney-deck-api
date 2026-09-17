import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CHARACTER_WRITER } from './character-writer.interface.js';
import type { CharacterWriter } from './character-writer.interface.js';
import { DisneyApiResponse } from './disney-api.interfaces.js';

@Injectable()
export class PollingService {
  private readonly logger = new Logger(PollingService.name);
  private readonly baseUrl = 'https://api.disneyapi.dev/character';

  constructor(
    private readonly httpService: HttpService,
    @Inject(CHARACTER_WRITER) private readonly characterWriter: CharacterWriter,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncDisneyData(): Promise<void> {
    this.logger.log('Fetching characters from Disney API...');

    let page = 1;
    let hasNextPage = true;
    let totalChanged = 0;

    while (hasNextPage) {
      const { data } = await firstValueFrom(
        this.httpService
          .get<DisneyApiResponse>(this.baseUrl, { params: { page } })
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(`Disney API request failed`);
              throw error;
            }),
          ),
      );

      this.logger.log(`Synced page ${page} (${data.data.length} characters)`);

      const changedCount = await this.characterWriter.upsertMany(data.data);
      totalChanged += changedCount;

      hasNextPage = Boolean(data.info.nextPage);
      page++;
    }

    this.logger.log(`Sync successful (${totalChanged} characters changed)`);
  }
}
