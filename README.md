# Setup Instructions
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install 12
nvm use 12
npm install --global yarn
yarn 
yarn develop
```
Your development server should now be running at [http://localhost:3000](http://localhost:3000/).

# Front-End Development Instructions

## Introduction
In this section, you'll be working on implementing the Quick Search feature for our application.

## Quick Search Overview
Quick Search is a feature that allows users to search for products quickly and efficiently. It provides feedback to users during the search process, including loading states, result states, and error states.

## Implementation Details
You can find the design for the front-end Quick Search feature in [Zeplin](https://scene.zeplin.io/project/610794abd00b1f10707afd40).  Focus on implementing the Quick Search part, which is the left side of each design.
There are six design files, each representing a different state of the Quick Search feature:
- **Initial State**: Display an empty input field with no results.
- **Loading State**: When users type in the input, display a spinner at the right side of the input indicating that data is being fetched.
- **Result State**: Display the products returned from the API.
- **No Result State**: If the API doesn't return any products, display no results component.
- **Network Error State**: Handle errors that occur at the network layer.
- **Server Error State**: Handle errors returned by the server.

To implement the Quick Search feature, you'll need to make changes to the `QuickSearch.jsx` file located in `frontend/components/quick-search/` directory.

You can use the provided endpoint to fetch products: http://localhost:3000/quick-search?searchString=red

## Back-End Development Instructions

### Introduction
In this section, you'll be working on implementing the back-end part of the application. Your task is to provide the necessary data for rendering the category tree on the front end.

### Requirements:
- When you visit the application at `localhost:3000`, you'll see a category tree on the right side.
- The front end is completely implemented and rendered with mock data.
- Your task is to provide real data from the back end to replace the mock data.

### Implementation Details
You need to make changes to the `/express-middleware/category-tree.js` file to implement the back-end logic.

### Implementation Steps:
1. **Read Data**: Implement logic to read data from the appropriate source. In this case, you need to read category data from `/data/categories.csv` and category parent-child mapping data from `/data/category-parent-child-mapping.csv`.

2. **Transform Data**: Transform the data into the format expected by the front end. The format should match the structure used to render the category tree on the front end.

# Good luck!
