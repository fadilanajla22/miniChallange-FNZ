import { Module } from '@nestjs/common';
import { BilanganController } from './bilangan.controller.js';
import { BilanganService } from './bilangan.service.js';

@Module({
  controllers: [BilanganController],
  providers: [BilanganService],
})
export class BilanganModule {}