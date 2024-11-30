import initApp from '@/lib/init-app';
import configureOpenApi from '@/lib/open-api';
import index from '@/routes/index';
import pokemon from '@/routes/pokemon/index';
import trainer from '@/routes/trainer/index'

const app = initApp();
configureOpenApi(app);

const routes = [index, pokemon, trainer] as const;

for (const route of routes) {
	app.route('/', route);
}

export default app;
