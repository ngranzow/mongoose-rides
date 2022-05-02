# Social Network API
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Description 
This is an API built for a social network web app that allows users to share their thoughts, react to friends' thoughts, and create a friend list. This application uses Mongoose and Express as well as dateFormat.js.
 
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation 
To install, first clone the repository from GitHub and then install Node. Install express, mongoose, and nodemon by running `npm i` in your command line.

## Usage 
Run `npm start` or `npm run watch` in your command line.

To use the API please use Insomnia or a similar application.

User
* Create a user: `POST /api/users`
* Get all users: `GET /api/users`
* Get user by ID: `GET /api/users/:id`
* Update a user: `PUT /api/users/:id`
* Delete a user: `DELETE /api/users/:id`

Friend
* Add a friend: `POST /api/users/:id/friends/:friendId`
* Remove a friend: `DELETE /api/users/:id/friends/:friendId`

Thought
* Create a thought: `POST /api/thoughts/:userId`
* Get all thoughts: `GET /api/thoughts`
* Get thought by ID: `GET /api/thoughts/:id`
* Update a thought: `PUT /api/thoughts/:id`
* Delete a thought: `DELETE /api/thoughts/:id`

Reaction
* Add a reaction: `POST /api/thoughts/:thoughtId/reactions`
* Delete a reaction: `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`

You can watch a tutorial [here]()

## License 
To read the ISC license click [here](https://opensource.org/licenses/ISC)

## Contributing 
Please read the [installation](#installation) section.

## Questions
If you have any questions please contact email me [here](mailto:nate.granzow@gmail.com). You can also view more of my projects [here](https://github.com/ngranzow/).