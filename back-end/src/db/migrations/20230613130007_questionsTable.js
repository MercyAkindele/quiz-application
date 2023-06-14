/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("questions", (table) =>{
    table.increments("question_id").primary();
    table.string("question").notNullable();
    table.string("answer_a").notNullable();
    table.string("answer_b").notNullable();
    table.string("answer_c").notNullable();
    table.string("answer_d").notNullable();
    table.string("correct").notNullable();
    table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("questions");
};
