# Join elements for BIM models - Frontend

A web service for joining elements for Revit models. 

https://user-images.githubusercontent.com/119405090/218618634-f29b7cab-c43c-4548-a635-22f95ab80fe1.mp4

*Please refer to backend repository as well to run this service. https://github.com/yuantsai1115/join-elements-backend*

## Introduction
Elements in the BIM model normally have conflicts to each other during the modelling process. These conflicts affect the applications of BIM models such as the quantity take-off, or rendering. Therefore, modeller use the join function in modelling tool to merge these elements one-by-one. It is a tedious yet necessary process in AEC industry. This service automatically joins all elements in the BIM model to save a lot of time. Modeller can simply upload the model and let the server do the job, and download it back afterwards.

| <img src="https://user-images.githubusercontent.com/119405090/218623537-a3d00dc7-dda4-4eca-8605-c1a08078e7ef.jpg" width="400"> |  <img src="https://user-images.githubusercontent.com/119405090/218623551-4ddfe6e9-27a3-4816-af89-a2bb7f0e9bd3.jpg" width="400"> | 
|:--:| :--:| 
| *Before joining the elements* | *After joining the elements* |

## Features
- Automatically join elements in BIM model
- Support Revit 2020-2022
- No installation needed

## Live Demo
Main branch is deployed to https://join-elements.netlify.app/.

## Project Setup
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
