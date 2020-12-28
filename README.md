# Welcome to the Building Map 🏢🔍
 
I have been developing this project to serve as a search tool for people inside the companies with a large building.
 
# What I have done so far 😎🤩

## Deeper in application 🤿

I am working with HTML Canvas, on a canvas, this is where the map image is drawn, and it gets some actions, such as marking spots on the map.
 
It was started with Crate React App with Typescript template, I installed the following libraries below:
 
`@fortawesome/fontawesome-free`

`@fortawesome/fontawesome-svg-core`

`@fortawesome/free-solid-svg-icons`

`@fortawesome/react-fontawesome`
 
These to use SVG icons in the application.

`react-router-dom`

To define application routes.

`query-string`

To get the query-string params.
 
`firebase`

As a mock API, I have used Firebase Realtime Database and also deployed the application to Firebase Hosting. 

# How to use it? 🤔

## Permision
First, the user will find a login page, there are two predefined users `user` and `admin` both with `123` as their password.
Logging in as a `user`, the user can search for a person, and the map will show where that person can be found in the building, but the user is not allowed to insert a person on the map, on the other hand, as an` admin`, the user is allowed to search and insert people on the map.

## How to input a person on the map?
With a double click on the location on the map where the person can be found, a form will open in the upper right corner of the screen, the user must fill in this form and submit it, then a new person is inserted and can be found by the bar search. 

### Final considerations 😉👊

I know there is a lot to be done on it, but with what I have done so far, I got my certification from the `ComIT - React course`, so I believe there is some kind of great work on this project.
 
# Getting Started with Building Map 🚀

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
