import { Knex } from 'knex'


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('snack', (table) => {
    table.uuid('id').primary(),
    table.string('name').notNullable(),
    table.string('description').notNullable(),
    table.string('date').notNullable(),
    table.string('hour').notNullable(),
    table.boolean('is_diet').notNullable(),
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('snack')
}
