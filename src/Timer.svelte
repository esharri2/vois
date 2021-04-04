<script>
  import { flip } from "svelte/animate";
  import { fade, fly } from "svelte/transition";
  import { userId } from "./stores.js";
  import { postSequence } from "./utils/fetchers";
  import Pause from "./icons/Pause.svelte";
  import Play from "./icons/Play.svelte";
  import Save from "./icons/Save.svelte";
  import Stop from "./icons/Stop.svelte";
  import Up from "./icons/Up.svelte";
  import Down from "./icons/Down.svelte";
  import Delete from "./icons/Delete.svelte";

  let title = "";
  let actions = [
    { name: "My first action", duration: 30, id: 2342 },
    { name: "My second action", duration: 60, id: 245245 },
  ];
  let hasChanged = false;
  $: if (actions[actions.length - 1].duration !== 0) {
    actions.push({ name: "none", duration: 0, id: new Date().getTime() });
  }

  let isPlaying = false;
  let isPaused = false;
  let secondsElapsedInAction = 0;
  let currentPlayIndex = 0;

  const handleSave = (event) => {
    event.preventDefault();
    const body = { title };
    postSequence($userId, body);
  };

  const handlePlayClick = (event) => {
    if (isPlaying) {
      isPlaying = false;
      isPaused = true;
    } else {
      isPlaying = true;
      isPaused = false;
    }
  };

  const handleStopClick = (event) => {
    isPlaying = false;
    // TODO maybe otehr stuff?
  };

  const handleAddAnAction = () => {
    actions = [...actions, { name: "new name", duration: 0 }];
  };

  const addPlaceholderAction = () => {
    // if last action has a time of zero, update using handleAddAnAction
  };

  const handleChange = () => {
    hasChanged = true;
  };

  const handleDelete = (index) => {
    const actionsCopy = [...actions];
    actionsCopy.splice(index, 1);
    actions = [...actionsCopy];
  };

  const moveAction = (index, offset) => {
    const actionsCopy = [...actions];
    const action = actionsCopy.splice(index, 1)[0];
    actionsCopy.splice(index + offset, 0, action);
    return actionsCopy;
  };

  const handleMoveUp = (index) => {
    const newActions = moveAction(index, -1);
    actions = [...newActions];
  };

  const handleMoveDown = (index) => {
    const newActions = moveAction(index, 1);
    actions = [...newActions];
  };
</script>

<form
  class="stack lg:mt-5 text-lg lg:text-xl"
  on:submit={handleSave}
  on:input={handleChange}
>
  <div class="control-bar flex justify-between">
    <button class="btn" type="button" on:click={handlePlayClick}>
      {#if isPlaying}
        <Pause />
      {:else}
        <Play />
      {/if}
    </button>
    <!-- TODO disable if not playing -->
    <button
      class="btn"
      type="button"
      on:click={handleStopClick}
      disabled={!isPlaying && !isPaused}
    >
      <Stop />
    </button>
    <!-- TODO only show if logged in, disable if no change-->
    <button class="btn" type="submit" disabled={!hasChanged}>
      <Save />
    </button>
  </div>
  <label class="sr-only" for="title">Title:</label>
  <!-- TODO only show this if logged in -->
  <input class="input" id="title" disabled={isPlaying} bind:value={title} />
  {#each actions as action, index (action.id)}
    <fieldset
      class="stack py-1"
      animate:flip={{ duration: 300 }}
      transition:fly={{ y: 50, duration: 300 }}
    >
      <div class="grid grid-cols-custom-4 gap-x-1">
        <span class="font-display text-accent flex items-center"
          >{index + 1}</span
        >
        <label class="sr-only" for="name_{index}">Name:</label>
        <input
          disabled={isPlaying}
          type="text"
          id="name_{index}"
          name="name_{index}"
          class="input"
          bind:value={action.name}
        />
        <label class="sr-only" for="duration_{index}"
          >Duration in seconds:</label
        >
        <input
          type="number"
          id="duration_{index}"
          name="duration_{index}"
          min="0"
          disabled={isPlaying}
          class="input"
          bind:value={action.duration}
        />
      </div>
      {#if !isPlaying}
        <div
          class="grid grid-cols-3 gap-x-1"
          transition:fly={{ y: 50, duration: 300 }}
        >
          <button
            type="button"
            on:click={() => handleDelete(index)}
            class="btn btn--secondary"><Delete /></button
          >
          <button
            type="button"
            on:click={() => handleMoveUp(index)}
            class="btn"
            disabled={index === 0 ? true : false}><Up /></button
          >
          <button
            on:click={() => handleMoveDown(index)}
            class="btn"
            disabled={index === actions.length - 1 ? true : false}
            ><Down /></button
          >
        </div>
      {/if}
    </fieldset>
  {/each}
</form>
