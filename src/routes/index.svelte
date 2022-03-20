<script context="module">
	import {goto} from '$app/navigation';
	import Onward from '$lib/Onwards.svelte'

	export const prerender = true
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Alright pisshead</h1>
<p>Let's start with your name</p>
<!-- svelte-ignore missing-declaration -->
<form
	on:submit|preventDefault={async e => {
		const formData = new FormData(e.target)
		const name = formData.get('name')

		const response = await fetch(
			'/create.json',
			{
				method: 'POST',
				body: formData
			}
		)

		const pissupId = await response.text()
		await goto(`/${pissupId}/you?name=${name}`, {replaceState: true})
	}}
>
	<!-- TODO: Hardcode a few different placeholder names to select at random. -->
	<input autofocus id="name" name="name" placeholder="Sir Guzzlington IV"> 
	<Onward/>
</form>
<!-- TODO: Can I do a sweet transition from this page to the next? -->
