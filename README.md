# Quiz App

![quizapp screenshot](./image/Screenshot%20(80).png)

## Overview

This project was created with the purpose of practicing and learning various technologies including React, Node, Express, Knex, PostgreSQL, and Docker.

The application is a quiz platform that allows users to create, update, and delete questions for a quiz. It utilizes a client-server architecture, with React handling the frontend, Node.js and Express as the backend, and PostgreSQL serving as the database.

The primary motivation behind this project was to gain hands-on experience and deepen understanding of these technologies.

## Key Features

- Containerization of the application using Docker, enabling consistent deployment across different environments.
- User-friendly interface for creating, updating, and deleting quiz questions.
- Seamless integration of React frontend with Node.js, Express, and PostgreSQL backend.
- RESTful API endpoints for handling HTTP requests (GET, POST, PUT, DELETE) related to quiz questions.
- Utilization of Knex.js query builder for simplified database operations.

## Running application

```bash

# start full stack app using docker compose
docker-compose up --build

```

Optionally, load sample data.

```bash

# optional: create sample data if you want an existing quiz using seed data
# in a new terminal
docker exec -i -t quiz-application_backend_1 bash

# inside docker container
npx knex migrate:latest
npx knex seed:run
exit

```

Go to `http://localhost:3000` in your broswer.

## Development

Start postgres database in docker.

```bash

# in a terminal, start postgres container
docker run \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p "5432:5432" \
  -i -t --rm \
  postgres

```
Start backend app.

```bash

# in second terminal
cd back-end

# set the database connection string
echo "DATABASE_URL_DEVELOPMENT=postgresql://postgres:postgres@localhost/postgres" > .env

# install backend dependencies
npm install

# optional: create sample data if you want an existing quiz using seed data
npx knex migrate:latest
npx knex seed:run

# start backend app
npm start

```

Start frontend app.

```bash

# in a final terminal
cd front-end

# set the backend api url
echo "REACT_APP_API_BASE_URL=http://localhost:5000" > .env

# install front end dependencies
npm install

# start frontend app
npm start

```

## Build container image

Commands to build frontend and backend container images.

```bash

docker build --tag quiz-app-frontend --file front-end/Dockerfile .

docker build --tag quiz-app-backend --file back-end/Dockerfile .

```