const assert = require('assert');

if (require.main == module) {
  const env = require('../utils/env');
  const Koa = require('koa');
  const Router = require('@koa/router');

  const app = new Koa();
  const router = new Router();

  assert.ok(env.HTTP_PORT !== undefined);

  router.get('/', async ctx => {
    ctx.body = 'Hello, swordsman!';
  });

  router.get('/:name', async ctx => {
    ctx.body = `Hello, swordsman ${ctx.params.name}!`;
  });

  app
    .use(router.routes())
    .use(router.allowedMethods());
  
  app.listen(env.API_PORT, () => {
    console.log('Swordjs server is hosting on port %d', env.API_PORT);
  });
}
