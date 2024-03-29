import express, { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Generar especificación de Swagger
    // const outputFile = path.resolve(__dirname, '../swagger_output.json');
    // const endpointsFiles = [path.resolve(__dirname, '../routes/*.ts')];

    // Importar y usar swagger-autogen de manera asincrónica
    // const { default: swaggerAutogenInstance } = await import('swagger-autogen');
    // await swaggerAutogenInstance()(outputFile, endpointsFiles);

    // Middleware de Swagger-UI
    // const swaggerSpec = await import(outputFile);
    // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Rutas de la aplicación
    this.app.use(this.routes);

    // Iniciar servidor
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
