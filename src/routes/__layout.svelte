<script>
	import { page } from '$app/stores';
	import '../app.css';
</script>

<main>
	<slot />
</main>

<footer>
	<p class:active={$page.path === '/about'}><a sveltekit:prefetch href="/about">About</a></p>
	<p class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Organise another pissup</a></p>
</footer>

<style>
	main {
		height: 100%;
		align-items: center;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
