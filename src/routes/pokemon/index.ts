import { createRouter } from '@/lib/init-app';

import * as routes from './routes';
import * as handlers from './handlers';

const router = createRouter().openapi(routes.getAll, handlers.getAll);

export default router;
