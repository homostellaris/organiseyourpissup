<script context="module">
	import {goto} from '$app/navigation'
	import Onward from '$lib/Onwards.svelte'
	import {page} from '$app/stores'

	export const prerender = true
</script>

<svelte:head>
	<title>Invite</title>
</svelte:head>

<h1>You've been invited to a pissup</h1>
<!-- svelte-ignore missing-declaration -->
<form
	on:submit|preventDefault={async e => {
		const formData = new FormData(e.target)
		const name = formData.get('name')

		await fetch(
			`/${$page.params.pissupId}`,
			{
				method: 'PUT',
				body: JSON.stringify({
					name,
				}),
			}
		)

		await goto(`/${$page.params.pissupId}/you?name=${name}`, {replaceState: true})
	}}
>
	<!-- TODO: Hardcode a few different placeholder names to select at random. -->
	<input autofocus id="name" name="name" placeholder="Sir Guzzlington IV"> 
	<Onward/>
</form>
