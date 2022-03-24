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
			if (error.name === 'AbortError') return // If we try to fallback to 'copy' after this it results in a NotAllowedErorr. I'm guesing this is because when the user aborts share it resets Safari's concept of if is a valid and safe clipboard operation triggered by a user interaction (see https://webkit.org/blog/10247/new-webkit-features-in-safari-13-1/).
			await copy()
		}
	}

	async function copy () {
		if (!navigator.clipboard) {
			displayInviteUrlDialog()
			return;
		}
		try {
			await navigator.clipboard.writeText(inviteUrl)
			alert('Invite link copied to clipboard') // TODO: Stop using this as its not supported in some mobile scenarios.
		} catch (error) {
			// One example of when this would happen is in some Android Webviews.
			displayInviteUrlDialog()
		}
	}

	function displayInviteUrlDialog () {
		console.warn('Unable to copy to clipboard', error)
		document.getElementById('invite-dialog').showModal()
		document.getElementById('invite-url').select()
	}
</script>

<button on:click={share}>SHARE INVITE LINK</button>
<dialog id="invite-dialog">
	<form method="dialog">
		<input id="invite-url" readonly type="url" value={inviteUrl}>
		<button value="default">Done</button>
	</form>
</dialog>

<style>
	button {
		background-color: greenyellow;
	}

	#invite-url {
		text-align: center;
		width: 45ch;
	}
</style>