import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { NilaiService } from './nilai.service.js';
import { NilaiDto } from './nilai.dto.js';

@Controller('nilai')
export class NilaiController {
  constructor(private readonly service: NilaiService) {}

  @Post('hitung')
  @HttpCode(200)
  hitung(@Body() dto: NilaiDto) {
    return this.service.hitung(dto);
  }
}