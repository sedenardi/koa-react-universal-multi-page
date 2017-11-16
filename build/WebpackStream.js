const Transform = require('stream').Transform;
const _ = require('lodash');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

class WebpackStream extends Transform {
  constructor(options) {
    options.objectMode = true;
    super(options);
    this.production = options.production;
    this.outputPath = options.outputPath;
    this.files = [];
  }
  _transform(chunk, encoding, done) {
    if (_.isArray(chunk)) {
      this.files = this.files.concat(chunk);
    } else if (chunk.path) {
      this.files.push(chunk.path);
    }
    done();
  }
  _flush(done) {
    if (!this.files.length) { return done(); }

    webpackConfig.output.path = this.outputPath;
    for (const key in webpackConfig.entry) {
      if (key !== 'vendor') delete webpackConfig.entry[key];
    }
    this.files.forEach((f) => {
      const fileParts = f.split('/');
      const fileName = fileParts[fileParts.length - 1];
      webpackConfig.entry[fileName.replace('.js', '')] = f;
    });

    if (this.production) {
      webpackConfig.plugins.push(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }));
    } else {
      delete webpackConfig.entry.vendor;
      delete webpackConfig.plugins;
    }

    const compiler = webpack(webpackConfig);
    compiler.run((cErr, stats) => {
      if (cErr) throw cErr;

      const info = stats.toString({
        hash: true,
        version: true,
        timings: true,
        assets: false,
        chunks: true,
        chunkModules: false,
        modules: false,
        cached: false,
        reasons: false,
        source: false,
        errorDetails: true,
        chunkOrigin: false,
        colors: true
      });
      console.log(info);
      done();
    });
  }
}

module.exports = WebpackStream;
