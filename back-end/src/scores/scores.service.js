const knex = require("../db/connection");
function list() {
  return knex("scores").select("*");
}
function create(score) {
  return knex("scores")
    .insert(score)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}
function read(score_id) {
  return knex("scores").select("*").where({ score_id }).first();
}
function destroy(score_id) {
  return knex("scores").where({ score_id }).del();
}

module.exports = {
  list,
  create,
  read,
  delete: destroy,
};
