import { insertPokemonSchema, selectPokemonSchema } from '@/database/schema';
import { formatJsonRequest, formatJsonResponse } from '@/lib/jsonFormat';
import { createRoute, z } from '@hono/zod-openapi';

export const getAll = createRoute({
	path: '/pokemon',
	method: 'get',
	tags: ['Pokemon'],
	responses: {
		200: formatJsonResponse(
			z.array(selectPokemonSchema),
			'list of all pokemon'
		),
	},
});

export const createPokemon = createRoute({
	path: '/pokemon/add',
	method: 'post',
	tags: ['Pokemon'],
	request: {
		body: formatJsonRequest(insertPokemonSchema, 'add pokemon'),
	},
	responses: {
		200: formatJsonResponse(
			z.object({
				id: z.number(),
			}),
			'pokemon created'
		),
	},
});

export type GetAllRoute = typeof getAll;
export type CreatePokemonRoute = typeof createPokemon;
