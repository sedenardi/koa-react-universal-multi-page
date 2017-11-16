const Router = require('koa-router');

module.exports = function(app) {
  const router = new Router();

  router.get('/user', async (ctx) => {
    ctx.state.view = 'UserPage';
    ctx.state.title = 'User';
    ctx.state.props.propNumber = Math.floor(Math.random() * 100000000);
  });

  app.use(router.routes());
};
