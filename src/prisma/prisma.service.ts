import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

constructor() {
    dotenv.config({ path: resolve(process.cwd(), '.env') });

    super({
        // @ts-ignore
        datasources: {
            db: {
                url: process.env.DATABASE_URL,
            },
        },
    });
}

async onModuleInit() {
    try {
        await this.$connect();
        console.log('✅ DATABASE CONNESSO: Il ponte con MongoDB Atlas è attivo!');
    } catch (error) {
        console.error('❌ ERRORE DI CONNESSIONE AL DB:', error);
        }
    }
}