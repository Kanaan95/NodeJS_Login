# Login System

## Introduction

This is a basic login system using NodeJS with Express. This project uses MongoDB as its database.

## Install dependencies

After fetching the project, navigate to the project's root and run the following command to install the dependencies.

```shell
# Windows
npm install

# MacOs / Linux
sudo npm install
```

## Environment variables

This project uses the `dotenv` dependency. In the root folder of the project, create a file and name it `.env`. 
The `.env` file loads environment variables into `process.env`. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

## Launch project

Simply run the command `npm start` to run the project. You can test the APIs using [Postman](https://www.postman.com) or [Insomnia](https://insomnia.rest)

## Test

This project contains a test file to verify if the APIs are working according to the expectations. The testing depends on the `chai`, `mocha` and `supertest` dependencies.

Simply run the command `npm test` to run the test locally. 

## Enhancement

This is an essential project for a login system using NodeJS and Express. Of course, this project can be enhanced and made better with or without dependencies. I will keep working on this project to expand it for broader use in software development applications.
