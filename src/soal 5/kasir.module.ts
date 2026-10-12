import { Module } from '@nestjs/common';
import { KasirController } from './kasir.controller.js';
import { KasirService } from './kasir.service.js';

@Module({
  controllers: [KasirController],
  providers: [KasirService],
})
export class KasirModule {}