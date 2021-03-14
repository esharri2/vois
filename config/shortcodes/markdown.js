const markdownIt = require("markdown-it");

const markdown = (eleventyConfig) => {
  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return `<div class="md">${md.render(content)} </div>`;
  });
};

module.exports = markdown;
