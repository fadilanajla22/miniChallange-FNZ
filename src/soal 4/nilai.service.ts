import { Injectable, BadRequestException } from '@nestjs/common';
import { NilaiDto } from './nilai.dto.js';

@Injectable()
export class NilaiService {
  hitung(dto: NilaiDto) {
    const { nama, tugas, uts, uas } = dto;

    if (typeof nama !== 'string' || nama.trim() === '') {
      throw new BadRequestException('Nama wajib diisi');
    }

    if (!Array.isArray(tugas) || tugas.length === 0) {
      throw new BadRequestException('Tugas wajib diisi');
    }

    for (const n of tugas) {
      if (typeof n !== 'number' || !Number.isFinite(n) || n < 0 || n > 100) {
        throw new BadRequestException('Nilai tugas harus 0 sampai 100');
      }
    }

    if (
      typeof uts !== 'number' || !Number.isFinite(uts) ||
      uts < 0 || uts > 100
    ) {
      throw new BadRequestException('Nilai UTS tidak valid');
    }

    if (
      typeof uas !== 'number' || !Number.isFinite(uas) ||
      uas < 0 || uas > 100
    ) {
      throw new BadRequestException('Nilai UAS tidak valid');
    }

    const rataTugas =
      tugas.reduce((total, n) => total + n, 0) / tugas.length;

    const nilaiAkhir = Math.round(
      (rataTugas * 0.3 + uts * 0.3 + uas * 0.4) * 100,
    ) / 100;

    let predikat = 'D';

    if (nilaiAkhir >= 90) predikat = 'A';
    else if (nilaiAkhir >= 80) predikat = 'B';
    else if (nilaiAkhir >= 70) predikat = 'C';

    return {
      nama: nama.trim(),
      rataTugas: Math.round(rataTugas * 100) / 100,
      nilaiAkhir,
      predikat,
      status: nilaiAkhir >= 75 ? 'Lulus' : 'Remedial',
    };
  }
}