<script>
  import { user } from "./stores.js";
  import Loader from "./Loader.svelte";

  let authCheckComplete = false;
  $: if ($user?.uid || $user === false) {
    authCheckComplete = true;
  }
</script>

{#if authCheckComplete}
  {#if $user === false}
    <p class="pt-2">Sorry, you are not signed in. <a class="font-strong underline text-accent" href="/">Sign in now.</a></p>
  {:else}
    <slot />
  {/if}
{:else}
  <Loader />
{/if}
