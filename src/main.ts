import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    methods: "*"
  });
  await app.listen(process.env.PORT);
  console.log(process.env.PORT)
}
bootstrap();
