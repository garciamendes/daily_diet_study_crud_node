import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary(),
    table.text('name'),
    table.text('email').notNullable().unique(),
    table.text('password').notNullable(),
    table.timestamp('created').defaultTo(knex.fn.now()).notNullable()
    table.timestamp('modified').defaultTo(knex.fn.now()).notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
