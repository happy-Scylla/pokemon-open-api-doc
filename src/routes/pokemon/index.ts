import { createRouter } from '@/lib/init-app';

import * as routes from './routes';
import * as handlers from './handlers';

const router = createRouter()
	.openapi(routes.getAllPokemon, handlers.getAllPokemon)
	.openapi(routes.createPokemon, handlers.createPokemon)
	.openapi(routes.getOnePokemon, handlers.getOnePokemon)
	.openapi(routes.updatePokemon, handlers.updatePokemon)
	.openapi(routes.deletePokemon, handlers.deletePokemon);

export default router;
