
exports.up = function(knex, Promise) {
  return knex.schema.createTable('transactions', (table)=>{
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade')
      .index();
    table.string('type')
    table.integer('amount')
    table.string('business_name')
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('transactions');
};
