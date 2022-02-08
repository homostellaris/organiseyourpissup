import faunadb from 'faunadb'
import {toDatabaseId, toPissupId} from '$lib/id'

const q = faunadb.query

const client = new faunadb.Client({
	domain: process.env.FAUNADB_DOMAIN,
	port: process.env.FAUNADB_PORT,
	scheme: process.env.FAUNADB_SCHEME,
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export const get = async ({params, locals}) => {
	const pissupId = params.pissupId
	const reference = toDatabaseId(pissupId)
	const response = await client.query(
		q.Get(q.Ref(q.Collection('pissup'), reference))
	)
	const pissup = response.data
	const user = pissup.pissheads[locals.userId]
	
	return {
		status: 200,
		body: {
			pissup,
			user,
		}
	}
}

export const patch = async (request) => {
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