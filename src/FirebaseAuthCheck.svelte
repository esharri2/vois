<script>
	import { user as userStore } from './stores.js';
  import firebase from "firebase/app";

  const initApp = function () {
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          user.getIdToken().then(function (accessToken) {
            userStore.update(()=>user);
          });
        } else {
           userStore.update(()=>false);
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

<!-- <h1>Welcome to My Awesome App</h1>
<div id="sign-in-status" />
<div id="sign-in" />
<pre id="account-details" /> -->
