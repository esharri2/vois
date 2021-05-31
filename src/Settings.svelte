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
    { label: "System default", value: false },
    { label: "Mute", value: "0" },
    { label: "Low", value: "0.1" },
    { label: "Medium", value: ".5" },
    { label: "High", value: "1" },
  ];
  let rates = [
    { label: "System default", value: false },
    { label: "Slow", value: ".5" },
    { label: "Medium", value: "1" },
    { label: "Fast", value: "1.5" },
  ];

  let authCheckComplete = false;
  let saving = false;
  let pitch;
  let volume;
  let rate;

  $: if ($user || $user === false) {
    console.log($user)
    authCheckComplete = true;
  }

  $: if ($settings) {
    const { pitch: pitchSetting, rate: rateSetting, volume: volumeSetting } = $settings;
    pitch = pitchSetting ? pitchSetting : false;
    volume = volumeSetting ? volumeSetting : false;
    rate = rateSetting ? rateSetting : false;
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
      <fieldset class="mt-4">
        <legend>Voice volume</legend>
        {#each volumes as option}
          <label class="block">
            <input
              type="radio"
              on:change={onChange}
              bind:group={volume}
              value={option.value}
              disabled={saving}
              data-key="volume"
            />
            {option.label}
          </label>
        {/each}
      </fieldset>
      <button disabled={saving} class="btn px-4" on:click={test}>Test</button>
      <fieldset class="mt-4">
        <legend>Voice speed</legend>
        {#each rates as option}
          <label class="block">
            <input
              type="radio"
              on:change={onChange}
              bind:group={rate}
              value={option.value}
              disabled={saving}
              data-key="rate"
            />
            {option.label}
          </label>
        {/each}
      </fieldset>
      <button disabled={saving} class="btn px-4" on:click={test}>Test</button>
      <h1 class="pt-4">Account</h1>
      <p>You are logged in as {$user?.email || 'a guest' }.</p>
      <button class="btn px-4" on:click={handleLogout}>Logout</button>
    {/if}
  </div>
</Protected>
