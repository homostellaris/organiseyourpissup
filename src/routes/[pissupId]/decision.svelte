<script>
	export let pissup
	let decision
	$: decision = new Date(pissup.decision).toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	})
</script>

<h1>You're getting pissed on {decision} 🍻</h1>
<p>Remember alcohol is a privilege not a right, please drink responsibly 💚</p>
