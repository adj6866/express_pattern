import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from 'express';
import request from 'supertest';
import { ExampleController } from './example.controller';

describe('ExampleController', () => {
  let server: any;

  beforeAll(() => {
    const container = new Container();
    container.bind<ExampleController>(ExampleController).toSelf();

    const serverInstance = new InversifyExpressServer(container);
    serverInstance.setConfig((app) => {
      app.use(express.json());
    });

    server = serverInstance.build();
  });

  it('should return 200 OK for index route', async () => {
    const response = await request(server).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      httpCode: 200,
      data: null
    });
  });
});
