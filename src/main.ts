import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  console.log('NestJS server is starting...');
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.allowedOrigin,
      credentials: true,
    },
  });
  
app.use(cookieParser());
  const config = new DocumentBuilder()
  .setTitle('Ocso API')
  .setDescription('Api for ocso management')
  .setVersion('0.9')
  .addBearerAuth()
  .build();
const documentFactory = () => SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted : true,
    transform: true
  }));
  //await app.listen(process.env.PORT ?? 3000);
  await app.listen(4000);
}
bootstrap();
