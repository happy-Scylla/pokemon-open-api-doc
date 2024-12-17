import db from "@/database";
import type { AppRouteHandler } from "@/routes/pokemon/handlers";
import type { CreateTrainerRoute, GetAllTrainerRoute } from "@/routes/trainer/routes";

export const getAllTrainer: AppRouteHandler<GetAllTrainerRoute> = async (c) => {
    const trainer = await db.query.trainer.findMany();

    return c.json(trainer);
};

export const createTrainer: AppRouteHandler<CreateTrainerRoute> = async (c) => {
    return c.json({ id: 1 });
};