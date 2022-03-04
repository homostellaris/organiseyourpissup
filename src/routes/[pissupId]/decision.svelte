<script context="module">
	import Retreat from "$lib/Retreat.svelte"
</script>

<script>
	export let pissup
	let decision
	$: decision = new Date(pissup.decision).toLocaleDateString(undefined, {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	})
</script>

<h1>You're getting pissed on <span id="decision">{decision} 🍻</span></h1>
<p>Please drink responsibly 💚</p>

<Retreat back="everyone"/>

<style>
	#decision {
		white-space: nowrap;
	}
</style>