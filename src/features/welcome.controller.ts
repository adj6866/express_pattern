import {
  BaseHttpController,
  controller,
  httpGet
} from 'inversify-express-utils';


@controller('/')
export class ExampleController extends BaseHttpController {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Welcome controller
   *     responses:
   *       200:
   *         description: OK
   */
  @httpGet('/')
  async index() {
    return {
      httpCode: 200,
      data: null
    }

  }
}
