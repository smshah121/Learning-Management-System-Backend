import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // 1. Environment Variable for Origin (Best Practice)
  // Ensure CORS_ORIGIN is set in your Render environment variables.
  const allowedOrigin = process.env.CORS_ORIGIN || 'https://learning-management-system-app1.netlify.app';

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 2. CORS Configuration
  app.enableCors({
    origin: [allowedOrigin], // Dynamically set the allowed origin
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    preflightContinue: false, 
    optionsSuccessStatus: 204,
  });

  // 3. Cloud Deployment Listener Configuration (Correct)
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); 
  console.log(`Backend running on port ${port} with CORS enabled for: ${allowedOrigin}`);
}
bootstrap();