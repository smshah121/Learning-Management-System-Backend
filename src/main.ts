import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: ["https://68d906ee690c9616573101e5--singular-toffee-702de6.netlify.app/"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // allows cookies/auth headers
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // crucial for cloud deployment
  console.log(`Backend running on port ${port}`);
}
bootstrap();
