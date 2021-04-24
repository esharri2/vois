<script>
  import { user } from "./stores.js";
  import Loader from "./Loader.svelte";

  let authCheckComplete = false;
  $: if ($user?.uid || $user === false) {
    console.log($user)
    authCheckComplete = true;
  }
</script>

{#if authCheckComplete}
  {#if $user === false}
    Sorry, you are not signed in. <a href="/">Sign in now.</a>
  {:else}
    <slot />
  {/if}
{:else}
  <Loader />
{/if}
