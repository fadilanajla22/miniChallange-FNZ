import { Injectable, BadRequestException } from '@nestjs/common';
import { KasirDto } from './kasir.dto.js';

@Injectable()
export class KasirService {
  checkout(member: string, metode: string, dto: KasirDto) {
    member = member.toLowerCase();

    if (!['reguler', 'silver', 'gold'].includes(member)) {
      throw new BadRequestException('Member tidak valid');
    }

    if (!['tunai', 'qris'].includes(metode)) {
      throw new BadRequestException('Metode tidak valid');
    }

    const items = dto?.items;

    if (!Array.isArray(items) || items.length < 1 || items.length > 10) {
      throw new BadRequestException('Items harus berisi 1 sampai 10 item');
    }

    const rincian: {
      nama: string;
      harga: number;
      qty: number;
      subtotal: number;
    }[] = [];

    let subtotal = 0;
    let totalItem = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        throw new BadRequestException(`Item ke-${i + 1} tidak valid`);
      }

      if (typeof item.nama !== 'string' || item.nama.trim() === '') {
        throw new BadRequestException(`Nama item ke-${i + 1} wajib diisi`);
      }

      if (
        typeof item.harga !== 'number' ||
        !Number.isFinite(item.harga) ||
        item.harga <= 0
      ) {
        throw new BadRequestException(`Harga item ke-${i + 1} tidak valid`);
      }

      if (
        typeof item.qty !== 'number' ||
        !Number.isInteger(item.qty) ||
        item.qty <= 0
      ) {
        throw new BadRequestException(`Qty item ke-${i + 1} tidak valid`);
      }

      const total = item.harga * item.qty;

      rincian.push({
        nama: item.nama.trim(),
        harga: item.harga,
        qty: item.qty,
        subtotal: total,
      });

      subtotal += total;
      totalItem += item.qty;
    }

    const diskonMember: Record<string, number> = {
      reguler: 0,
      silver: 5,
      gold: 10,
    };

    const diskon = subtotal * diskonMember[member] / 100;
    const setelahDiskon = subtotal - diskon;
    const biayaAdmin = metode === 'qris' ? setelahDiskon * 0.01 : 0;
    const total = setelahDiskon + biayaAdmin;

    return {
      member,
      metode,
      rincian,
      totalItem,
      subtotal,
      diskon,
      biayaAdmin,
      total,
    };
  }
}