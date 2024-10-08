import serveEmojiFavicon from '@/middlewares/favIcon';
import { prettyLogger } from '@/middlewares/logger';
import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

type HonoApp = {
	Variables: {
		logger: PinoLogger;
	};
};

export default function initApp() {
	const app = new OpenAPIHono<HonoApp>({ strict: false });

	app.use(prettyLogger());
	app.use(serveEmojiFavicon('🦄'));

	app.notFound(notFound);
	app.onError(onError);

	return app;
}
