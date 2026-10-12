import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeretService } from './deret.service.js';
import { DeretDto } from './deret.dto.js';

@Controller('deret')
export class DeretController {
  constructor(private readonly service: DeretService) {}

  @Get(':jenis')
  buatDeret(
    @Param('jenis') jenis: string,
    @Query('jumlah') jumlah: string,
    @Query('urutan') urutan?: string,
  ) {
    const dto: DeretDto = { jumlah, urutan };
    return this.service.buatDeret(jenis, dto);
  }
}