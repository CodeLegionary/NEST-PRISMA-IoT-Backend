import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(process.cwd(), '.env') });
console.log('DEBUG: DATABASE_URL caricato? ', process.env.DATABASE_URL ? 'SÌ ✅' : 'NO ❌');

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, // Abilita CORS
  });

  // Validazione globale dei DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Rimuove campi non dichiarati nei DTO
      forbidNonWhitelisted: true, // per bloccare input extra
      transform: true,            // Converte automaticamente i tipi (es. string → number)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
  console.log('🚀 Backend running on http://localhost:3000');
}

bootstrap();
