const Transform = require('stream').Transform;
const Vinyl = require('vinyl');
const _ = require('lodash');

class PageDependencyFinder extends Transform {
  constructor(options) {
    options.objectMode = true;
    super(options);
    this.depObj = _.entries(options.depObj);
    this.files = [];
  }
  findPagesForComponent(c) {
    if (c.startsWith('/')) {
      c = c.slice(1);
    }
    if (c.endsWith('Page.jsx')) {
      return [`/${c}`];
    }
    return _.chain(this.depObj)
      .filter((a) =>  _.some(a[1], (id) => id === c))
      .map((a) => this.findPagesForComponent(a[0]))
      .value();
  }
  _transform(file, encoding, done) {
    this.files = this.files.concat(this.findPagesForComponent(file.path));
    done();
  }
  _flush(done) {
    const pages = _.chain(this.files)
      .flattenDeep()
      .uniqBy((p) => {
        const parts = p.split('/');
        return parts[parts.length - 1];
      })
      .value();
    pages.forEach((p) => this.push(new Vinyl({ path: p })));
    done();
  }
}

module.exports = PageDependencyFinder;
