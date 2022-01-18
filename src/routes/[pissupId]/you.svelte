<script context="module">
	import {goto} from '$app/navigation'
	import {page, session} from '$app/stores'
</script>

<script>
	let name = $page.url.searchParams.get('name') || $page.stuff.pissup.pissheads[$session.userId].name
</script>


<!-- TODO: Should I use stores or session here instead of the query param? -->
<!-- Should use load function to support rendering existing selection here. -->
<!-- Need to add ability to edit name here too because pre-rendered page won't show data if for some reason the user comes back here. -->
<h1>Alright {name}, when can you do?</h1>
<p>TODO: Add calendar selection</p>
<!-- svelte-ignore missing-declaration -->
<form
	on:submit|preventDefault={async e => {
		const response = await fetch(
			`/${$page.params.pissupId}.json`,
			{
				method: 'PUT',
				body: JSON.stringify({
					dates: ['2021-01-01', '2021-01-05', '2021-01-06'],
				}),
			}
		)
		goto(`/${$page.params.pissupId}/everyone`)
	}}
>
	<button type="submit">ONWARDS</button>
</form>
