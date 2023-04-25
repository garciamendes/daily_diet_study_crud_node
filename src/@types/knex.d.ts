// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      avatar: string | null,
      email: string
      uid_random: string,
      password: string
      created: string
      modified: string
    }
    snack: {
      id: string
      name: string
      description: string,
      date: string,
      hour: string,
      is_diet: boolean
      user_id: string
    },
  }
}
