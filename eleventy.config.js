// const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("dist");
  eleventyConfig.addFilter("split", function (str, delimiter) {
    return str.split(delimiter);
  });
  
  // Ensure directories exist before writing for permalink-based routes
  eleventyConfig.on("beforeBuild", () => {
    const dirs = ["_site/roof-installation", "_site/roof-repair"];
    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  });
  
  return {
    dir: {
      input: "src", // or your input dir
      output: "_site",
      includes: "_includes",
    },
  };
};
