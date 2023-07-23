import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());

  const frontEndUrl: string = configService.get('FRONTEND_URL');

  app.enableCors({
    origin: [...frontEndUrl.split(' ')],
    credentials: true,
    exposedHeaders: ['x-access-token'],
  });

  await app.listen(3000);
}
bootstrap();
