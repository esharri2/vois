import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import dotenv from "dotenv";
dotenv.config();

import replace from "@rollup/plugin-replace";

const production = process.env.NODE_ENV === "production";

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: production ? "_site/main.js" : "_temp/main.js",
  },
  plugins: [
    postcss({
      extract: true,
      extract: "main.css",
    }),
    replace({
      // stringify the object
      __app: JSON.stringify({
        env: {
          ...process.env, // attached the .env config
        },
      }),
    }),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    // css({ output: "app.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
