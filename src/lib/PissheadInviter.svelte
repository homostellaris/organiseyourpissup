<script>
	import { page } from '$app/stores'

	const inviteUrl = $page.url.origin + '/' + $page.params.pissupId + '/invite'

	async function copy() {
		if (!navigator.clipboard) {
			alert('Copy this link: ' + inviteUrl)
			return;
		}
		await navigator.clipboard.writeText(inviteUrl)
		alert('Invite link copied to clipboard')
	}
</script>

<button on:click={copy}>THIS BUTTON</button>

<style>
	button {
		background-color: greenyellow;
	}
</style>