import cookie from 'cookie'
import faunadb from 'faunadb'
import {toDatabaseId, toPissupId} from '$lib/id'

const q = faunadb.query

const client = new faunadb.Client({
	domain: process.env.FAUNADB_DOMAIN,
	port: process.env.FAUNADB_PORT,
	scheme: process.env.FAUNADB_SCHEME,
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export const get = async (request) => {
	const pissupId = request.params.pissupId
	const reference = toDatabaseId(pissupId)
	const response = await client.query(
		q.Get(q.Ref(q.Collection('pissup'), reference))
	)
	const pissup = response.data
	
	return {
		body: pissup
	}
}

// TODO: Add those type annotation things?
export const post = async (request) => {
	const {userId} = cookie.parse(request.headers.cookie || '');
	// TODO: Use FormData instead.
	const json = JSON.parse(request.body)

	const response = await client.query(
		q.Create(
			q.Collection('pissup'),
			{
				data: {
					pissheads: {
						[userId]: {
							name: json.name,
						}
					},
				}
			}
		)
	)
	const pissupId = toPissupId(response.ref.id)

	return {
		body: {
			pissupId
		},
	};
}

export const put = async (request) => {
	const {userId} = cookie.parse(request.headers.cookie || '');
	const pissupId = request.params.pissupId
	const reference = toDatabaseId(pissupId)
	// TODO: Use FormData instead.
	const json = JSON.parse(request.body)

	const response = await client.query(
		q.Update(
			q.Ref(q.Collection('pissup'), reference),
			{
				data: {
					pissheads: {
						[userId]: {
							dates: json.dates
						}
					}
				}
			}
		)
	)

	return {
		status: 200,
	}
}

export const patch = async (request) => {
	const {userId} = cookie.parse(request.headers.cookie || '');
	const pissupId = request.params.pissupId
	const reference = toDatabaseId(pissupId)
	// TODO: Use FormData instead.
	const json = JSON.parse(request.body)

	const response = await client.query(
		q.Update(
			q.Ref(q.Collection('pissup'), reference),
			{
				data: {
					decision: '2021-01-06'
				}
			}
		)
	)

	return {
		status: 200,
	}
}
