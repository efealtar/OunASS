const express = require('express');

const config = require('./config');

const app = express();

app.set('views', `${__dirname}/frontend/`);
app.set('view engine', 'ejs');
// eslint-disable-next-line no-underscore-dangle
app.engine('.html', require('ejs').__express);

const { NODE_ENV } = process.env;

const isLocalEnv = NODE_ENV === 'local';

if (isLocalEnv) {
  /* eslint-disable  import/no-extraneous-dependencies, global-require */
  const watcher = require('chokidar').watch(
    ['**/*.js*', '**/*.less', '**/*.yml'],
    {
      ignored: ['**/node_modules/**/*', '**/.git/**/*'],
      interval: 1000,
    },
  );

  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('clearing require module cache');

      Object.keys(require.cache)
        .filter((id) => !id.includes('/node_modules/'))
        .forEach((id) => delete require.cache[id]);
    });
  });

  const webpackConfig = require('./webpack.config');
  const compiler = require('webpack')(webpackConfig);

  app.set('view cache', false);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      logLevel: 'trace',
    }),
  );

  app.use(require('webpack-hot-middleware')(compiler));
  /* eslint-disable  import/no-extraneous-dependencies, global-require */
}

// for dev, require app on every request to refresh when cache is cleared
if (isLocalEnv) {
  // eslint-disable-next-line global-require
  app.use('/', (req, res, next) => require('./router')(req, res, next));
} else {
  // eslint-disable-next-line global-require
  app.use('/', require('./router'));
}

const { port } = config;
app.listen(port, (err) => {
  if (err) {
    console.log('Unable to listen on port', port, err);
    return;
  }
  console.log('Listening on port', port);
});
