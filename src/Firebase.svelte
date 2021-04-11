<script>
  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";
  import "firebase/database";
  import * as firebaseui from "firebaseui";
  import "firebaseui/dist/firebaseui.css";
  var config = {
    apiKey: "AIzaSyDClk8PLXUm8MsNjTSjaezm5QrRBBU5qBc",
    authDomain: "vois-80945.firebaseapp.com",
    databaseURL: "https://vois-80945-default-rtdb.firebaseio.com",
    projectId: "vois-80945",
    storageBucket: "vois-80945.appspot.com",
    messagingSenderId: "836014344943",
    appId: "1:836014344943:web:93a9f9a03e18882649e91a",
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  window.firebase = firebase;
  window.db = firebase.database();
</script>
