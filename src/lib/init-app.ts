import serveEmojiFavicon from '@/middlewares/favIcon';
import prettyLogger from '@/middlewares/logger';
import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

export type HonoApp = {
	Variables: {
		logger: PinoLogger;
	};
};

export const createRouter = () => {
	return new OpenAPIHono<HonoApp>({
		strict: false,
		defaultHook: (result, c) => {
			if (!result.success) {
				return c.json(
					{
						ok: false,
						error: result.error,
					},
					422
				);
			}
		},
	});
};

export default function initApp() {
	const app = createRouter();

	app.use(prettyLogger());
	app.use(serveEmojiFavicon('🦄'));

	app.notFound(notFound);
	app.onError(onError);

	return app;
}
