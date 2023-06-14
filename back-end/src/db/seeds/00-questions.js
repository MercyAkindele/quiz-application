const questions = require("./00-questions.json")

exports.seed = function (knex) {
  return knex.raw("TRUNCATE TABLE questions RESTART IDENTITY CASCADE")
  .then(function(){
    return knex("questions").insert(questions);
  });
};