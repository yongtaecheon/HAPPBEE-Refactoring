import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // DTO에 존재하지 않는 property 전달 시 Exception
      transform: true, //controller URL 파라미터 타입 변경
    }),
  );
  await app.listen(3000);
}
bootstrap();
