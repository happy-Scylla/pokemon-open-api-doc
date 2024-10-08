import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';

import { OpenAPIHono } from '@hono/zod-openapi';
import { prettyLogger } from '@/middlewares/logger';
import type { PinoLogger } from 'hono-pino';
import serveEmojiFavicon from '@/middlewares/favIcon';
import initApp from '@/lib/init-app';

const app = initApp();

app.get('/', (c) => c.text('Hello, World!'));

export default app;
