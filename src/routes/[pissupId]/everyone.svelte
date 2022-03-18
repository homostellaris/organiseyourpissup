<script>
	import { goto } from '$app/navigation'
	import { page,session } from '$app/stores'
	// import Datepicker from '$lib/Datepicker.svelte'
	import convertDatesToStrings from '$lib/convertDatesToStrings'
	import BestDates from '$lib/BestDates.svelte'
	import { toDatabaseId } from '$lib/id'
	import Onwards from '$lib/Onwards.svelte'
	import Retreat from '$lib/Retreat.svelte'
	import Pissheads from '$lib/Pissheads.svelte'
	import faunadb from 'faunadb'
	import { onMount } from 'svelte'
	import StreamingStatus from '$lib/StreamingStatus.svelte'
	import PissheadInviter from '$lib/PissheadInviter.svelte'

	export let pissup

	let pissheads
	let pissheadsCount
	// let dates
	let decision = pissup.decision ? pissup.decision : null
	let status = 'Not started'

	$: pissheads = pissup.pissheads
	$: pissheadsCount = Object.values(pissheads).length
	$: pissheadsWithDates = Object.values(pissheads)
		.filter(pisshead => pisshead.dates && pisshead.dates.length)
	// $: dates = Object.entries(pissheads)
	// 	.filter(([pissheadId, _]) => selected ? pissheadId === selected : true)
	// 	.map(([_, pisshead]) => pisshead.dates)
	// 	.reduce((allDates, pissheadDates) => allDates.concat(pissheadDates), [])
	// 	.map(date => new Date(date).getTime())

	onMount(() => {
		const q = faunadb.query
		const client = new faunadb.Client({...$session.faunadb})

		const databaseId = toDatabaseId($page.params.pissupId)
		const docRef = q.Ref(q.Collection('pissup'), databaseId)

		let stream

		console.log('Streaming pissup', databaseId)
		const startStream = () => {
			stream = client.stream.document(docRef)
				.on('snapshot', snapshot => {
					console.log('snapshot')
					pissup = convertDatesToStrings(snapshot.data)
				})
				.on('version', version => {
					console.log('version')
					pissup = convertDatesToStrings(version.document.data)

					const decisionUpdated = pissup.decision && pissup.decision !== decision
					if (decisionUpdated) goto('decision')

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
		status = 'Live-streaming updates 📡'
	})
</script>

<svelte:head>
	<title>Everyone</title>
</svelte:head>

<StreamingStatus {status}/>

<h2>
	{pissheadsCount > 1 ? 'Here are the other pissheads!' : "You are the only pisshead here..."}
</h2>
<Pissheads {pissheads}/>
<PissheadInviter/>

<!-- <h2>Here's everyone's availability</h2>
<Datepicker disabledTo={10000} selected={dates}/> -->

{#if pissheadsWithDates.length > 1}
	<h2>Choose a date</h2>
	<!-- svelte-ignore missing-declaration -->
	<form
		id="everyone"
		on:submit|preventDefault={async e => {
			const formData = new FormData(e.target)
			const decision = formData.get('best-dates')

			await fetch(
				'everyone',
				{
					method: 'PATCH',
					body: JSON.stringify({
						decision,
					}),
				}
			)
			goto('decision')
		}}
	>
		<BestDates {pissheads} bind:selected={decision}/>
	</form>
{:else}
	<h2>Next steps</h2>
	<ol>
		<li>Invite more pissheads 👆</li>
		<li>Choose a date 📅</li>
		<li>You're done! ✅</li>
	</ol>
{/if}

<div>
	<Retreat back="you"/>
	<Onwards disabled={pissheadsWithDates.length < 2 || !decision} form="everyone"/>
</div>

<style>
	h2 {
		align-self: flex-start;
	}
</style>