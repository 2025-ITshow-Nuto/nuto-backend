import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/nuto.mirim-it-show.site/privkey.pem',
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/live/nuto.mirim-it-show.site/fullchain.pem',
    ),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: ['http://localhost:3001', 'https://nuto-frontend.vercel.app'],
    credentials: true,
  });

  const options = new DocumentBuilder()
    .setTitle('Nuto-API')
    .setDescription('2025 It show NUTO')
    .setVersion('1.0')
    .addServer('api/', 'Local environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(443, '0.0.0.0');
}
bootstrap();
