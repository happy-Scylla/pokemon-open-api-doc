import type { HonoApp } from '@/lib/init-app';
import type { CreatePokemonRoute, GetAllPokemonRoute, GetOnePokemonRoute } from '@/routes/pokemon/routes';
import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import db from '@/database';
import { pokemon } from '@/database/schema';

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
