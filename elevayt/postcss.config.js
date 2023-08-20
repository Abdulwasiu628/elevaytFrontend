export const plugins = [
  // Autoprefixer: Adds vendor prefixes to CSS rules
  require("autoprefixer"),

  // CSSnano: Minifies and optimizes CSS
  require("cssnano")({
    preset: "default", // or other preset options
  }),

  // Other PostCSS plugins you might want to add
  // ...
  // PostCSS Nested: Enables nesting of rules, similar to Sass
  require("postcss-nested"),

  // PostCSS Import: Allows you to use @import to include CSS from other files
  require("postcss-import"),

  // PostCSS Custom Properties: Enables the use of CSS custom properties (variables)
  require("postcss-custom-properties"),

  // PostCSS Flexbugs Fixes: Implements some fixes for flexbox-related issues
  require("postcss-flexbugs-fixes"),
];
