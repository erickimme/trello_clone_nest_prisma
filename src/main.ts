//src/main.ts

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join('..', 'trello_clone_nest_prisma', 'public'));
  app.setBaseViewsDir(
    join('..', 'trello_clone_nest_prisma', 'public', 'views'),
  );
  app.setViewEngine('hbs');
  // Enable CORS for frontend

  app.enableCors({
    origin: 'http://localhost:3001', // Adjust this to your frontend application's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Validation and transformation settings
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true })); // If you encounter errors, check the 'transform: true' part

  // Class serialization settings

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger settings
  const config = new DocumentBuilder()
    .setTitle('Trello Clone API')
    .setDescription('The Trello Clone API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable shutdown hooks for graceful shutdowns
  app.enableShutdownHooks();

  await app.listen(3000);
}

bootstrap();
