<script context="module">
	import Datepicker from "$lib/Datepicker.svelte"
	import {goto} from '$app/navigation'
	import {page, session} from '$app/stores'
	import NavButtons from '$lib/NavButtons.svelte'

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({fetch, params}) {
		const response = await fetch(
			`/${params.pissupId}.json`,
			{method: 'GET'},
		)

		const pissup = await response.json()

		return {
			status: 200,
			props: {
				pissup,
			},
			stuff: {
				pissup,
			}
		};
	}
</script>

<script>
	let user = $page.stuff.pissup.pissheads[$session.userId]
	let name = $page.url.searchParams.get('name') || user.name
	let dates = user.dates || []
</script>


<!-- TODO: Should I use stores or session here instead of the query param? -->
<!-- Should use load function to support rendering existing selection here. -->
<!-- Need to add ability to edit name here too because pre-rendered page won't show data if for some reason the user comes back here. -->
<h1>Alright {name}, when can you do?</h1>
<!-- svelte-ignore missing-declaration -->
<form
	on:submit|preventDefault={async e => {
		console.log(dates)
		await fetch(
			`/${$page.params.pissupId}.json`,
			{
				method: 'PUT',
				body: JSON.stringify({
					dates,
				}),
			}
		)
		goto(`/${$page.params.pissupId}/everyone`)
	}}
>
	<Datepicker bind:selected={dates}/>
	<NavButtons/>
</form>
