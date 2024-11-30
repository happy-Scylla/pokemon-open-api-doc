import { relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const pokemon = sqliteTable('pokemon', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
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

export const selectPokemonSchema = createSelectSchema(pokemon);
export const insertPokemonSchema = createInsertSchema(pokemon)
	.required({ isLegendary: true })
	.omit({ id: true });

export const pokemonRelations = relations(pokemon, ({ many }) => ({
	trainer: many(trainer),
}));

export const trainer = sqliteTable('trainer', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
	experiencePoints: int('experience_points', { mode: 'number' }).notNull(),
	favouritePokemon: int('favourite_pokemon').references(() => pokemon.id),
});

export const selectTrainerSchema = createSelectSchema(trainer);
export const insertTrainerSchema = createInsertSchema(trainer)

export const trainerRelations = relations(trainer, ({ one }) => ({
	favouritePokemon: one(pokemon, {
		fields: [trainer.favouritePokemon],
		references: [pokemon.id],
	}),
}));