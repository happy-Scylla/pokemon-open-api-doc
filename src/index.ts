import app from '@/app';
import parsedEnv from '@/env';
import { serve } from '@hono/node-server';

const port = parsedEnv.PORT;
// biome-ignore lint/suspicious/noConsole: <console log for starting our server>
console.log(`Server is running on port http://localhost:${port}`);

serve({
	fetch: app.fetch,
	port,
});
