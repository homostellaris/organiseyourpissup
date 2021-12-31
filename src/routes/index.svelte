<script context="module">
	import {goto} from '$app/navigation';

	export const prerender = true;
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Alright pisshead, let's start with your name.</h1>
<!-- svelte-ignore missing-declaration -->
<form
	on:submit|preventDefault={async e => {
		const formData = new FormData(e.target)
		const name = formData.get('name')
		const response = await fetch(
			'/pissup/create.json',
			{
				method: 'POST',
				body: JSON.stringify({
					name,
				}),
			}
		)
		const json = await response.json()
		goto(`/${json.uid}/you?name=${name}`)
	}}
>
	<input id="name" name="name" placeholder="Sir Guzzlington IV">
	<button type="submit">ONWARDS</button>
</form>
<!-- TODO: Can I do a sweet transition from this page to the next? -->

<style>
	button {
		background-color: greenyellow;
	}
</style>