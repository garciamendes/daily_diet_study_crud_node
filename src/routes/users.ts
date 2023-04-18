// Third party
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'

// Project
import { knex } from '../database'
import { validarEmail } from '../utils/check-valid-email'
import { verifyToken } from '../middlewares/check-token'

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

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
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

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      return reply.status(401).send({ message: 'Invalid email or password' })

    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1 days', algorithm: 'HS512' })
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }

    return reply.status(200).send(userInfo)
  })
  server.patch('/user/profile/:id', { preHandler: [verifyToken] }, async (request, reply) => {
    const updateUser = z.object({
      name: z.string()
    })
    const getRequestParams = z.object({
      id: z.string().uuid(),
    })

    const { name } = updateUser.parse(request.body)
    const { id } = getRequestParams.parse(request.params)

    await knex('users').where('id', id).update({ name, modified: String(new Date()) })
    return reply.status(200).send({ message: 'User updated successfully'})
  })
}