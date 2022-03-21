<script context="module">
  import {dev} from '$app/env'
  import "../app.css"
  import Footer from "$lib/Footer.svelte"
//   import { fly } from "svelte/transition";
//   import { bubble } from "svelte/internal";
  import {onMount} from "svelte"
  import Plausible from 'plausible-tracker'
  import * as Sentry from "@sentry/browser";
  import { BrowserTracing } from "@sentry/tracing"

	export const prerender = true
</script>

<!-- Credit to Rob M Andrews for his work in this Codepen: https://codepen.io/rob-m-andrews/pen/pvVjNB -->
<script>
  const defaults = {
    MAX_BUBBLE_SIZE: 100,
    MAX_BLUR: 10,
    MAX_ANIMATION_DURATION: 8000,
  };

  let plausible

  onMount(() => {
    if (!dev) {
      // TODO: Raise a PR to define exports properly so this works with Vite.
      plausible = Plausible()
      plausible.enableAutoPageviews()
      plausible.enableAutoOutboundTracking()

      Sentry.init({
        dsn: "https://b4f94efd339c498cb013c30391666fb7@o1174206.ingest.sentry.io/6270021",
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
      })
    }

    function createBubbles(bubbleCount) {
      for (let i = 0; i <= bubbleCount; i++) {
        const xPos = Math.floor(Math.random() * 100 + 1);
        const yPos = Math.floor(Math.random() * 25 + 1);
        const bubbleSize = Math.floor(
          Math.random() * defaults.MAX_BUBBLE_SIZE + 1
        );
        const bubbleDelay = Math.floor(Math.random() * 100 * bubbleCount + 1);
        const bubbleScale = bubbleSize / defaults.MAX_BUBBLE_SIZE;
        const bubbleBlur = bubbleScale * defaults.MAX_BLUR;
        const bubbleSpeed =
          (1 - bubbleScale * bubbleScale) * defaults.MAX_ANIMATION_DURATION;
        const bubbleOpacity = 0.25 * (1 - bubbleScale);

        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        bubble.style = `
          width: ${bubbleSize}px;
          height: ${bubbleSize}px;
          left: ${xPos}%;
          top: ${yPos}%;
          -webkit-animation-delay: ${bubbleDelay}ms;
          -webkit-animation-duration: ${bubbleSpeed}ms;
          -webkit-filter: blur(${bubbleBlur}px);
          filter: blur(${bubbleBlur}px);
          opacity: ${bubbleOpacity};
			  `;

        document.getElementsByClassName("beer")[0].append(bubble);
      }
    }

    createBubbles(50);
  });
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

<div class="beer">
</div>
<div class="container">
  <main>
    <slot />
  </main>
  <Footer />
</div>

<style>
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

  :root {
    --beer: #e87c00;
    --white: #fff;
  }

  @keyframes bubbles {
    0% {
      visibility: visible;
      transform: scale(0);
      top: 100%;
    }
    15% {
      transform: scale(1);
      top: 100%;
    }
    100% {
      top: -100%;
      transform: translateY(-10%);
    }
  }

  .beer {
    position: absolute;
    overflow: hidden;
    background: linear-gradient(
      to right,
      rgba(192, 86, 0, 1) 0%,
      rgba(220, 112, 0, 1) 21%,
      rgba(232, 124, 0, 1) 51%,
      rgba(232, 124, 0, 1) 81%,
      rgba(220, 112, 0, 1) 100%
    );
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  :global(.bubble) {
    position: absolute;
    background-color: transparent;
    background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/173991/bubble.png);
    background-size: cover;
    background-position: center center;
    border-radius: 100%;
    opacity: 0.5;
    visibility: hidden;

    filter: blur(1px);

    animation: bubbles, 7s infinite;
	animation-iteration-count: infinite;
  }
</style>
