import { Injectable, BadRequestException } from '@nestjs/common';
import { DeretDto } from './deret.dto.js';

@Injectable()
export class DeretService {
  buatDeret(jenis: string, dto: DeretDto) {
    const jumlah = Number(dto.jumlah);
    const urutan = dto.urutan || 'asc';

    if (!['ganjil', 'genap', 'kuadrat'].includes(jenis)) {
      throw new BadRequestException('Jenis tidak valid');
    }

    if (
      dto.jumlah === undefined ||
      dto.jumlah.trim() === '' ||
      !Number.isInteger(jumlah) ||
      jumlah < 1 ||
      jumlah > 20
    ) {
      throw new BadRequestException('Jumlah harus 1 sampai 20');
    }

    if (!['asc', 'desc'].includes(urutan)) {
      throw new BadRequestException('Urutan harus asc atau desc');
    }

    const data: number[] = [];
    let total = 0;

    for (let i = 1; i <= jumlah; i++) {
      let nilai = i;

      if (jenis === 'ganjil') nilai = 2 * i - 1;
      if (jenis === 'genap') nilai = 2 * i;
      if (jenis === 'kuadrat') nilai = i * i;

      data.push(nilai);
      total += nilai;
    }

    if (urutan === 'desc') data.reverse();

    return { jenis, jumlah, data, total };
  }
}