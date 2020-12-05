const slugify = require("@sindresorhus/slugify");
const minify = require("html-minifier").minify;
const pluralize = require("pluralize");
const URL = require("url").URL;
const camelCase = require("camelize");

const YTRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
const VimeoRegex = /^.*(vimeo\.com)\/((channels\/\w+\/|groups\/[^\/]+\/|album\/\d+\/|showcase\/\d+\/)video(s)?\/)?(\d+)/;
const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const camelize = (value) => {
  return camelCase(value);
};

const deslugify = (value) => {
  return slugify(value, { separator: " ", customReplacements: [["-", " "],["-", " "]] });
};

const embedUrl = (value) => {
  let match;

  match = value.match(YTRegex);
  if (match && match[2].length === 11) {
    return `//www.youtube.com/embed/${match[2]}`;
  }

  match = value.match(VimeoRegex);
  if (match && match[5].length) {
    return `//player.vimeo.com/video/${match[5]}`;
  }

  return value;
};

const excerpt = (value) => {
  return value.split("<!-- more -->")[0] || value.split("<!--more-->")[0]|| value.split("<!--more -->")[0] || value.split("<!-- more-->")[0];
};

const isAlpha = (value) => {
  const re = /^[a-z]+/i;
  return re.test(value);
};

const isAlphanumeric = (value) => {
  const re = /^[a-z0-9]+/i;
  return re.test(value);
};

const isEmail = (value) => {
  return EmailRegex.test(value);
};

const isEmbeddable = (value) => {
  let match;
  match = value.match(YTRegex);
  if (match && match[2].length === 11) {
    return true;
  }

  match = value.match(VimeoRegex);
  if (match && match[5].length) {
    return true;
  }

  return false;
};

const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const isUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
};

const lcfirst = (value) => {
  return value.charAt(0).toLowerCase() + value.slice(1);
};

const readTime = ({ wpm = 60 } = {}) => (value) => {
  return Math.ceil(value.trim().split(" ").length / wpm);
};

const singular = (value) => {
  return pluralize.singular(value);
};


const plural = (value) => {
  return pluralize.plural(value);
};
const slugifyFilter = (value) => {
  return slugify(value);
};

const minifyFilter = (value) => {
  return minify(value, {
    collapseWhitespace:true,
    conservativeCollapse:true
  });
};

const swapCase = (value) => {
  return value
    .split("")
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join("");
};

const title = (value) => {
  return value
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

const ucfirst = (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const underscored = (value) => {
  return slugify(value, { separator: "_" });
};

const wordCount = (value) => {
  return value.split(" ").length;
};

const pluginStringFilters = (eleventyConfig, options = {}) => {
  eleventyConfig.addFilter("camelize", camelize);
  eleventyConfig.addFilter("deslugify", deslugify);
  eleventyConfig.addFilter("embedUrl", embedUrl);
  eleventyConfig.addFilter("excerpt", excerpt);
  eleventyConfig.addFilter("isAlpha", isAlpha);
  eleventyConfig.addFilter("isAlphanumeric", isAlphanumeric);
  eleventyConfig.addFilter("isEmail", isEmail);
  eleventyConfig.addFilter("isEmbeddable", isEmbeddable);
  eleventyConfig.addFilter("isNumeric", isNumeric);
  eleventyConfig.addFilter("isUrl", isUrl);
  eleventyConfig.addFilter("lcfirst", lcfirst);
  eleventyConfig.addFilter("singular", singular);
  eleventyConfig.addFilter("singular", singular);
  eleventyConfig.addFilter("plural", plural);
  eleventyConfig.addFilter("minify", minifyFilter);
  eleventyConfig.addFilter("readTime", readTime(options.readTime));
  eleventyConfig.addFilter("swapCase", swapCase);
  eleventyConfig.addFilter("title", title);
  eleventyConfig.addFilter("ucfirst", ucfirst);
  eleventyConfig.addFilter("underscored", underscored);
  eleventyConfig.addFilter("wordCount", wordCount);
};

pluginStringFilters.camelize = camelize;
pluginStringFilters.deslugify = deslugify;
pluginStringFilters.embedUrl = embedUrl;
pluginStringFilters.excerpt = excerpt;
pluginStringFilters.isAlpha = isAlpha;
pluginStringFilters.isAlphanumeric = isAlphanumeric;
pluginStringFilters.isEmail = isEmail;
pluginStringFilters.isEmbeddable = isEmbeddable;
pluginStringFilters.isNumeric = isNumeric;
pluginStringFilters.isUrl = isUrl;
pluginStringFilters.lcfirst = lcfirst;
pluginStringFilters.singular = singular;
pluginStringFilters.plural = plural;
pluginStringFilters.slugify = slugifyFilter;
pluginStringFilters.minify = minifyFilter;
pluginStringFilters.readTime = readTime();
pluginStringFilters.swapCase = swapCase;
pluginStringFilters.title = title;
pluginStringFilters.ucfirst = ucfirst;
pluginStringFilters.underscored = underscored;
pluginStringFilters.wordCount = wordCount;

module.exports = pluginStringFilters;
