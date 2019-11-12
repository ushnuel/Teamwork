# Teamwork [![Build Status](https://travis-ci.org/ushnuel/Teamwork.svg?branch=develop)](https://travis-ci.org/ushnuel/Teamwork) [![Coverage Status](https://coveralls.io/repos/github/ushnuel/Teamwork/badge.svg)](https://coveralls.io/github/ushnuel/Teamwork)

# Description
Teamwork is an internal social network for employees of an organization. The goal of this
application is to facilitate more interaction between colleagues and promote team bonding.

# Setup
- Prepare your local environment by installing `NodeJs`, `git` and `npm`
- Clone the repository and cd into it using `git clone`
- Run `npm install` to install all the dependencies
- Create a `.env` file and add values to it using the `.env.example` format

# Running the Application
Having installed all the dependencies run the following commands
#### `developement`
`npm run start-dev` to start in development mode
#### `production`
`npm run build` to build the app

`npm start` to start in production mode
#### `testing`
`npm test` to test your app in development mode
# API
- POST `/api/v1/auth/create-user` to create a new employee account

- POST `/api/v1/signin` sign in a user

The following endpoints require authentication using [JWT](https://www.npmjs.com/package/jsonwebtoken)

- POST `/api/v1/articles` employee create a new article

- POST `/api/v1/gifs` employee create a new gif post

- POST `/api/v1/articles/:articleId/comment` employee comment on an article

- POST `/api/v1/gifs/:gifId/comment` comment on a gif post

- GET `/api/v1/feed` view all articles

- GET `/api/v1/articles/:articled` view a specific article including all comments(if any)

- GET `/api/v1/gifs/:gifId` view a specific gif post including all the comments(if any)

- PATCH `/api/v1/articles/:articleId` employee edit an article he/she created

- DELETE `/api/v1/articles/:articleId` delete an article

- DELETE `/api/v1/gifs/:gifId` delete a gif post

# Documentation
The endpoints are well documented using [swagger](https://swagger.io). 
To view the documentation, click [here](https://teamwork-dev-app.herokuapp.com/api-docs/)
