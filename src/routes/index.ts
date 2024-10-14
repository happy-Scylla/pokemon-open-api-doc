import { formatJsonResponse } from '@/lib/jsonFormat';
import { createRouter } from '@/lib/init-app';
import { createRoute, z } from '@hono/zod-openapi';

const router = createRouter().openapi(
	createRoute({
		tags: ['Ping'],
		method: 'get',
		path: '/',
		responses: {
			200: formatJsonResponse(
				z
					.object({
						message: z.string(),
					})
					.openapi({
						example: { message: 'Pokemon API' },
					}),
				'Index route'
			),
		},
	}),
	(c) => {
		return c.json(
			{
				message: 'Pokemon API',
			},
			200
		);
	}
);

export default router;
