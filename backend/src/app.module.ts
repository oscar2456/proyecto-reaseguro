import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ContratosModule } from './contratos/contratos.module';

@Module({
  imports: [PrismaModule, ContratosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
