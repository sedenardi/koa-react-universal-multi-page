require('babel-register')({ extensions: ['.jsx'] });
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const viewsDir = path.resolve(__dirname, '../src/views');
const globPattern = path.join(viewsDir, '/**/*Page.jsx');
const pageFiles = glob.sync(globPattern);

const pages = _.reduce(pageFiles, (result, fileName) => {
  const key = path.basename(fileName).replace('.jsx', '');
  if (result[key]) {
    throw new Error(`Duplicate page found: ${key}`);
  }
  result[key] = require(fileName).default;
  return result;
}, {});

module.exports = function(ctx) {
  if (pages[ctx.state.view]) {
    const element = React.createElement(pages[ctx.state.view], ctx.state.props);
    return ReactDOMServer.renderToString(element);
  } else {
    throw new Error(`Missing view: ${ctx.state.view}`);
  }
};
