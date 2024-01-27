import swaggerAutogen from 'swagger-autogen';
import swaggerJsdoc from 'swagger-jsdoc';

interface SwaggerOptions {
  title: string;
  version: string;
  description: string;
}

export class SwaggerDefinition {
  private swaggerDefinition: swaggerJsdoc.Options;

  constructor({ title, version, description }: SwaggerOptions) {
    this.swaggerDefinition = {
      definition: {
        openapi: '3.1.0',
        info: {
          title,
          version,
          description,
        },
      },
      host: 'localhost:3100',
      apis: ['./routes/*.ts'],
    };
  }

  generateDocs(outputFile: string, endpointsFiles: string[]) {
    return swaggerAutogen()(outputFile, endpointsFiles, this.swaggerDefinition);
  }

  //   getDefinition(): swaggerJsdoc.Options {
  //     return this.swaggerDefinition;
  //   }
}
