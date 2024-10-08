import { config } from 'dotenv';
import { z } from 'zod';

config();

const EnvSchema = z.object({
	NODE_ENV: z.string().default('development'),
	PORT: z.coerce.number().default(3000),
	LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
});

export type ParsedEnv = z.infer<typeof EnvSchema>;

// biome-ignore lint/nursery/noProcessEnv: <We need to parse process.env here>
const parsedEnv = EnvSchema.safeParse(process.env);
if (!parsedEnv.success) {
	// biome-ignore lint/suspicious/noConsole: <pino logger does not exist at this point>
	console.error('INVALID ENV:', parsedEnv.error.flatten().fieldErrors);
	process.exit(1);
}

export default parsedEnv.data;
