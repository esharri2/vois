<script>
  import { user } from "./stores.js";
  import Loader from "./Loader.svelte";
  import Protected from "./Protected.svelte";

  let authCheckComplete = false;
  $: if ($user || $user === false) {
    authCheckComplete = true;
  }

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
<div class="stack mt-4">
  {#if !authCheckComplete}
    <Loader />
  {:else}
    <button class="btn px-4" on:click={handleLogout}>Logout</button>
  {/if}
</div>
</Protected>
