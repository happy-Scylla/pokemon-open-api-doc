import type { HonoApp } from '@/lib/init-app';
import type { OpenAPIHono } from '@hono/zod-openapi';
import packageJson from '../../package.json' with { type: 'json' };
import { apiReference } from '@scalar/hono-api-reference';

type OpenApiHonoApp = OpenAPIHono<HonoApp>;

export default function configureOpenApi(app: OpenApiHonoApp) {
	app.doc('/doc', {
		openapi: '3.0.0',
		info: { version: packageJson.version, title: packageJson.name },
	});

	app.get(
		'/ref',
		apiReference({
			theme: 'bluePlanet',
			layout: 'classic',
			defaultHttpClient: {
				targetKey: 'javascript',
				clientKey: 'axios',
			},
			spec: { url: '/doc' },
		})
	);
}
