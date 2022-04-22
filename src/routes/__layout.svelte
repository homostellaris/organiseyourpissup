<script context="module">
  import {dev} from '$app/env'
  import '../app.css'
  import Footer from '$lib/Footer.svelte'
  import {onMount, setContext} from 'svelte'
  import Plausible from 'plausible-tracker'
  import * as Sentry from '@sentry/browser'
  import {BrowserTracing} from '@sentry/tracing'
  import Bubbles from '$lib/Bubbles/index.svelte'

	export const prerender = true
</script>

<script>
  let plausible
  setContext('analytics', {
    getAnalytics: () => plausible
  })

  onMount(() => {
    Sentry.init({
      dsn: "https://b4f94efd339c498cb013c30391666fb7@o1174206.ingest.sentry.io/6270021",
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0,
      enabled: !dev,
    })

    // TODO: Raise a PR to define exports properly so this works with Vite.
    plausible = Plausible()
    plausible.enableAutoPageviews()
    plausible.enableAutoOutboundTracking()
  });
</script>

<Bubbles/>
<div class="container">
  <main>
    <slot />
  </main>
  <Footer />
</div>

<style>
  :root {
    --beer: #e87c00;
    --white: #fff;
  }

  :global(body) {
    position: relative;
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 1rem;
  }

  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    margin: auto;
    max-width: 900px;
  }
</style>
