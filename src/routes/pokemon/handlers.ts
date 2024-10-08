import type { HonoApp } from '@/lib/init-app';
import type { GetAllRoute } from '@/routes/pokemon/routes';
import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, HonoApp>;

export const getAll: AppRouteHandler<GetAllRoute> = async (c) => {
	return c.json({ message: 'Pokemon API' });
};
