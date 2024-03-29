# Dashboard - Data Visualization App

## Summary 
Web app that visualizes data stored in a MongoDB database using both Chart.js and Recharts. 
The backend is implemented using Apollo/Express, the frontend using React and they are connected with a GraphQL API. <br /> 

Travis CI is used for continuous integration which means that all tests(which are implemented using React Testing Library) are run on every PR.
If all tests are green and it's a PR to the master branch the app is automatically deployed.
The app was originally implemented using JavaScript but converted to TypeScript.

<h3 align="center">Picture of the app</h3>
<p align="center">
<img  src="https://user-images.githubusercontent.com/44057369/94737853-d5039600-036e-11eb-940b-f04b9b172c4e.png"  width="85%" height="400"/> 
</p>

## Tech 
* TypeScript - Strict syntactical superset of JavaScript which adds optional static typing to the language.
* GraphQL - Query language that prioritizes giving clients exactly the data they request. 
* Travis CI - Hosted continuous integration service used to build and test software projects.
* MongoDB - NoSQL Database used for storing and accessing data.
* MongoDBAtlas - Cloud database service for applications using MongoDB.
* Mongoose - Object Data Modeling library for MongoDB.
* React - UI component library used as base for the frontend.
* Redux - Used for state management and for making the app even more modular and functional.
* React Testing Library - Helpers that enable testing React components without relying on implementation details.
* Chart.js - Free open-source JavaScript library for data visualization.
* Recharts - Free open-source JavaScript library for data visualization.
* Apollo Server - Open-source GraphQL server.
* Express.js - Node.js web application framework that provides features for web applications.
* Prettier - Opinionated code formatter which enforces consistent style.
* ESLint - Static code analyzer that identifies common problems.
* Bootstrap - Predefined CSS and components with options for customization.

## Setup
1. Clone the repo
```sh
git clone https://github.com/nbryn/dashboard.git
```
2. Install dependencies in the root directory
```sh
npm install
```
3. Install dependencies in the presentation directory
```sh
cd presentation && npm install
```
4. Start the development server
```sh
cd - && npm run dev
```
