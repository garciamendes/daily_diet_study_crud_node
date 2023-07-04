// Third party
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { compare, hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

// Project
import { knex } from '../database'
import { validarEmail } from '../utils/check-valid-email'
import { verifyJwt } from '../middlewares/check-token'

export async function usersRoutes(server: FastifyInstance) {
  server.post('/register', async (request, reply) => {
    const createUser = z.object({
      email: z.string(),
      password: z.string(),
      name: z.string()
    })
    const { email, password, name } = createUser.parse(request.body)

    if (!email || !password || !name)
      return reply.status(400).send({ message: 'Email, password and name are required' })

    if (!validarEmail(email))
      return reply.status(400).send({ message: 'Enter a valid email' })

    if (password.length < 8)
      return reply.status(400).send({ message: 'Password must be at least 8 characters long' })

    const isEmailExist = await knex('users').where('email', email).first()
    if (isEmailExist)
      return reply.status(400).send({ message: 'Email already exists' })

    const hashedPassword = await hash(password, 6)
    await knex('users').insert({ id: randomUUID(), name, email, password: hashedPassword })
    return reply.status(201).send({ message: 'User created successfully' })
  }),
  server.post('/login', async (request, reply) => {
    const createUser = z.object({
      email: z.string(),
      password: z.string()
    })

    const { email, password } = createUser.parse(request.body)
    const user = await knex('users').where('email', email).first()

    if (!user)
      return reply.status(401).send({ message: 'Invalid email or password' })


    const validPassword = await compare(password, user.password)
    if (!validPassword)
      return reply.status(401).send({ message: 'Invalid email or password' })

    const token = await reply.jwtSign({}, { sign: { sub: user.id }, })
    const refreshToken = await reply.jwtSign({}, { sign: { sub: user.id, expiresIn: '7d' }, })
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ user: userInfo, token: token })
  }),
  server.patch('/login/refresh', async (request, reply) => {
    await request.jwtVerify({ onlyCookie: true })

    const token = await reply.jwtSign(
      {},
      { sign: { sub: request.user.sub } },
    )
    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: request.user.sub, expiresIn: '7d' } },
    )

    const user = await knex('users').where('id', request.user.sub).first()
    const userInfo = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
    }

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ user: userInfo, token: token })
  }),
  server.patch('/user/profile/', { onRequest: [verifyJwt] }, async (request, reply) => {
    const updateUser = z.object({
      name: z.string()
    })
    const getRequestParams = z.object({
      id: z.string().uuid(),
    })

    const { name } = updateUser.parse(request.body)
    const { id } = getRequestParams.parse(request.user.sub)

    await knex('users').where('id', id).update({ name, modified: String(new Date()) })
    return reply.status(200).send({ message: 'User updated successfully' })
  })
}