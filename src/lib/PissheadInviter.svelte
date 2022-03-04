<script>
	import { page } from '$app/stores'

	const inviteUrl = $page.url.origin + '/' + $page.params.pissupId + '/invite'

	async function share () {
		try {
			await navigator.share({
				title: "Organise Your Pissup",
				text: "You've been invited to a pissup!",
				url: inviteUrl,
			})
		} catch (error) {
			console.warn('Unable to use native sharing', error)
			copy()
		}
	}

	async function copy () {
		if (!navigator.clipboard) {
			alert('Copy this link: ' + inviteUrl)
			return;
		}
		await navigator.clipboard.writeText(inviteUrl)
		alert('Invite link copied to clipboard')
	}
</script>

<button on:click={share}>COPY INVITE LINK</button>

<style>
	button {
		background-color: greenyellow;
	}
</style>