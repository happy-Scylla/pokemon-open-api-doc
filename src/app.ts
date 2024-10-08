import initApp from '@/lib/init-app';
import configureOpenApi from '@/lib/open-api';
import index from '@/routes/index';
import pokemon from '@/routes/pokemon/index';

const app = initApp();
configureOpenApi(app);

const routes = [index, pokemon] as const;

for (const route of routes) {
	app.route('/', route);
}

export default app;
