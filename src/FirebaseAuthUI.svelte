<script>
  import { postUser } from "./utils/fetchers";
  // FirebaseUI config.
  var uiConfig = {
    signInFlow: "redirect",
    signInSuccessUrl: "/sequences",

    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      window.firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
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
          postUser(user.uid, user.email).then(() => {
            window.location.href = "/timer";
          });
        } else {
          return true;
        }
      },
    },
  };

  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start("#firebaseui-auth-container", uiConfig);
</script>

<div id="firebaseui-auth-container" />
