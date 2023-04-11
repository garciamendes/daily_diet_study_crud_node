// Third party
import { FastifyReply, FastifyRequest, preHandlerHookHandler } from 'fastify'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

// Project
import { knex } from '../database'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  created: string
  modified: string
}

interface ICustomRequest extends FastifyRequest {
  user?: IUser
}

interface IJwtUserPayload extends JwtPayload {
  id: string;
}

export const verifyToken: preHandlerHookHandler = async (req: ICustomRequest, res: FastifyReply, next: () => void) => {
  const { headers } = req
  const authHeader = headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).send({ message: 'Access token not found' })
  }

  try {
    const decoded = jwt.verify(token, 'secret_key') as IJwtUserPayload
    const user = await knex('users').where('id', decoded.id).first()

    if (!user) {
      return res.status(401).send({ message: 'Invalid token' })
    }

    req.user = user
    return next()
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' })
  }
}