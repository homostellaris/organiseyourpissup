import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
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
