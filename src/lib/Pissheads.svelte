<script context="module">
	export const avatars = [
		'🤴',
		'🤡',
		'💩',
		'👽',
		'🤖',
		'👹',
		'🥸',
		'🤮',
		'🧙‍♂️',
	]
</script>

<script>
	export let pissheads
</script>

<div class="pissheads">
	{#each pissheads as pisshead, i}
		<span class="pisshead">
			<div class="name">{pisshead.name}</div>
			<div class="avatar">{avatars[i]}</div>
		</span>
	{/each}
</div>

<style>
	.pisshead {
		display: inline-block;
		font-size: x-large;
		margin: 1rem;
		text-align: center;
		width: 5rem;
	}

	.avatar {
		text-align: center;
	}
</style>