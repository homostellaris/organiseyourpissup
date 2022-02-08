import faunadb from 'faunadb'
import {toDatabaseId} from '$lib/id'

const q = faunadb.query

const client = new faunadb.Client({
	domain: process.env.FAUNADB_DOMAIN,
	port: process.env.FAUNADB_PORT,
	scheme: process.env.FAUNADB_SCHEME,
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export async function get ({params, locals}) {
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

export async function put ({locals, params, request}) {
	const pissupId = params.pissupId
	const reference = toDatabaseId(pissupId)

	const {dates} = await request.json()
	console.log(dates)

	await client.query(
		q.Update(
			q.Ref(q.Collection('pissup'), reference),
			{
				data: {
					pissheads: {
						[locals.userId]: {
							dates,
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
