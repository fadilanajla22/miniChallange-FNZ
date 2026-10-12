import { Injectable, BadRequestException } from '@nestjs/common';
import { SuhuDto } from './suhu.dto.js';

@Injectable()
export class SuhuService {
  konversi(dto: SuhuDto) {
    const { nilai, dari, ke } = dto;
    const n = Number(nilai);
    const satuan = ['celsius', 'fahrenheit', 'kelvin'];

    if (nilai === undefined || nilai.trim() === '' || !Number.isFinite(n)) {
      throw new BadRequestException('Nilai harus berupa angka');
    }

    if (!satuan.includes(dari) || !satuan.includes(ke) || dari === ke) {
      throw new BadRequestException('Satuan tidak valid');
    }

    if (n < 0 && dari === 'kelvin') {
      throw new BadRequestException('Kelvin tidak boleh kurang dari 0');
    }

    let c = n;

    if (dari === 'fahrenheit') c = (n - 32) * 5 / 9;
    if (dari === 'kelvin') c = n - 273.15;

    let hasil = c;

    if (ke === 'fahrenheit') hasil = c * 9 / 5 + 32;
    if (ke === 'kelvin') hasil = c + 273.15;

    hasil = Math.round(hasil * 100) / 100;

    return { nilaiAsal: n, satuanAsal: dari, hasil, satuanHasil: ke };
  }
}