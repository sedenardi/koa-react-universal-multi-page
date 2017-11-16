const Router = require('koa-router');

module.exports = function(app) {
  const router = new Router();

  router.get('/', async (ctx) => {
    ctx.state.view = 'IndexPage';
    ctx.state.title = 'Index';
  });

  app.use(router.routes());
};
