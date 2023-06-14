# Quiz App

![quizapp screenshot](./image/Screenshot%20(80).png)

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