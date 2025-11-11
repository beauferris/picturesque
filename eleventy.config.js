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

  const serviceOrder = [
    "Residential Standard and Standing Seam Metal Roof Replacements",
    "Residential Leak Repairs and Maintenance",
    "Flat Roofing Commercial and Residential Replacements",
    "Flat Roofing Leak Repairs and Maintenance",
    "Insulation Top Ups",
    "Special Projects",
  ];
  const serviceOrderMap = serviceOrder.reduce((map, title, index) => {
    map[title] = index;
    return map;
  }, {});

  eleventyConfig.addCollection("servicesOrdered", (collectionApi) => {
    return collectionApi
      .getFilteredByTag("posts")
      .sort((a, b) => {
        const aIndex =
          serviceOrderMap.hasOwnProperty(a.data.title)
            ? serviceOrderMap[a.data.title]
            : serviceOrder.length;
        const bIndex =
          serviceOrderMap.hasOwnProperty(b.data.title)
            ? serviceOrderMap[b.data.title]
            : serviceOrder.length;
        if (aIndex === bIndex) {
          return (a.data.title || "").localeCompare(b.data.title || "");
        }
        return aIndex - bIndex;
      });
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
