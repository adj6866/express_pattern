import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { container } from './infrastructure/utils/inversify.util';
import { dataSource } from './infrastructure/utils/database.util';
import { HandlerException } from './domain/exceptions/handler.exception';
import { ResposeSuccessMiddleware } from './presentation/middlewares/response-success.middleware';

async function Bootstrap() {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());
    app.use(ResposeSuccessMiddleware);
  });

  server.setErrorConfig((app) => {
    app.use(HandlerException);
  });

  const serverInstance = server.build();

  dataSource.initialize();

  serverInstance.listen(3000);
}

Bootstrap();
