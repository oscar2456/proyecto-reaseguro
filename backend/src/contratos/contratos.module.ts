import { Module } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ContratosController],
  providers: [ContratosService],
  imports: [PrismaModule],
})
export class ContratosModule {}
