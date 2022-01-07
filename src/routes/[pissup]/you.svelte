<script context="module">
	import faunadb from 'faunadb'
	import {page} from '$app/stores'
	import {toDatabaseId} from '$lib/id'

	const q = faunadb.query

	const client = new faunadb.Client({
		secret: 'secret',
		domain: 'localhost',
		port: 8443,
		scheme: 'http',
	})

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const pissupId = page.params.pissup
		const reference = toDatabaseId(pissupId)
		const response = await client.query(
			q.Get(q.Ref(q.Collection('pissup'), reference))
		)

		return {
			status: 200,
		};
	}
</script>



<!-- TODO: Should I use stores or session here instead of the query param? -->
<!-- Should use load function to support rendering existing selection here. -->
<!-- Need to add ability to edit name here too because pre-rendered page won't show data if for some reason the user comes back here. -->
<h1>Alright {$page.query.get('name')}, when can you do?</h1>
<p>TODO: Add calendar selection</p>
<form action="/{$page.params.pissup}/everyone">
	<button type="submit">ONWARDS</button>
</form>
