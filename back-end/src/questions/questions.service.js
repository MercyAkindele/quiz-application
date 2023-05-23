const knex = require("../db/connection");

function list(){
  return knex("questions").select("*")
}
function create(question){
  return knex("questions")
    .insert(question)
    .returning("*")
    .then((createdRecord)=> createdRecord[0]);
}
function read(question_id){
  return knex("questions")
    .select("*")
    .where({question_id})
    .first();
}
function update(updatedQuestion, question_id){
  return knex("questions")
    .select("*")
    .where({question_id})
    .update(updatedQuestion, "*")
    .then((upQuestion) => upQuestion[0]);
}
function destroy(question_id){
  return knex("questions")
    .where({question_id})
    .del();
}

module.exports ={
  list,
  create,
  read,
  update,
  delete:destroy,
}