<script>
  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";
  import "firebase/database";
  import * as firebaseui from "firebaseui";
  import "firebaseui/dist/firebaseui.css";

  var config = {
    apiKey: __app.env.API_KEY,
    authDomain: __app.env.AUTH_DOMAIN,
    databaseURL: __app.env.DATABASE_URL,
    projectId: __app.env.PROJECT_ID,
    storageBucket: __app.env.STORAGE_BUCKET,
    messagingSenderId: __app.env.MESSAGING_SENDER_ID,
    appId: __app.env.APP_ID,
  };

  // Initialize Firebase
  firebase.initializeApp(config);
  window.firebase = firebase;
  window.db = firebase.database();
</script>
