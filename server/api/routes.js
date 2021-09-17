const Router = require('@koa/router');
const jwt = require('koa-jwt');
const { sign, decode } = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const router = new Router();
const auth = jwt({ secret });

router.post('/login', async ctx => {
  console.log('login request');
});

router.post('/signup', async ctx => {
  console.log('signup request');
});

router.delete('/logout', auth, async ctx => {
  console.log('logout request');
});

module.exports = router;
