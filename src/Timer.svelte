<script>
  import { flip } from "svelte/animate";
  import { fade, fly } from "svelte/transition";
  import { postSequence } from "./utils/fetchers";
  import { speak } from "./utils/sounds"
  import { settings } from "./stores"
  import NoSleep from "nosleep.js";

  export let actions;
  export let user;
  export let sequenceId;
  export let title;

  import Pause from "./icons/Pause.svelte";
  import Play from "./icons/Play.svelte";
  import Save from "./icons/Save.svelte";
  import Stop from "./icons/Stop.svelte";
  import Up from "./icons/Up.svelte";
  import Down from "./icons/Down.svelte";
  import Delete from "./icons/Delete.svelte";

  let hasChanged = false;
  let isPlaying = false;
  let isPaused = false;
  let secondsElapsedInAction = 0;
  let actionIndex = -1;
  let timerId;
  let refs = [];
  let showBackToTop = false;
  let wakeLock = null;
  const hasNativeWakeLock = ("wakeLock" in navigator)
  const noSleep = !hasNativeWakeLock && new NoSleep();

  $: showBackToTop =
    refs.length > 0 && document.body.scrollHeight > (window.innerHeight + 300);

  // Add a placeholder action when the last action in the sequence has a duration entered
  $: if (actions[actions.length - 1].duration) {
    actions.push({ name: "", duration: "", id: new Date().getTime() });
  }

  // Progress to next action when elapsed time is equal to current action duration
  $: if (
    isPlaying &&
    secondsElapsedInAction === actions[actionIndex].duration
  ) {
    startAction();
  }

  const handleSave = async (event) => {
    event.preventDefault();
    const newSequenceId = await postSequence($user?.uid, { title: title || "", actions }, sequenceId);
    if (newSequenceId) {
      sequenceId = newSequenceId;
      window.history.replaceState(null, null, `?id=${newSequenceId}`);
    }
    hasChanged = false;
  };

  const handlePlayClick = async () => {
    if (isPlaying) {
      isPlaying = false;
      isPaused = true;
    } else {
      if (secondsElapsedInAction === 0 && actionIndex < 1) {
        speak("start...", $settings);
      }
      await lock();
      isPlaying = true;
      isPaused = false;
      startAction();
    }
  };

  const startAction = () => {
    if (timerId) {
      clearInterval(timerId);
    }
    secondsElapsedInAction = 0;
    actionIndex = actionIndex + 1;

    if (actionIndex === actions.length) {
      handleStop();
      // TODO scroll to top
      speak("Your sequence is over!", $settings);
      window.scrollTo(0, 0);
    } else if (!actions[actionIndex].duration) {
      // Skip zero duration actions (e.g. last placeholder one)
      startAction();
    } else {
      refs[actionIndex].scrollIntoView({ behavior: "smooth", block: "center" });
      speak(actions[actionIndex].name, $settings);
      timerId = setInterval(() => {
        secondsElapsedInAction = secondsElapsedInAction + 1;
      }, 1000);
    }
  };

  const lock = async () => {
    if (hasNativeWakeLock) {
      wakeLock = await navigator.wakeLock.request("screen");
    } else {
      noSleep.enable();
    }
  };

  const unlock = () => {
    if (hasNativeWakeLock) {
      wakeLock.release().then(() => {
        wakeLock = null;
      });
    } else {
      noSleep.disable();
    }
  };

  const handleStop = () => {
    unlock();
    clearInterval(timerId);
    actionIndex = -1;
    isPlaying = false;
  };

  const handleChange = () => {
    hasChanged = true;
  };

  const handleDelete = (index) => {
    const actionsCopy = [...actions];
    actionsCopy.splice(index, 1);
    refs.splice(index, 1);
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

<form class="stack lg:mt-5" on:submit={handleSave} on:input={handleChange}>
  <div class="control-bar flex justify-between pb-2">
    <button class="btn" type="button" on:click={handlePlayClick}>
      {#if isPlaying}
        <Pause />
      {:else}
        <Play />
      {/if}
    </button>
    <button
      class="btn"
      type="button"
      on:click={handleStop}
      disabled={!isPlaying && !isPaused}
    >
      <Stop />
    </button>
    <button class="btn" type="submit" disabled={!hasChanged || !$user}>
      <Save />
    </button>
  </div>
  {#if user}
    <div>
      <label class="uppercase text-m font-strong" for="title">Title</label>
      <input
        class="input text-lg lg:text-xl"
        id="title"
        placeholder="Sequence title"
        disabled={isPlaying}
        bind:value={title}
      />
    </div>
  {/if}
  {#each actions as action, index (action.id)}
    <fieldset
      bind:this={refs[index]}
      class="stack text-lg lg:text-xl py-1 transition-all duration-500 {isPlaying &&
        index + 1 >= actions.length &&
        `hidden`} {actionIndex === index &&
        isPlaying &&
        'text-accent font-display text-3xl'}"
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
          placeholder="Action"
          id="name_{index}"
          name="name_{index}"
          class="input"
          bind:value={action.name}
        />
        <label class="sr-only" for="duration_{index}"
          >Duration in seconds:</label
        >
        {#if actionIndex === index && isPlaying}
          <span class="input">{action.duration - secondsElapsedInAction}</span>
        {:else}
          <input
            type="number"
            placeholder="sec"
            id="duration_{index}"
            name="duration_{index}"
            min="0"
            disabled={isPlaying}
            class="input"
            bind:value={action.duration}
          />
        {/if}
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
{#if showBackToTop}
  <a class="btn mt-6" href="#header"
    ><Up /><span class="px-2">Back to Top</span><Up /></a
  >
{/if}
