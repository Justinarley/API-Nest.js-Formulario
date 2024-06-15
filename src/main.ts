import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentation')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('items')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // Habilitar CORS
  app.enableCors();
  await app.listen(3000);

  // Configurar ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map(
          error => `${error.property} - ${Object.values(error.constraints).join(', ')}`
        );
        return new BadRequestException(errorMessages);
      },
    }),
  );
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const config = new DocumentBuilder()
//     .setTitle('Documentation')
//     .setDescription('The cats API description')
//     .setVersion('1.0')
//     .addTag('items')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('documentation', app, document);

//   app.enableCors();
//   await app.listen(3000);
// }
// bootstrap();
