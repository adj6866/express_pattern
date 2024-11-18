import 'dotenv/config';
import cors from 'cors';
import 'reflect-metadata';
import morgan from 'morgan';
import helmet from 'helmet';
import retry from 'async-retry';
import moment from 'moment-timezone';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import { container, dataSource } from '@/utils';
import { InversifyExpressServer } from 'inversify-express-utils';
import { HandlerException } from '@/shared/exceptions/handler.exception';
import { ResponseJson } from '@/shared/middlewares/response-json.middleware';
import { VerifyJWT } from '@/shared/middlewares/verify-jwt.middleware';
// import { listenSubscribes } from './events/subscribers';

moment.tz.setDefault('Asia/Jakarta');

async function Bootstrap() {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(compression());
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());
    app.use(VerifyJWT);
    app.use(ResponseJson);
    app.use(morgan('dev'));

    // swaggerBuild(app);
  });

  server.setErrorConfig((app) => {
    app.use(HandlerException);
  });

  const serverInstance = server.build();

  // run service bus
  // listenSubscribes();

  await retry(
    async (bail) => {
      try {
        await dataSource.initialize();
        console.log('server running port: 3000');
        serverInstance.listen(3000);
      } catch (err) {
        if (err instanceof Error) {
          bail(err);
        } else {
          console.log('Unknown error occurred');
        }
      }
    },
    {
      retries: 10,
      minTimeout: 5000,
    }
  ).catch((error) => console.log(error));
}

Bootstrap();
