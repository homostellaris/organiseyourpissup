<script context="module">
	import '../app.css';
	import Footer from '$lib/Footer.svelte'
	import { fly } from "svelte/transition"
</script>

<!-- <script>
	export let refresh = ""
</script>

{#key refresh}
<div
	in:fly={{ x: -5, duration: 500, delay: 500 }}
	out:fly={{ x: 5, duration: 500 }}
>
</div>
{/key} -->

<main>
	<slot />
</main>

<Footer/>

<style>
	main {
		height: 100%;
		align-items: center;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;
	}
</style>
