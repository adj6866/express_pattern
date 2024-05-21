import 'dotenv/config';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { container } from '@/utils/inversify.util';
import { dataSource } from '@/utils/database.util';
import { HandlerException } from '@/exceptions/handler.exception';
import { ResposeSuccessMiddleware } from '@/middlewares/response-success.middleware';

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
