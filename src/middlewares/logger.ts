import parsedEnv from '@/env';
import { logger } from 'hono-pino';
import pino from 'pino';
import pretty from 'pino-pretty';

export default function prettyLogger() {
	return logger({
		pino: pino(
			{
				level: parsedEnv.LOG_LEVEL,
			},
			pretty()
		),
		http: {
			reqId: () => crypto.randomUUID(),
		},
	});
}
