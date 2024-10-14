import parsedEnv from '@/env';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({ url: parsedEnv.DATABASE_URL });
const db = drizzle(client, { schema });

export default db;
