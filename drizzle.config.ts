import { defineConfig } from 'drizzle-kit';
import parsedEnv from '@/env';

export default defineConfig({
	out: './src/database/migrations',
	schema: './src/database/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: parsedEnv.DATABASE_URL,
	},
});
