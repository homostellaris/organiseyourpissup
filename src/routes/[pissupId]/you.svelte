<script>
	import Datepicker from "$lib/Datepicker.svelte"
	import {goto} from '$app/navigation'
	import NavButtons from '$lib/NavButtons.svelte'
	import {page} from '$app/stores'

	export let user
	export let pissup

	let name = $page.url.searchParams.get('name') || user.name
	let dates = user.dates || []
</script>


<!-- TODO: Should I use stores or session here instead of the query param? -->
<!-- Should use load function to support rendering existing selection here. -->
<!-- Need to add ability to edit name here too because pre-rendered page won't show data if for some reason the user comes back here. -->
<h1>Alright {name}, when can you do?</h1>
<!-- svelte-ignore missing-declaration -->
<form
	on:submit|preventDefault={async _ => {
		await fetch(
			`/${$page.params.pissupId}/you`,
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
	<NavButtons position={'center'}/>
</form>
