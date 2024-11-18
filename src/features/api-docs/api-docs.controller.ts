import {
  BaseHttpController,
  controller,
  httpGet,
} from 'inversify-express-utils';
import crypto from 'crypto';
import { endPoints } from '@/shared/constants/endpoints.constant';

@controller('/api-docs')
export class ApiDocsController extends BaseHttpController {
  @httpGet('/0192989a-6a52-7bb7-b259-5c1a102c1a70')
  async getApiDocs() {
    const routes = endPoints;
    const baseUrl = process.env.APP_URL;
    const data: any = {};
    data.openapi = '3.0.1';
    data.info = {
      title: `${process.env.APP_ENV} - Auth`,
      description: 'Auth',
      version: 'v1',
    };

    data.servers = [
      {
        url: baseUrl.slice(0, -1),
      },
    ];

    const routeException = [];
    const routeWithoutJwt = [];
    const rows: any = {};

    routes.forEach((layer, key) => {
      const uri = '/' + layer.path;

      const patternSummary = [/[/./]/g, /[{]/g, /[}]/g];
      const replaceSummary = [' ', 'by ', ''];
      const patternUri = [/[?]/g];
      const replaceUri = [''];

      let summary = uri
        .replace(patternSummary[0], replaceSummary[0])
        .replace(patternSummary[1], replaceSummary[1])
        .replace(patternSummary[2], replaceSummary[2]);

      let generatedUri = uri.replace(patternUri[0], replaceUri[0]);

      if (routeException.includes(generatedUri)) {
        return;
      }

      const method = layer.method;

      rows[generatedUri] = rows[generatedUri] || {};
      rows[generatedUri][method] = {
        summary,
        description: summary,
        operationId: crypto
          .createHash('md5')
          .update(key.toString())
          .digest('hex'),
        responses: {
          '200': {
            description: 'OK',
          },
        },
      };

      if (layer.body) {
        rows[generatedUri][method].requestBody = {
          content: {
            [layer.contentType || 'application/json']: {
              schema: {
                type: 'object',
                properties: {},
                required: [],
              },
            },
          },
        };

        layer.body.forEach((param) => {
          rows[generatedUri][method].requestBody.content[
            layer.contentType || 'application/json'
          ].schema.properties[param.field] = { type: param.type };

          if (param.required) {
            rows[generatedUri][method].requestBody.content[
              layer.contentType || 'application/json'
            ].schema.required.push(param.field);
          }
        });
      }

      if (routeWithoutJwt.includes(key)) {
        delete rows[generatedUri][method].security;
      }

      if (method === 'get' || method === 'delete') {
        delete rows[generatedUri][method].requestBody;
      }

      if (generatedUri.includes('{')) {
        const explodeUri = uri.split('/');
        explodeUri.forEach((segment) => {
          if (segment.includes('{')) {
            if (segment.includes('?')) {
              segment = segment.replace('?', '');
            }

            rows[generatedUri][method].parameters =
              rows[generatedUri][method].parameters || [];
            rows[generatedUri][method].parameters.push({
              name: segment.replace(/[{}]/g, ''),
              in: 'path',
              description: 'ID parameter description',
              required: true,
              schema: {
                type: 'string',
              },
            });
          }
        });
      }
    });

    data.paths = rows;
    return data;
  }
}
