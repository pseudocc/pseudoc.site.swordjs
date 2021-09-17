const Router = require('@koa/router');

const router = new Router();

router.post('/login', async ctx => {
  console.log('login request');
});

router.post('/signup', async ctx => {
  console.log('signup request');
});

router.delete('/logout', async ctx => {
  console.log('logout request');
});

module.exports = router;
