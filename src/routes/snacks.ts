// Third party
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'crypto'

// Project
import { knex } from '../database'
import { ICustomRequest, verifyToken } from '../middlewares/check-token'

export async function snacksRoutes(server: FastifyInstance) {
  server.post('/', { preHandler: [verifyToken] }, async (request: ICustomRequest, reply) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
    const hourRegex = /^\d{2}:\d{2}$/

    const createSnack = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().regex(dateRegex),
      hour: z.string().regex(hourRegex),
      is_diet: z.boolean().optional()
    })

    const {
      name,
      description,
      date,
      hour,
      is_diet
    } = createSnack.parse(request.body)
    const user_id = request.user_id

    if (!description || !date || !name || !hour)
      return reply.status(400).send({ message: 'All fields are mandatory' })

    try {
      await knex('snack').insert({ id: randomUUID(), user_id, name, description, date, hour, is_diet })
      return reply.status(201).send({ message: 'Meal registered successfully' })
    } catch (error) {
      console.error(error)
      return reply.status(500).send({ message: 'Failed to register meal' })
    }
  }),
    server.patch('/:id', { preHandler: [verifyToken] }, async (request: ICustomRequest, reply) => {
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
      const hourRegex = /^\d{2}:\d{2}$/

      const updateSnack = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        date: z.string().regex(dateRegex).optional(),
        hour: z.string().regex(hourRegex).optional(),
        is_diet: z.boolean().optional()
      })

      const {
        name,
        description,
        date,
        hour,
        is_diet
      } = updateSnack.parse(request.body)
      const getRequestParams = z.object({
        id: z.string().uuid(),
      })
      const { id } = getRequestParams.parse(request.params)
      const user_id = request.user_id

      await knex('snack').where('user_id', user_id).where('id', id).update({ name, description, date, hour, is_diet })
      return reply.status(200).send({ message: 'Meal updated successfully' })
    }),
    server.get('/', { preHandler: [verifyToken] }, async (request: ICustomRequest, reply) => {
      const id = request.user_id
      const list_snack = await knex('snack')
        .where('user_id', id)
        .select('*')
        .orderBy('date')

      return reply.status(200).send(list_snack)
    }),
    server.get('/summary', { preHandler: [verifyToken] }, async (request: ICustomRequest, reply) => {
      const id = request.user_id
      const list_snack = await knex('snack')
        .where('user_id', id)
        .select('*')
        .orderBy('date')

      let data = {
        'dietCount': 0,
        'noDietCount': 0,
        'totalSnack': 0,
        'dietSequence': [] as string[]
      }

      for (let snack of list_snack) {
        if (snack.is_diet) {
          data['dietCount'] += 1
          data['dietSequence'].push(snack.id)
        } else {
          data['dietSequence'] = []
          data['noDietCount'] += 1
        }

        data['totalSnack'] += 1
      }

      let results_data = {
        'dietCount': data['dietCount'],
        'dietPercent': Number(Math.round(data['dietCount'] / data['totalSnack'] * 100).toFixed(1)),
        'noDietCount': data['noDietCount'],
        'totalSnack': data['totalSnack'],
        'dietSequence': data['dietSequence'].length
      }

      return reply.status(200).send(results_data)
    }),
    server.get('/:id', { preHandler: [verifyToken] }, async (request: ICustomRequest, reply) => {
      const getRequestParams = z.object({
        id: z.string().uuid(),
      })
      const { id } = getRequestParams.parse(request.params)
      const user_id = request.user_id

      const snack = await knex('snack').where('user_id', user_id).where('id', id).first()
      return reply.status(200).send(snack)
    }),
    server.delete('/:id', { preHandler: [verifyToken] }, async (request: ICustomRequest, reply) => {
      const getRequestParams = z.object({
        id: z.string().uuid(),
      })
      const { id } = getRequestParams.parse(request.params)
      const user_id = request.user_id

      await knex('snack').where('user_id', user_id).where('id', id).delete()
      return reply.status(204).send({ message: 'Successfully Deleted Meal' })
    })
}