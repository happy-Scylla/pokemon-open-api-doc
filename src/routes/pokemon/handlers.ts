import type { HonoApp } from '@/lib/init-app';
import type { CreatePokemonRoute, DeletePokemonRoute, GetAllPokemonRoute, GetOnePokemonRoute, UpdatePokemonRoute } from '@/routes/pokemon/routes';
import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import db from '@/database';
import { pokemon } from '@/database/schema';
import { eq } from 'drizzle-orm';

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, HonoApp>;

export const getAllPokemon: AppRouteHandler<GetAllPokemonRoute> = async (c) => {
	const pokemon = await db.query.pokemon.findMany();

	return c.json(pokemon);
};

export const createPokemon: AppRouteHandler<CreatePokemonRoute> = async (c) => {
	const newPokemon = c.req.valid('json');
	const [insertedPokemon] = await db.insert(pokemon).values(newPokemon).returning();

	return c.json({id: insertedPokemon.id}, 200);
};

export const getOnePokemon: AppRouteHandler<GetOnePokemonRoute> = async (c) => {
	const { id} = c.req.valid('param');
	const pokemon = await db.query.pokemon.findFirst({
		where(fields, operators) {
			return operators.eq(fields.id, id);
		}
	});

	if (!pokemon) {
		return c.json({ error: 'Pokemon not found' }, 404);
	}

	return c.json(pokemon, 200);
};

export const updatePokemon: AppRouteHandler<UpdatePokemonRoute> = async (c) => {
	const { id } = c.req.valid('param');
	const reqPokemon = c.req.valid('json');
	
	if (Object.keys(pokemon).length === 0) {
		return c.json({ error: 'No data provided' }, 422);
	}

	const [updatedPokemon] = await db
		.update(pokemon)
		.set(reqPokemon)
		.where(eq(pokemon.id, id))
		.returning();

	if (!updatedPokemon) {
		return c.json({ error: 'Pokemon not found' }, 404);
	}

	return c.json({ id: updatedPokemon.id }, 200);
};

export const deletePokemon: AppRouteHandler<DeletePokemonRoute> = async (c) => {
	const { id } = c.req.valid('param');
	const deletedPokemon = await db
		.delete(pokemon)
		.where(eq(pokemon.id, id));

	if (deletedPokemon.rowsAffected === 0) {
		return c.json({ error: 'Pokemon not found' }, 404);
	}

	return c.json(null, 200);
};
