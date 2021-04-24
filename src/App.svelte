<script>
  import Timer from "./Timer.svelte";
  import Loader from "./Loader.svelte";
  import Protected from "./Protected.svelte";
  import { user } from "./stores.js";
  import { onMount } from "svelte";

  let authCheckComplete = false;
  let sequenceId = undefined;
  let defaultActions = [
    { name: "My first action", duration: 3, id: 2342 },
    { name: "My second action", duration: 4, id: 245245 },
  ];
  $: if (user || user === false) {
    authCheckComplete = true;
  }

  let promise;
  
  onMount(() => {
    sequenceId = new URLSearchParams(window.location.search).get("id") || false;
  });
</script>

{#if !authCheckComplete || sequenceId === undefined}
  <Loader />
{:else if authCheckComplete && sequenceId === false}
  <Timer actions={defaultActions} {user} {sequenceId} />
{:else}
  {#await promise}
    <p>...waiting</p>
  {:then data}
    <p>THEN!!!</p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
  <!-- // async -->
  <p>TODO: Load sequence from db</p>
{/if}
