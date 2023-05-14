// Third party
import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'

// Local
import { env } from './env'
import { usersRoutes } from './routes/users'
import { snacksRoutes } from './routes/snacks'

export const server = fastify()

server.register(cors, {
  origin: env.ALLOWED_ORIGINS,
  methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH']
})
server.register(usersRoutes)
server.register(snacksRoutes)
