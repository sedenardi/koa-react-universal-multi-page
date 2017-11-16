const path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports = function(config) {
  const templatePath = path.join(config.app.root, 'build/pageTemplate.html');
  const template = _.template(fs.readFileSync(templatePath));

  const getBody = function(ctx, rendered) {
    const templateObj = {
      body: rendered,
      title: `${ctx.state.title || ctx.state.view} - App Name`,
      vendorScript: process.env.NODE_ENV !== 'development' ? 'vendor.bundle.js' : null,
      props: JSON.stringify(ctx.state.props),
      script: `${ctx.state.view}.js`
    };
    return template(templateObj);
  };

  return {
    getBody
  };
};
