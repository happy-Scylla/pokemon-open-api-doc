import { insertPokemonSchema, selectPokemonSchema } from '@/database/schema';
import { createErrorSchema } from '@/lib/error';
import { formatJsonRequest, formatJsonResponse } from '@/lib/jsonFormat';
import {paramsIdSchema } from '@/lib/validateParams';
import { createRoute, z } from '@hono/zod-openapi';

export const getAllPokemon = createRoute({
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

export const getOnePokemon = createRoute({
	path: "/tasks/{id}",
  method: "get",
  request: {
    params: paramsIdSchema,
  },
  tags: ['Pokemon'],
  responses: {
    200: formatJsonResponse(
		selectPokemonSchema,
      "The requested task",
    ),
    404: formatJsonResponse(
		createErrorSchema(),
      "Task not found",
    )
  },
});

export type GetAllPokemonRoute = typeof getAllPokemon;
export type CreatePokemonRoute = typeof createPokemon;
export type GetOnePokemonRoute = typeof getOnePokemon;
