import type { ZodSchema } from 'zod';

export function formatJsonResponse<S extends ZodSchema>(
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

export function formatJsonRequest<S extends ZodSchema>(
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
		required: true,
	};
}