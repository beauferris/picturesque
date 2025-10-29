// const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("dist");
  eleventyConfig.addFilter("split", function (str, delimiter) {
    return str.split(delimiter);
  });
  return {
    dir: {
      input: "src", // or your input dir
      output: "_site",
      includes: "_includes",
    },
  };
};
