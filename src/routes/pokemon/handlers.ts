import type { HonoApp } from '@/lib/init-app';
import type { CreatePokemonRoute, GetAllPokemonRoute } from '@/routes/pokemon/routes';
import type { RouteConfig, RouteHandler } from '@hono/zod-openapi';
import db from '@/database';

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, HonoApp>;

export const getAllPokemon: AppRouteHandler<GetAllPokemonRoute> = async (c) => {
	const pokemon = await db.query.pokemon.findMany();

	return c.json(pokemon);
};

export const createPokemon: AppRouteHandler<CreatePokemonRoute> = async (c) => {
	return c.json({ id: 1 });
};
