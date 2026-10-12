import { BadRequestException, Injectable } from "@nestjs/common";
import { BilanganDto } from "./bilangan.dto";

@Injectable()
export class BilanganService {
    cekBilangan(dto: BilanganDto) {
        const n = Number(dto.angka);

        if (
            dto.angka.trim() === "" ||
            !Number.isInteger(n) ||
            n < 1 ||
            n > 100
        ) {
            throw new BadRequestException(
                
                "Input harus berupa bilangan bulat antara 1 hingga 100"
            );
        }

        return {
            angka: n,
            jenis: n % 2 === 0 ? "genap" : "ganjil",
            kuadrat: n * n,
            kelipatanLima: n % 5 === 0,
        }
    }
}