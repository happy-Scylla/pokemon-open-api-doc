import { selectTrainerSchema } from "@/database/schema";
import { formatJsonResponse } from "@/lib/jsonFormat";
import { createRoute, z } from "@hono/zod-openapi";

export const getAll = createRoute({
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