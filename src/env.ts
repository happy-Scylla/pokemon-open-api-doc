import { config } from 'dotenv';
import { z } from 'zod';

config();

const EnvSchema = z
	.object({
		NODE_ENV: z.string().default('development'),
		PORT: z.coerce.number().default(3000),
		LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
		DATABASE_URL: z.string().url(),
		DATABASE_AUTH_TOKEN: z.string().optional(),
	})
	.superRefine((data, ctx) => {
		if (data.NODE_ENV === 'production' && !data.DATABASE_AUTH_TOKEN) {
			ctx.addIssue({
				code: z.ZodIssueCode.invalid_type,
				expected: 'string',
				received: 'undefined',
				path: ['DATABASE_AUTH_TOKEN'],
				message: 'DATABASE_AUTH_TOKEN is required in production',
			});
		}
	});

export type ParsedEnv = z.infer<typeof EnvSchema>;

// biome-ignore lint/nursery/noProcessEnv: <We need to parse process.env here>
const parsedEnv = EnvSchema.safeParse(process.env);
if (parsedEnv.error) {
	// biome-ignore lint/suspicious/noConsole: <pino logger does not exist at this point>
	console.error('INVALID ENV:', parsedEnv.error.flatten().fieldErrors);
	process.exit(1);
}

export default parsedEnv.data;
