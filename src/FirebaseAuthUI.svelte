<script>
  import { postUser } from "./utils/fetchers";
  import { user } from "./stores.js";

  import Loader from "./Loader.svelte";

  let isNew;
  let isComplete;

  $: if ($user === false) {
    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  $: if ($user) {
    window.location.replace(`${isNew ? '/timer' : '/sequences'}`);
  }

  let loading = true;
  // FirebaseUI config.
  const uiConfig = {
    signInFlow: "redirect",
    // signInSuccessUrl: "/sequences",
    // autoUpgradeAnonymousUsers: true,
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      window.firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      window.firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: "/terms",
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign("/privacy");
    },
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        var user = authResult.user;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        if (isNewUser) {
          isNew = true;
          postUser(user.uid, user.email).then((data) => {
            isComplete = true;
          });
        } else {
          isComplete = true;
          return true;
        }
      },
      uiShown: function () {
        loading = false;
      },
    },
  };
</script>

<div id="firebaseui-auth-container" />
{#if loading} <Loader />{/if}
