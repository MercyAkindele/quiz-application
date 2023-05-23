const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");


const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const questionsRouter = require("./questions/questions.router");
const scoresRouter = require("./scores/scores.router");

const app = express();


app.use(express.json());

app.use("/questions", questionsRouter);
app.use("/scores", scoresRouter);


app.use(notFound);
app.use(errorHandler);

module.exports = app;
