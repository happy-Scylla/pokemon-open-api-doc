import formatJsonResponse from '@/lib/formatResponse';
import { createRouter } from '@/lib/init-app';
import { createRoute, z } from '@hono/zod-openapi';

const router = createRouter().openapi(
	createRoute({
		tags: ['Index'],
		method: 'get',
		path: '/',
		responses: {
			200: formatJsonResponse(
				z
					.object({
						message: z.string(),
					})
					.openapi({
						example: { message: 'Tasks API' },
					}),
				'Index route'
			),
		},
	}),
	(c) => {
		return c.json(
			{
				message: 'Tasks API',
			},
			200
		);
	}
);

export default router;
