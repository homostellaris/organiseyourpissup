import faunadb from 'faunadb'
import {toPissupId} from '$lib/id'

const q = faunadb.query

// TODO: Add those type annotation things?
export const post = async (request) => {
	// TODO: Use FormData instead.
	const json = JSON.parse(request.body)

	const client = new faunadb.Client({
		secret: 'secret',
		domain: 'localhost',
		port: 8443,
		scheme: 'http',
	})

	const response = await client.query(
		q.Create(
			q.Collection('pissup'),
			{
				data: {
					pissheads: [
						{
							name: json.name,
						}
					],
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
