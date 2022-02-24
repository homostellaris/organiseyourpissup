import faunadb from 'faunadb'
import {toDatabaseId} from '$lib/id'

const q = faunadb.query

const client = new faunadb.Client({
	domain: process.env.FAUNADB_DOMAIN,
	port: process.env.FAUNADB_PORT,
	scheme: process.env.FAUNADB_SCHEME,
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export async function put ({locals, params, request}) {
	const pissupId = params.pissupId
	const reference = toDatabaseId(pissupId)

	const {name} = await request.json()

	await client.query(
		q.Update(
			q.Ref(q.Collection('pissup'), reference),
			{
				data: {
					pissheads: {
						[locals.userId]: {
							name
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
