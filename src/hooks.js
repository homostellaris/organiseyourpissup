import cookie from 'cookie'
import { v4 as uuid } from '@lukeed/uuid'

export async function handle ({ event, resolve }) {
	console.log('handle')
	const cookieHeader = event.request.headers.get('cookie')
	const cookies = cookie.parse(cookieHeader || '')
	event.locals.userId = cookies.userId || uuid()

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (event.url.searchParams.has('_method')) {
		event.method = event.url.searchParams.get('_method').toUpperCase()
	}

	const response = await resolve(event)

	if (!cookies.userId) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = cookie.serialize('userId', event.locals.userId, {
			path: '/',
		})
	}

	return response;
};

export function getSession (request) {
	console.log('getSession');
	return {
		userId: request.locals.userId,
		faunadb: {
			domain: process.env.FAUNADB_DOMAIN,
			port: process.env.FAUNADB_PORT,
			scheme: process.env.FAUNADB_SCHEME,
			secret: process.env.FAUNADB_SERVER_SECRET,
		},
	}
}