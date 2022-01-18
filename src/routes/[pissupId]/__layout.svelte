<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({fetch, params}) {
		const response = await fetch(
			`/${params.pissupId}.json`,
			{method: 'GET'},
		)
		const pissup = await response.json()

		return {
			status: 200,
			props: {
				pissup,
			},
			stuff: {
				pissup,
			}
		};
	}
</script>

<slot/>
