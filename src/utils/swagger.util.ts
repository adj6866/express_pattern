import swaggerJsdoc from "swagger-jsdoc";
import { Application, Request, Response } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: process.env.APP_URL,
      version: "4.0.0",
    },
    servers: [
      {
        url: process.env.APP_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/features/**/*/*.controller.ts", "./src/controllers/*.controller.ts"],
};

const swaggerDocs = swaggerJsdoc(options);

export const SwaggerBuild =  (app: Application) => {
  app.use('/efe9c963-6e6d-4a3e-9a38-332ce62f4c79', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
 });
}
