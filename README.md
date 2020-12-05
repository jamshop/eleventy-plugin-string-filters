# Eleventy Plugin - String filters

A bunch of useful string filters for 11ty.

Install:

```
npm install @jamshop/eleventy-plugin-string-filters
```

## Usage

In your main config `.eleventy.js`: 

```js
const pluginStringFilters = require("@jamshop/eleventy-plugin-string-filters");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginStringFilters);
  // and the rest of your config
};
```

Or import an individual filter:

```js
const { plural } = require("@jamshop/eleventy-plugin-string-filters");

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter("plural", unique);
  // and the rest of your config
};
```

Filters include:

 - `camelize`
 - `deslugify`
 - `embedUrl`
 - `excerpt`
 - `isAlpha`
 - `isAlphanumeric`
 - `isEmail`
 - `isEmbeddable`
 - `isNumeric`
 - `isUrl`
 - `lcfirst`
 - `singular`
 - `singular`
 - `plural`
 - `minify`
 - `readTime`
 - `swapCase`
 - `title`
 - `ucfirst`
 - `underscored`
 - `wordCount`

