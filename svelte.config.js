import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		prerender: {
			enabled: true,
			entries: [ // TODO: Find out why this is necessary
				'*',
				'/privacy',
				'/[pissupId]/invite'
			]
		}
	}
};

export default config;
