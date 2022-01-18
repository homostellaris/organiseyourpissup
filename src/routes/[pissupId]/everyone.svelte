<script>
	import {goto} from '$app/navigation'
	import {page} from '$app/stores'
</script>

<h1>Here's everyone's availability, choose a date!</h1>
<p>TODO: Add amazing real-time updating visual of everyone's availability</p>
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
	<button type="submit">ONWARDS</button>
</form>
