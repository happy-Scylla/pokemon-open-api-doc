import { z } from "zod";

export const createErrorSchema = () => {
    return z.object({
		error: z.string(),
	  }).openapi({ 
        example: { 
            error: "Ups, something went wrong!" 
        }
    });
};