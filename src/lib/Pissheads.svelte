<script context="module">
	import addAvatars from '$lib/addAvatars'
</script>

<script>
	export let pissheads
	export let selected

	let pissheadArray
	$: {
		addAvatars(pissheads)
		pissheadArray = Object.entries(pissheads)
	}
</script>

<div class="pissheads">
	{#each pissheadArray as [pissheadId, pisshead], i}
		<span class="pisshead"
			on:mouseenter={() => {
				selected = pissheadId
			}}
			on:mouseleave={() => {
				selected = null
			}}
		>
			<div class="name">{pisshead.name}</div>
			<div class="avatar">{pisshead.avatar}</div>
		</span>
	{/each}
</div>

<style>
	.pissheads {
		text-align: center;
	}

	.pisshead {
		display: inline-block;
		margin: 1rem;
		text-align: center;
		width: 3rem;
	}

	.avatar {
		text-align: center;
	}
</style>