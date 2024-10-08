import { sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export type PokemonTypes =
	| 'grass'
	| 'fire'
	| 'water'
	| 'electric'
	| 'psychic'
	| 'ice'
	| 'dragon'
	| 'dark'
	| 'fairy'
	| 'normal'
	| 'fighting'
	| 'flying'
	| 'poison'
	| 'ground'
	| 'rock'
	| 'bug'
	| 'ghost'
	| 'steel';

export const usersTable = sqliteTable('pokemon', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	primaryType: text('primary_type').$type<PokemonTypes>().notNull(),
	secondaryType: text('secondary_type').$type<PokemonTypes>(),
	healthPoints: int('health_points', { mode: 'number' }).notNull(),
	isLegendary: int('is_legendary', { mode: 'boolean' })
		.notNull()
		.default(false),
	createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
	updatedAt: text('updated_at')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.$onUpdate(() => sql`(CURRENT_TIMESTAMP)`), // updatedAt is not working
});
