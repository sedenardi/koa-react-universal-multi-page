const config = require('./config');
require('./config/koa')(config);

console.log(`Server running at port ${config.app.port}`);
