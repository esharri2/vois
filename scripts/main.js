
// Importing main CSS so Rollup will watch and bundle with PostCSS!
import "../styles/main.css";

import backToTop from "./backToTop.js";
import colorSwitch from "./colorSwitch.js";
import ClickToCopy from "./clickToCopy.js";
import Nav from "./nav.js";
import Flyout from "./flyout.js";

backToTop();
colorSwitch();
new Nav();
document
  .querySelectorAll("[data-flyout]")
  .forEach((component) => new Flyout(component));
document
  .querySelectorAll("[data-click-to-copy]")
  .forEach((component) => new ClickToCopy(component));
