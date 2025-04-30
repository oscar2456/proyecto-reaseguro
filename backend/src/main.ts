import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //asi se añade el prefijo de api, proceso manual
  app.setGlobalPrefix('api');
  //swagger configuracion
  const config = new DocumentBuilder()
    .setTitle('Oscar Api')
    .setDescription('OscarBarrios')
    .setVersion('1.0')
    .addTag('Oscar')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //permito el cors para frontend
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
