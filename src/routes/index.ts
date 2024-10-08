import { createRouter } from '@/lib/init-app';
import { createRoute, z } from '@hono/zod-openapi';

const router = createRouter().openapi(
	createRoute({
		tags: ['Index'],
		method: 'get',
		path: '/',
		responses: {
			200: {
				content: {
					'application/json': {
						schema: z.object({
							message: z.string(),
						}),
					},
				},
				description: 'Index route',
			},
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
