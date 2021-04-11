<script>
  import Loader from "./Loader.svelte";
  import Protected from "./Protected.svelte";
  import Delete from "./icons/Delete.svelte";
  import { user } from "./stores.js";
  import { deleteSequence, getSequences } from "./utils/fetchers";

  let promise;
  $: if ($user?.uid) {
    promise = getSequences($user?.uid);
  }

  const handleDelete = (id) => {
    deleteSequence($user.uid, id)
      .then(() => {
        promise = getSequences($user.uid);
      })
      .catch((error) => {
        alert("Sorry, there has been an error.");
      });
  };
</script>

<Protected>
  <h1 class="mt-4">Your sequences</h1>
  {#await promise}
    <Loader />
  {:then sequences}
    {#if sequences.length > 0}
      <ul class="stack pt-4 text-x lg:text-2xl">
        {#each sequences as sequence}
          <li class="flex justify-between items-center">
            <a class="hover:text-accent" href="/timer?id={sequence.id}"
              >{sequence.title || "Untitled"}
              <span aria-hidden="true" class="px-1 lg:px-2">|</span>
              {sequence.duration}</a
            ><button
              class="btn px-1 lg:px-5"
              on:click={() => handleDelete(sequence.id)}
              aria-label="Delete sequence {sequence.title}"><Delete /></button
            >
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-xl pt-4">
        You have not saved any sequences yet! <a class="underline text-accent" href="/timer">Create one now</a
        >.
      </p>
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</Protected>
