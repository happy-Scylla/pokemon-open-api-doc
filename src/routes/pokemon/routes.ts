import formatJsonResponse from '@/lib/formatResponse';
import { createRoute, z } from '@hono/zod-openapi';

const tags = ['Pokemon'];

export const getAll = createRoute({
	path: '/pokemon',
	method: 'get',
	tags,
	responses: {
		200: formatJsonResponse(
			z
				.object({ message: z.string() })
				.openapi({ example: { message: 'list of all pokemon' } }),
			'list of all pokemon'
		),
	},
});

export type GetAllRoute = typeof getAll;
