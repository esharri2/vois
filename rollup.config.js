import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

const dev = process.env.NODE_ENV !== "production";

export default {
  input: "scripts/main.js",
  output: {
    file: !dev ? "_site/main.js" : "_temp/main.js",
    format: "es",
  },
  plugins: [
    postcss({
      extract: true,
      extract: "main.css",
    }),
    !dev && terser(),
  ],
};
