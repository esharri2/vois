<script>
  import Timer from "./Timer.svelte";
  import Loader from "./Loader.svelte";
  import Protected from "./Protected.svelte";
  import { user } from "./stores.js";
  import { onMount } from "svelte";
  import { getSequence } from "./utils/fetchers";

  let authCheckComplete = false;
  let sequenceId = undefined;
  let defaultActions = [
    { name: "My first action", duration: 5, id: 2342 },
    { name: "My second action", duration: 5, id: 245245 },
  ];
  let promise;

  $: if ($user || $user === false) {
    authCheckComplete = true;
  }

  $: if ($user && sequenceId) {
    promise = getSequence($user.uid, sequenceId)
  }
  
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
    <Loader />
  {:then data}
    <Timer actions={data.actions} title={data.title} {user} {sequenceId} />
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
