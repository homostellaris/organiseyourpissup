<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>The painless way to agree a date with your mates</h1>
<p>Busy? Thirsty? Mates impossible to organise? Then <strong>Organise Your Pissup</strong> can help.</p>
<p>Trying to find a date when everyone is available for a few drinks is a painful process, especially over text. We save you time by collecting everyone's availability and presenting you with the best dates with a minimum of fuss.</p>

<a id="product-hunt-featured-count" href="https://www.producthunt.com/posts/organise-your-pissup?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-organise&#0045;your&#0045;pissup" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=337271&theme=light" alt="Organise&#0032;Your&#0032;Pissup - The&#0032;painless&#0032;way&#0032;to&#0032;agree&#0032;a&#0032;date&#0032;with&#0032;your&#0032;mates | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
<a href="https://www.producthunt.com/posts/organise-your-pissup?utm_source=badge-review&utm_medium=badge&utm_souce=badge-organise&#0045;your&#0045;pissup#discussion-body" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/review.svg?post_id=337271&theme=light" alt="Organise&#0032;Your&#0032;Pissup - The&#0032;painless&#0032;way&#0032;to&#0032;agree&#0032;a&#0032;date&#0032;with&#0032;your&#0032;mates | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
