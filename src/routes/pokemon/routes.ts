import { insertPokemonSchema, selectPokemonSchema, updatePokemonSchema } from '@/database/schema';
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

export const updatePokemon = createRoute({
	path: '/pokemon/{id}',
	method: 'put',
	request: {
		params: paramsIdSchema,
		body: formatJsonRequest(updatePokemonSchema, 'update pokemon'),
	},
	tags: ['Pokemon'],
	responses: {
		200: formatJsonResponse(
			z.object({
				id: z.number(),
			}),
			'pokemon updated'
		),
		404: formatJsonResponse(
			createErrorSchema(),
			'pokemon not found'
		),
		422: formatJsonResponse(
			createErrorSchema(),
			'update request empty'
		),
	},
});

export const deletePokemon = createRoute({
	path: '/pokemon/{id}',
	method: 'delete',
	request: {
		params: paramsIdSchema,
	},
	tags: ['Pokemon'],
	responses: {
		200: { description: 'pokemon deleted' },
		404: formatJsonResponse(
			createErrorSchema(),
			'pokemon not found'
		),
	},
});

export type GetAllPokemonRoute = typeof getAllPokemon;
export type CreatePokemonRoute = typeof createPokemon;
export type GetOnePokemonRoute = typeof getOnePokemon;
export type UpdatePokemonRoute = typeof updatePokemon;
export type DeletePokemonRoute = typeof deletePokemon;
