import * as routes from './routes';
import * as handlers from './handlers';
import { createRouter } from '@/lib/init-app';

const router = createRouter()
    .openapi(routes.getAlTrainerl, handlers.getAllTrainer)
    .openapi(routes.createTrainer, handlers.createTrainer);

export default router;