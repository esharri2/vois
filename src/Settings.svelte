<script>
  import { user, settings } from "./stores.js";
  import Loader from "./Loader.svelte";
  import Protected from "./Protected.svelte";
  import { postSetting } from "./utils/fetchers";
  import { speak } from "./utils/sounds";

  const test = () => {
    speak("Testing, 1, 2, 3", $settings);
  };

  let pitches = [
    { label: "System default", value: false },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];
  let volumes = [
    { label: "Low", value: 0.75 },
    { label: "Medium", value: 1 },
    { label: "High", value: 1.5 },
  ];
  let authCheckComplete = false;
  let saving = false;
  let pitch;
  let volume;

  console.log(pitch)

  $: if ($user || $user === false) {
    authCheckComplete = true;
  }

  $: if ($settings) {
    const { pitch: pitchSetting, volume: volumeSetting } = $settings;
    pitch = pitchSetting ? pitchSetting : false;
    volume = volumeSetting;
  }

  const onChange = async (event) => {
    saving = true;
    const key = event.target.getAttribute("data-key");
    try {
      const newSettings = await postSetting($user.uid, key, event.target.value);
      settings.update(() => newSettings);
      saving = false;
    } catch (error) {
      alert("Sorry, there is a problem saving your settings.");
    }
  };

  const handleLogout = () => {
    window.firebase
      .auth()
      .signOut()
      .then(
        () => {
          window.location.replace("/");
        },
        (error) => {
          throw error;
        }
      )
      .catch(() => {
        alert("Sorry, we had trouble signing you out.");
      });
  };
</script>

<Protected>
  <div class="stack">
    {#if !authCheckComplete}
      <Loader />
    {:else}
      <fieldset>
        <legend>Voice pitch</legend>
        {#each pitches as option}
          <label class="block">
            <input
              type="radio"
              on:change={onChange}
              bind:group={pitch}
              value={option.value}
              disabled={saving}
              data-key="pitch"
            />
            {option.label}
          </label>
        {/each}
      </fieldset>
      <button disabled={saving} class="btn px-4" on:click={test}>Test</button>
      <!-- <fieldset>
        <legend>Voice volume</legend>
        {#each volumes as option}
          <label class="block">
            <input
              type="radio"
              on:change={onChange}
              bind:group={volume}
              value={option.value}
              disabled={saving}
              checked={$settings.volume === option.value}
              data-key="volume"
            />
            {option.label}
          </label>
        {/each}
      </fieldset>
      <button disabled={saving} class="btn px-4" on:click={test}>Test</button> -->
      <h1>Account</h1>
      <button class="btn px-4" on:click={handleLogout}>Logout</button>
    {/if}
  </div>
</Protected>
