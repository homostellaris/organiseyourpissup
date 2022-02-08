<script>
	export let position
</script>

{#if position === 'center'}
	<div>
		<button class="onwards" type="submit">ONWARDS</button>
	</div>
{:else}
	<button class="onwards" type="submit">ONWARDS</button>
{/if}

<style>
	button {
		background-color: greenyellow;
	}

	div {
		text-align: center;
	}
</style>
