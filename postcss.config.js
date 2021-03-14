module.exports = (ctx) => ({
  map: ctx.options.map,
  plugins: {
    "postcss-import": {},
    tailwindcss: { config: "./styles/tailwind.config.js" },
    autoprefixer: {},
    cssnano: ctx.env === "production" ? {} : false,
  },
});
