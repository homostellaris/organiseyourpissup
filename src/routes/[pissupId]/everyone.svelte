<script>
	import { goto } from '$app/navigation'
	import { page,session } from '$app/stores'
	import Datepicker from '$lib/Datepicker.svelte'
	import { toDatabaseId } from '$lib/id'
	import NavButtons from '$lib/NavButtons.svelte'
	import Pissheads from '$lib/Pissheads.svelte'
	import faunadb from 'faunadb'
	import { onMount } from 'svelte'
	import StreamingStatus from '$lib/StreamingStatus.svelte'
	import PissheadInviter from '$lib/PissheadInviter.svelte'

	export let user
	let dates = user.dates || []

	let status = 'Not started'
	let pissheads = []

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
					pissheads = Object.values(snapshot.data.pissheads)
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

<h3>Here are the other pissheads!</h3>
<StreamingStatus {status}/>
<Pissheads {pissheads}/>

<h3>Use this link to invite more.</h3>
<PissheadInviter/>

<h3>Here's everyone's availability, choose a date!</h3>
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
	<Datepicker bind:selected={dates}/>
	<ol id="suggested-dates">
		<li>1st January</li>
		<li>15th February</li>
		<li>16th May</li>
	</ol>
	<NavButtons/>
</form>

<style>
	h3 {
		align-self: flex-start;
	}
</style>