<script>
	import { page } from '$app/stores'

	const inviteUrl = $page.url.origin + '/' + $page.params.pissupId + '/invite'

	function copy () {
		document.getElementById('invite-url').select()
		document.execCommand('copy')
	}
</script>

<div class="pisshead-inviter">
	<input id="invite-url" type="text" value={inviteUrl}/><button on:click={copy}>copy link</button>
</div>

<style>
	.pisshead-inviter {
		margin: 1rem;
	}

	.pisshead-inviter input {
		width: 20rem;
	}
</style>