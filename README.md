# tailwind-animation-sequences

> A Tailwind plugin which generates utilities to create staggered animations on lists of content.

Install the plugin from npm:

```
$ npm install tailwind-animation-sequences
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    // Optional. Your plugin might not have any options at all.
    animationSequences: {
      // ...
      YOUR_PLUGIN_CUSTOM_OPTION: true,
      // ...
    },
  },
  variants: {
    // ...
    // Optional. Your plugin might not have any variants at all.
    animationSequences: ['responsive'],
    // ...
  },
  plugins: [
    // ...
    require('tailwind-animation-sequences'),
    // ...
  ],
};
```

This plugin will generate following CSS:

```css
/* ... */
.example-utility-class {
  display: block;
}

.custom-utility-class {
  background-color: red;
}
/* ... */
```

## License

tailwind-animation-sequences is licensed under the MIT License.

## Credits

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
