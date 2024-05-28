import 'dotenv/config';
import 'reflect-metadata';
import compression from 'compression';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { container } from '@/utils/inversify.util';
import { dataSource } from '@/utils/database.util';
import { HandlerException } from '@/exceptions/handler.exception';
import { ResponseJson } from '@/middlewares/response-json.middleware';
import moment from 'moment-timezone';
import { SwaggerBuild } from '@/utils/swagger.util';

moment.tz.setDefault('Asia/Jakarta');

async function Bootstrap() {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(compression());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());
    app.use(ResponseJson);
    SwaggerBuild(app);
  });

  server.setErrorConfig((app) => {
    app.use(HandlerException);
  });

  const serverInstance = server.build();

  dataSource.initialize().then(() => {
    serverInstance.listen(3000);
  }).catch(error => console.log(error));
}

Bootstrap();
