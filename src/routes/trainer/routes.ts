import { insertTrainerSchema, selectTrainerSchema } from "@/database/schema";
import { formatJsonRequest, formatJsonResponse } from "@/lib/jsonFormat";
import { createRoute, z } from "@hono/zod-openapi";

export const getAlTrainerl = createRoute({
    path: "/trainer",
    method: "get",
    tags: ["Trainer"],
    responses: {
        200: formatJsonResponse(
            z.array(selectTrainerSchema),
            "list of all trainers"
        ),
    }
});

export const createTrainer = createRoute({
	path: '/trainer/add',
	method: 'post',
	tags: ['Trainer'],
	request: {
		body: formatJsonRequest(insertTrainerSchema, 'add trainer'),
	},
	responses: {
		200: formatJsonResponse(
			z.object({
				id: z.number(),
			}),
			'trainer created'
		),
	},
});

export type GetAllTrainerRoute = typeof getAlTrainerl;
export type CreateTrainerRoute = typeof createTrainer;