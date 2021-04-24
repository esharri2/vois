<script>
  import { user } from "./stores.js";
  import Loader from "./Loader.svelte";

  let authCheckComplete = false;
  $: if (user || user === false) {
    authCheckComplete = true;
  }

  const handleLogout = () => {
    window.firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Signed Out");
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

<div class="stack mt-4">
  {#if !authCheckComplete}
    <Loader />
  {:else}
    <button class="btn" on:click={handleLogout}>logout</button>
  {/if}
</div>
