import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('pokemon', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name', {}).notNull(),
	primaryType: text('primary_type', {
		enum: [
			'grass',
			'fire',
			'water',
			'electric',
			'psychic',
			'ice',
			'dragon',
			'dark',
			'fairy',
			'normal',
			'fighting',
			'flying',
			'poison',
			'ground',
			'rock',
			'bug',
			'ghost',
			'steel',
		],
	}).notNull(),
	secondaryType: text('secondary_type', {
		enum: [
			'grass',
			'fire',
			'water',
			'electric',
			'psychic',
			'ice',
			'dragon',
			'dark',
			'fairy',
			'normal',
			'fighting',
			'flying',
			'poison',
			'ground',
			'rock',
			'bug',
			'ghost',
			'steel',
		],
	}),
	healthPoints: int('health_points', { mode: 'number' }).notNull(),
	isLegendary: int('is_legendary', { mode: 'boolean' })
		.notNull()
		.default(false),
});
