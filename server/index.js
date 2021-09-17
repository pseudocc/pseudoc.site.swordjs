const assert = require('assert');

if (require.main == module) {
  const { env } = require('../utils/env');
  const Koa = require('koa');
  const Router = require('@koa/router');
  const logger = require('koa-logger');

  const app = new Koa();
  const router = new Router();
  const api_router = require('./api/routes');

  assert.ok(env.API_PORT !== undefined);

  router.get('/', async ctx => {
    ctx.body = 'Hello, swordsman!';
  });

  router.use('/api', api_router.routes());

  app
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods());

  app.listen(env.API_PORT, () => {
    console.log('Swordjs server is hosting on port %s', env.API_PORT);
  });
}
