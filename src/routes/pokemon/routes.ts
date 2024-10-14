import { selectPokemonSchema } from '@/database/schema';
import formatJsonResponse from '@/lib/formatResponse';
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

export type GetAllRoute = typeof getAll;
