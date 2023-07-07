// Third party
import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

// Local
import { env } from './env'
import { usersRoutes } from './routes/users'
import { snacksRoutes } from './routes/snacks'

export const server = fastify()
server.register(cors, {
  origin: env.ALLOWED_ORIGINS,
  credentials: true
})

server.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
server.register(fastifyCookie)


server.register(usersRoutes)
server.register(snacksRoutes)
