// Third party
import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

// Local
import { env } from './env'
export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_CLIENT === 'sqlite' ?
    { filename: env.DATABASE_URL } : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
  searchPath: ['knex', 'public'],
}

export const knex = setupKnex(config)