const assert = require('assert');

if (require.main == module) {
  const env = try_get_env();
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
  
  app.listen(env.HTTP_PORT, () => {
    console.log('Swordjs server is hosting on port %d', env.HTTP_PORT);
  });
}

function try_get_env() {
  const env_output = require('dotenv').config();
  if (env_output.error) {
    console.error(env_output.error);
    process.exit(1);
  }
  return env_output.parsed;
}
