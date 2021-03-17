// Importing main CSS so Rollup will watch and bundle with PostCSS!
import "../styles/main.css";
import App from "./App.svelte";

const app = new App({
  target: document.querySelector("[data-app]"),
  props: {
    name: "Svelte",
  },
});

export default app;
