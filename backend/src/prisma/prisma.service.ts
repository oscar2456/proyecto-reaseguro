import { Injectable, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})

export class PrismaService extends PrismaClient { }
