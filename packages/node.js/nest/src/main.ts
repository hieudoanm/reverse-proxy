import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { writeFileSync } from 'node:fs';
import { Document } from 'yaml';
import { AppModule } from './app.module';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const buildDocument = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Nest.js')
    .setDescription('Nest.js Extensions')
    .setVersion('1.0')
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  if (NODE_ENV === 'development') {
    const swaggerPath = `./docs/swagger`;
    // JSON
    const jsonFile: string = `${swaggerPath}/swagger.json`;
    const jsonString: string = JSON.stringify(document, null, 2);
    writeFileSync(jsonFile, jsonString);
    // YAML
    const yamlDocument = new Document();
    yamlDocument.contents = document as never;
    const yamlFile: string = `${swaggerPath}/swagger.yaml`;
    const yamlString: string = yamlDocument.toString();
    writeFileSync(yamlFile, yamlString);
  }
  SwaggerModule.setup('swagger', app, document);
};

const bootstrap = async () => {
  const app: INestApplication = await NestFactory.create(AppModule);
  buildDocument(app);
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.enableVersioning({ type: VersioningType.URI });
  await app.listen(3000);
};

bootstrap();
