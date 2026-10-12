import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BilanganModule } from './soal 1/bilangan.module';
import { SuhuModule } from './soal 2/suhu.module';
import { DeretModule } from './soal 3/deret.module';
import { NilaiModule } from './soal 4/nilai.module';
import { KasirModule } from './soal 5/kasir.module';

@Module({
  imports: [
    BilanganModule, 
    SuhuModule, 
    DeretModule,
    NilaiModule,
    KasirModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
