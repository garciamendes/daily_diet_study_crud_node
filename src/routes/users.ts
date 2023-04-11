// Third party
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'

// Local
import { knex } from '../database'
import { validarEmail } from '../utils/check-valid-email'
import { verifyToken } from '../middlewares/check-token'

export async function usersRoutes(server: FastifyInstance) {
  server.post('/register', async (request, reply) => {
    const createUser = z.object({
      email: z.string(),
      password: z.string()
    })
    const { email, password } = createUser.parse(request.body)

    if (!email || !password)
      return reply.status(400).send({ message: 'Email and password are required' })

    if (!validarEmail(email))
      return reply.status(400).send({ message: 'Enter a valid email' })

    if (password.length < 8)
      return reply.status(400).send({ message: 'Password must be at least 8 characters long' })

    const isEmailExist = await knex('users').where('email', email).first()
    if (isEmailExist)
      return reply.status(400).send({ message: 'Email already exists' })

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    await knex('users').insert({ id: randomUUID(), email, password: hashedPassword })
    return reply.status(201).send({ message: 'User created successfully' })
  })
  server.post('/login', async (request, reply) => {
    const createUser = z.object({
      email: z.string(),
      password: z.string()
    })

    const { email, password } = createUser.parse(request.body)
    const user = await knex('users').where('email', email).first()

    if (!user)
      return reply.status(400).send({ message: 'Invalid email or password' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      return reply.status(400).send({ message: 'Invalid email or password' })

    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1 days' })
    return reply.status(200).send({ token })
  })
  server.get('/user', { preHandler: [verifyToken] }, async (request, reply) => {
    return console.log('teste');

  })
}