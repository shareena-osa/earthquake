// postcss.config.js
const path = require("path");

module.exports = (ctx) => {
  const isNodeModule =
    ctx &&
    ctx.file &&
    ctx.file.dirname &&
    ctx.file.dirname.includes("node_modules");

  return {
    plugins: [
      // ✅ Run Tailwind only for your app's CSS
      !isNodeModule && require("@tailwindcss/postcss"),
      // ✅ Autoprefixer is optional but recommended
      require("autoprefixer"),
    ].filter(Boolean),
  };
};
