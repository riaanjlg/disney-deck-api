import { Module } from '@nestjs/common';
import { PollingService } from './polling.service.js';
import { HttpModule } from '@nestjs/axios';
import { CHARACTER_WRITER } from './character-writer.interface.js';
import { CharactersService } from '../characters/characters.service.js';
import { CharactersModule } from '../characters/characters.module.js';
import { PollingController } from './polling.controller.js';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CharactersModule,
  ],
  providers: [
    PollingService,
    { provide: CHARACTER_WRITER, useExisting: CharactersService },
  ],
  controllers: [PollingController],
})
export class PollingModule {}
