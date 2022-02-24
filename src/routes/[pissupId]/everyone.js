import faunadb from 'faunadb'
import {toDatabaseId} from '$lib/id'
import convertDatesToStrings from '$lib/convertDatesToStrings'

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
	const pissup = convertDatesToStrings(response.data)
	const user = pissup.pissheads[locals.userId]
	
	return {
		status: 200,
		body: {
			pissup,
			user,
		}
	}
}

export async function patch ({params, request}) {
	const pissupId = params.pissupId
	const reference = toDatabaseId(pissupId)
	// TODO: Use FormData instead.
	const {decision} = await request.json()

	await client.query(
		q.Update(
			q.Ref(q.Collection('pissup'), reference),
			{
				data: {
					decision: q.Date(new Date(decision).toISOString().split('T')[0])
				}
			}
		)
	)

	return {
		status: 200,
	}
}