const _ = require('lodash');
const fs = require('fs-promise');
const config = require('../config');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = async (req, res) => {
  const { searchString } = req.query;

  const productsStr = await fs.readFile(`${__dirname}/../data/products.json`, 'utf8');
  const products = JSON.parse(productsStr);

  await delay(400 + (Math.random() * 400));

  const trimmedSearchString = searchString.toLowerCase().trim();

  res.json({
    searchString,
    products: _(products)
      .filter(({
        designerCategoryName,
        description,
        name,
      }) => ([
        designerCategoryName,
        description,
        name,
      ].some((productProperty) => productProperty
        .toLowerCase()
        .trim()
        .includes(trimmedSearchString))))
      .map(({ image, ...rest }) => ({
        ...rest,
        image: `${config.productThumbnailBaseURL}${image}`,
      }))
      .take(10)
      .value(),
  });
};
