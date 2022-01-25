<script>
	import faunadb from 'faunadb'
	import {goto} from '$app/navigation'
	import {page, session} from '$app/stores'
	import NavButtons from '$lib/NavButtons.svelte'
	import {onMount} from 'svelte'
	import {toDatabaseId} from '$lib/id'

	let status = 'Not started'
	let pissheads = Object.values($page.stuff.pissup.pissheads)

	onMount(() => {
		const client = new faunadb.Client({...$session.faunadb})
		const q = faunadb.query

		const databaseId = toDatabaseId($page.params.pissupId)
		const docRef = q.Ref(q.Collection('pissup'), databaseId)

		let stream

		console.log('Streaming pissup', databaseId)
		const startStream = () => {
			stream = client.stream.document(docRef)
				.on('snapshot', snapshot => {
					console.log('snapshot')
				})
				.on('version', version => {
					console.log('version')
					pissheads = Object.values(version.document.data.pissheads)
					status = 'Updated: someone joined the party!'
				})
				.on('error', error => {
					console.log('Error:', error)
					stream.close()
					setTimeout(startStream, 1000)
				})
				.start()
		}

		startStream()
		status = 'Started live-streaming'
	})
</script>

<h1>Here's everyone's availability, choose a date!</h1>
<div class="streaming-status">{status}</div>
{#each pissheads as pisshead}
	<div class="pisshead">{pisshead.name}</div>
{/each}
<form
	on:submit|preventDefault={async e => {
		const response = await fetch(
			`/${$page.params.pissupId}.json`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					decision: '2021-01-06',
				}),
			}
		)
		goto(`/${$page.params.pissupId}/decision`)
	}}
>
	<NavButtons/>
</form>
