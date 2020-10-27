# Solution for Air Quality Index

## Introduction

Keeping the instructions in mind I have tried my best to keep the solution simple and within the principles I follow in my daily work-life.

- First thing, I added typescript to the project which helps in following the code easy and much easier to debug.

- Then I added storybook, which makes it easier to design components, eliminating the need to follow a path to get to a certain view

- Lastly, I added tests using Jest and enzyme.

## Code walk through

- Entry file has been changed from index.js to index.tsx in src folder

- I have created a components folder within src folder which includes reusable components with their stories and tests.

- Utils folder within src folder includes common functions which can be used througout the application.

## Going back to previous version

- In src/index.tsx you can comment the 5th line and uncomment the 6th one, it should compile to the previous version

- To still be able to run previous version, therefore I have not removed packages related to like, eg. rambda

## Design

- I have used styled components for CSS, as it helps to keep the code clean and really easy to understand

## Available Scripts

In the project directory, you can run:

### `yarn`

This will install the required dependencies.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

This will run tests

### `yarn storybook`

Runs the storybook.<br>
Open [http://localhost:6060](http://localhost:6060) to view it in the browser.
