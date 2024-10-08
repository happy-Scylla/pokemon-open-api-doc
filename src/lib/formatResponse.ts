import type { ZodSchema } from 'zod';

export default function formatJsonResponse<S extends ZodSchema>(
	schema: S,
	description: string
) {
	return {
		content: {
			'application/json': {
				schema,
			},
		},
		description,
	};
}
