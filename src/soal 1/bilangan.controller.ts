import { Controller, Get, Param } from "@nestjs/common";
import { BilanganService } from "./bilangan.service";

@Controller("bilangan")
export class BilanganController {
    constructor(private readonly service: BilanganService) {}

    @Get(':angka')
    cekBilangan(@Param('angka') angka: string) {
        return this.service.cekBilangan({ angka });
    }
}