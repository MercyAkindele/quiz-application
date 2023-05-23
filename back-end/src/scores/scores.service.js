const knex = require("../db/connection");
function list(){
  return knex("scores").select("*")
}
function create(score){
  return knex("scores")
    .insert(score)
    .returning("*")
    .then((createdRecord) => createdRecord[0])
}

module.exports = {
  list,
  create
}