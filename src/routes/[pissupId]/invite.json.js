import faunadb from 'faunadb'
import {toDatabaseId} from '$lib/id'

const q = faunadb.query

const client = new faunadb.Client({
	domain: process.env.FAUNADB_DOMAIN,
	port: process.env.FAUNADB_PORT,
	scheme: process.env.FAUNADB_SCHEME,
	secret: process.env.FAUNADB_SERVER_SECRET,
})

export async function post ({locals, params, request}) {
	const pissupId = params.pissupId
	const reference = toDatabaseId(pissupId)

	console.log('HELLO')
	const data = await request.formData()
	console.log(data)
	const name = data.get('name')


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