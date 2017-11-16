const Koa = require('koa');
const koaStatic = require('koa-static');
const render = require('./render');

module.exports = function(config) {
  const app = new Koa();

  const template = require('./template')(config);
  app.use(koaStatic(config.app.folders.static));

  app.use(async (ctx, next) => {
    ctx.state.props = {};
    await next();
    if (ctx.state.view) {
      const rendered = render(ctx);
      ctx.body = template.getBody(ctx, rendered);
    }
  });

  require('../src/controllers/root')(app);
  require('../src/controllers/user')(app);

  app.listen(config.app.port);

  return app;
};
