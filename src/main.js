// Importing main CSS so Rollup will watch and bundle with PostCSS!
import "../styles/main.css";
import Firebase from "./Firebase.svelte";
import FirebaseAuthUi from "./FirebaseAuthUI.svelte";
import FirebaseAuthCheck from "./FirebaseAuthCheck.svelte";
import App from "./App.svelte";
import Sequences from "./Sequences.svelte";
import Settings from "./Settings.svelte";

// We are rendering top-level components if their target exists.
const rootComponents = [
  [document.querySelector("[data-firebase]"), Firebase],
  [document.querySelector("[data-firebase-auth-ui]"), FirebaseAuthUi],
  [document.querySelector("[data-firebase-auth-check]"), FirebaseAuthCheck],
  [document.querySelector("[data-timer]"), App],
  [document.querySelector("[data-sequences]"), Sequences],
  [document.querySelector("[data-settings]"), Settings],
];

rootComponents.forEach(([target, component]) => {
  if (target) {
    new component({
      target,
    });
  }
});
