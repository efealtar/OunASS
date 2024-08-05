/* eslint-disable function-paren-newline */
/*
// read from /data/categories.csv
categories = [{
  categoryId: 1,
  name: 'root',
}, {
  categoryId: 2,
  name: 'dummy_category_1',
}, {
  categoryId: 3,
  name: 'dummy_category_2',
}, {
  categoryId: 4,
  name: 'dummy_category_3',
}, {
  categoryId: 5,
  name: 'dummy_category_4',
}];

// read from /data/category-parent-child-mapping.csv
categoryParentChildMapping = [{
  categoryId: 2,
  parentId: 1,
}, {
  categoryId: 3,
  parentId: 1,
}, {
  categoryId: 4,
  parentId: 2,
}, {
  categoryId: 5,
  parentId: 3,
}];

rootCategoryId: 1;

categoryTree = makeTree({
  categories,
  categoryParentChildMapping,
  rootCategoryId,
});

// categoryTree looks like:
// {
//   id: 1,
//   name: 'root',
//   children: [
//     {
//       id: 2,
//       name: 'dummy_category_1',
//       children: [
//         {
//           id: 4,
//           name: 'dummy_category_3',
//           children: [],
//         },
//       ],
//     },
//     {
//       id: 3,
//       name: 'dummy_category_2',
//       children: [
//         {
//           id: 5,
//           name: 'dummy_category_4',
//           children: [],
//         },
//       ],
//     },
//   ],
// };
*/

const csvToJson = require('csvtojson');
const path = require('path');
const fs = require('fs'); // to implement streams

let categoryTree = null;
let loadingPromise = null; // Promise to handle loading state

function buildTree(categories, mappings) {
  const idToCategoryNode = {};
  categories.forEach((category) => {
    idToCategoryNode[category.categoryId] = {
      id: category.categoryId,
      name: category.name,
      children: [],
    };
  });

  mappings.forEach((mapping) => {
    const parent = idToCategoryNode[mapping.parentId];
    const child = idToCategoryNode[mapping.categoryId];
    if (parent && child) {
      parent.children.push(child);
    }
  });

  return idToCategoryNode['1']; // Assumes the root category ID
}

function loadData() {
  loadingPromise = new Promise((resolve, reject) => {
    Promise.all([
      csvToJson().fromStream(
        fs.createReadStream(path.join(__dirname, '../data/categories.csv')),
      ),
      csvToJson().fromStream(
        fs.createReadStream(
          path.join(__dirname, '../data/category-parent-child-mapping.csv'),
        ),
      ),
    ])
      .then(([categories, mappings]) => {
        categoryTree = buildTree(categories, mappings);
        resolve();
      })
      .catch((error) => {
        console.error('Error loading category data:', error);
        categoryTree = null;
        reject(error);
      });
  });

  return loadingPromise;
}

// Call loadData when the server starts
loadData();

module.exports = async (req, res) => {
  if (!categoryTree && loadingPromise) {
    await loadingPromise; // Wait for data loading if it's still in progress(might be big file)
  }
  if (!categoryTree) {
    return res.status(503).send('Category data is not available');
  }
  return res.json(categoryTree);
};
