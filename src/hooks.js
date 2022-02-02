import cookie from 'cookie'
import { v4 as uuid } from '@lukeed/uuid'

export async function handle ({ request, resolve }) {
	console.log('handle');
	const cookies = cookie.parse(request.headers.cookie || '')
	request.locals.userId = cookies.userId || uuid()

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.url.searchParams.has('_method')) {
		request.method = request.url.searchParams.get('_method').toUpperCase()
	}

	const response = await resolve(request)

	if (!cookies.userId) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = cookie.serialize('userId', request.locals.userId, {
			path: '/',
		})
	}

	return response;
};

export function getSession (request) {
	console.log('getSession');
	const {userId} = cookie.parse(request.headers.cookie || '')
	return {
		userId,
		faunadb: {
			domain: process.env.FAUNADB_DOMAIN,
			port: process.env.FAUNADB_PORT,
			scheme: process.env.FAUNADB_SCHEME,
			secret: process.env.FAUNADB_SERVER_SECRET,
		},
	}
}