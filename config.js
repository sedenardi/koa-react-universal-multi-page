const path = require('path');
const _ = require('lodash');

const env = process.env.NODE_ENV;
const base = {
  app: {
    root: path.normalize(__dirname),
    env: env,
    port: 3002,
    folders: {
      static: path.resolve('./')
    }
  },
};

const specific = {
  development: {

  },
  production: {

  }
};

module.exports = _.merge(base, specific[env]);
