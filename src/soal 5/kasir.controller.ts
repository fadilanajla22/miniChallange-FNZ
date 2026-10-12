import { Controller, Post, Param, Query, Body } from '@nestjs/common';
import { KasirService } from './kasir.service.js';
import { KasirDto } from './kasir.dto.js';

@Controller('kasir')
export class KasirController {
  constructor(private readonly service: KasirService) {}

  @Post('checkout/:member')
  checkout(
    @Param('member') member: string,
    @Query('metode') metode: string,
    @Body() dto: KasirDto,
  ) {
    return this.service.checkout(member, metode, dto);
  }
}