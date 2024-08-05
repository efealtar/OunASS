const express = require('express');
require('express-async-errors');

const router = express.Router();

router.use('/static', express.static(`${__dirname}/frontend/static/`));

router.get('/', require('./express-middleware/home'));

router.get('/quick-search', require('./express-middleware/quick-search'));

router.get('/category-tree', require('./express-middleware/category-tree'));

router.get('/flush-category-tree-cache', require('./express-middleware/flush-category-tree-cache'));

router.use((err, req, res, next) => {
  console.error(err);

  res.status(500).send('500');
});

module.exports = router;
