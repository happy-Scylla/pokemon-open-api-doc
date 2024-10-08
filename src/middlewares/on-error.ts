import type { ErrorHandler } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';

const onError: ErrorHandler = (error, c) => {
	const status =
		'status' in error ? error?.status : c.newResponse(null).status;
	const message = error?.message || 'Internal Server Error';

	return c.json(
		{
			message,
			stack: error.stack,
		},
		status !== 200 ? (status as StatusCode) : 500
	);
};

export default onError;
