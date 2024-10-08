import parsedEnv from '@/env';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = createClient({ url: parsedEnv.DATABASE_URL });
const db = drizzle(client);

export default db;
