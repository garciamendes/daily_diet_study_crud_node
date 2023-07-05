// Third party
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'crypto'

// Project
import { knex } from '../database'
import { verifyJwt } from '../middlewares/check-token'

export interface ISnack {
  name: string,
  description: string,
  date: string,
  hour: string,
  is_diet: boolean | null
}

export interface IListSnack {
  [key: string]: ISnack[]
}

export async function snacksRoutes(server: FastifyInstance) {
  server.post('/snack', { onRequest: [verifyJwt] }, async (request, reply) => {
    const createSnack = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      hour: z.string(),
      is_diet: z.boolean().optional()
    })

    const {
      name,
      description,
      date,
      hour,
      is_diet
    } = createSnack.parse(request.body)
    const user_id = request.user.sub

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
  server.patch('/snack/:id', { onRequest: [verifyJwt] }, async (request, reply) => {
    const updateSnack = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      date: z.string().optional(),
      hour: z.string().optional(),
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
    const user_id = request.user.sub

    await knex('snack').where('user_id', user_id).where('id', id).update({ name, description, date, hour, is_diet })
    const snack = await knex('snack').where('user_id', user_id).where('id', id).first()
    const USnack = { ...snack, user_id: undefined }
    return reply.status(200).send(USnack)
  }),
  server.get('/snack', { onRequest: [verifyJwt] }, async (request, reply) => {
    const id = request.user.sub
    const list_snack = await knex('snack')
      .where('user_id', id)
      .select('*')
      .orderBy('date', 'desc')

    let totalSnacks = 0
    let dietCount = 0
    let list_snack_map: IListSnack = {}
    for (let snack of list_snack) {
      if (snack.is_diet)
        dietCount += 1

      if (snack.date in list_snack_map) {
        list_snack_map[snack.date].push(snack)
      } else {
        list_snack_map[snack.date] = [snack]
      }

      list_snack_map[snack.date].sort((a, b) => b.hour.localeCompare(a.hour))
      totalSnacks += 1
    }

    let dietPercent = Number(Math.round(dietCount / totalSnacks * 100).toFixed(1)) ?? null
    return reply.status(200).send({ results: list_snack_map, dietPercent })
  }),
  server.get('/snack/summary', { onRequest: [verifyJwt] }, async (request, reply) => {
    const id = request.user.sub
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
      'dietPercent': Number(Math.round(data['dietCount'] / data['totalSnack'] * 100).toFixed(1)) ?? null,
      'noDietCount': data['noDietCount'],
      'totalSnack': data['totalSnack'],
      'dietSequence': data['dietSequence'].length
    }

    return reply.status(200).send(results_data)
  }),
  server.get('/snack/:id', { onRequest: [verifyJwt] }, async (request, reply) => {
    const getRequestParams = z.object({
      id: z.string().uuid(),
    })
    const { id } = getRequestParams.parse(request.params)
    const user_id = request.user.sub

    const snack = await knex('snack').where('user_id', user_id).where('id', id).first()
    const USnack = { ...snack, user_id: undefined }
    return reply.status(200).send(USnack)
  }),
  server.delete('/snack/:id', { onRequest: [verifyJwt] }, async (request, reply) => {
    const getRequestParams = z.object({
      id: z.string().uuid(),
    })
    const { id } = getRequestParams.parse(request.params)
    const user_id = request.user.sub

    await knex('snack').where('user_id', user_id).where('id', id).delete()
    return reply.status(204).send({ message: 'Successfully Deleted Meal' })
  })
}