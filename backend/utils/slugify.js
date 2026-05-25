// backend/utils/slugify.js
// Simple slug generator – converts a string to URL‑friendly kebab‑case
// Usage: const slug = slugify('Goa Beach Escape'); // => 'goa-beach-escape'
module.exports = function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^a-z0-9\-]+/g, '') // Remove all non‑alphanumeric chars except -
    .replace(/\-\-+/g, '-') // Collapse multiple -
    .replace(/^\-+/, '') // Trim - from start of text
    .replace(/\-+$/,''); // Trim - from end of text
};
