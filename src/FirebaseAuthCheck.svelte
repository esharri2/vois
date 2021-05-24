<script>
  import { user as userStore, settings as settingsStore } from "./stores.js";
  import firebase from "firebase/app";
  import { getSettings } from "./utils/fetchers";

  let isSignedIn;

  const initApp = function () {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          user.getIdToken().then(function (accessToken) {
            userStore.update(() => user);
          });
          getSettings(user.uid).then((settings) => {
            settingsStore.update(() => settings || {});
          });

          // TODO fetch settings and save that too
        } else {
          isSignedIn = false;
          userStore.update(() => false);
        }
      },
      function (error) {
        console.error(error);
      }
    );
  };

  window.addEventListener("load", function () {
    initApp();
  });
</script>

{#if isSignedIn === false}
  <div class="mt-6">
    <p
      class="text-center p-2 mb-3 z-10 fixed left-0 right-0 top-0 bg-accent text-light text-lg "
    >
      You are not signed in. <a class="block lg:inline underline" href="/"
        >Sign in now to save your sequences!</a
      >
    </p>
  </div>
{/if}
