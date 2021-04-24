<script>
  import Loader from "./Loader.svelte";
  import Protected from "./Protected.svelte";
  import Delete from "./icons/Delete.svelte";
  import Plus from "./icons/Plus.svelte";
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

<div class="stack lg:flex justify-between pb-5">
  <h1>Your sequences</h1>
  <a class="flex btn max-w-sm flex-grow lg:m-0" href="/timer"
    ><Plus /> <span>Create a new sequence</span>
  </a>
</div>
<Protected>
  {#await promise}
    <Loader />
  {:then sequences}
    {#if sequences.length > 0}
      <ul class="stack text-x lg:text-2xl">
        {#each sequences as sequence}
          <li class="flex justify-between items-center">
            <a
              class="hover:text-accent flex-grow hover:bg-lightMedium transition-colors rounded py-1 mr-1"
              href="/timer?id={sequence.id}"
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
      <p class="text-xl">
        You have not saved any sequences yet! <a
          class="underline text-accent"
          href="/timer">Create one now</a
        >.
      </p>
    {/if}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</Protected>
