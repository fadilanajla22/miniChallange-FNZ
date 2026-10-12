import { Controller, Get, Query } from '@nestjs/common';
import { SuhuService } from './suhu.service.js';
import { SuhuDto } from './suhu.dto.js';

@Controller('suhu')
export class SuhuController {
  constructor(private readonly service: SuhuService) {}

  @Get('konversi')
  konversi(
    @Query('nilai') nilai: string,
    @Query('dari') dari: string,
    @Query('ke') ke: string,
  ) {
    const dto: SuhuDto = { nilai, dari, ke };
    return this.service.konversi(dto);
  }
}