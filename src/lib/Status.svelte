<script>
	import {page} from '$app/stores'

	export let pissup
	const inviteUrl = `${$page.url.origin}/${$page.params.pissupId}/invite?from=Dan`
</script>

<header>
	<p>We're waiting for {pissup.pissheads.length} people to get their arse in gear.</p>
	<p>Share this link with your mates <span>{inviteUrl}</span><button>Copy link</button></p>
</header>

<style>
	header {
		border: 2px dashed #444;
		border-radius: 1rem;
		max-width: 900px;
		width: 61%;
		position: absolute;
		text-align: center;
		top: 1rem;
	}
</style>