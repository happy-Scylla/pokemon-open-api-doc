import type { NotFoundHandler } from 'hono';

const notFound: NotFoundHandler = (c) => {
	return c.json(
		{
			message: `Sorry, could not be found - ${c.req.path}`,
		},
		404
	);
};

export default notFound;
