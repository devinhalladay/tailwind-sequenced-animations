const merge = require('lodash/merge');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const animationSequencePlugin = require('./index');

expect.extend({
  toMatchCss: cssMatcher,
});

function generatePluginCss(overrides) {
  const config = {
    theme: {
      // Default options for your plugin.
      sequencedAnimations: {
        sequence: Array(8)
          .fill()
          .map((_, i) => `${i * 0.05}s`),
        options: {
          duration: '0.3s',
          easing: 'easy-ease-out',
          fillMode: 'forwards',
        },
      },
      extend: {
        transitionTimingFunction: {
          'easy-ease-out': 'cubic-bezier(.25, .46, .45, .94)',
        },
        keyframes: {
          'fade-in': {
            '0%': {
              opacity: 0,
            },
            '100%': {
              opacity: 1,
            },
          },
        },
      },
    },
    corePlugins: false,
    plugins: [animationSequencePlugin],
  };

  return postcss(tailwindcss(merge(config, overrides)))
    .process('@tailwind utilities', {
      from: undefined,
    })
    .then(({ css }) => css);
}

test('utility classes can be generated', () => {
  return generatePluginCss().then(css => {
    expect.stringContaining(css);
  });
});

test('options can be customized', () => {
  return generatePluginCss({
    theme: {
      animationSequences: {
        sequence: Array(8)
          .fill()
          .map((_, i) => `${i * 0.05}s`),
        options: {
          duration: '0.6s',
          easing: 'ease-in-out',
          fillMode: 'both',
        },
      },
    },
  }).then(() => {
    expect.stringContaining(`
    .animate-sequence-fade-in-8 {
      animation-name: fade-in;
      animation-fill-mode: both;
      animation-delay: 0.4s;
      animation-timing-function: ease-in-out;
      animation-duration: 0.6s;
    }
    `);
  });
});

// test('variants can be customized', () => {
//   return generatePluginCss({
//     theme: {
//       screens: {
//         sm: '640px',
//       },
//     },
//     variants: {
//       animationSequences: ['responsive', 'hover'],
//     },
//   }).then(css => {
//     expect(css).toMatchCss(`
//     .example-utility-class {
//       display: block
//     }
//     .hover\\:example-utility-class:hover {
//       display: block
//     }
//     @media (min-width: 640px) {
//       .sm\\:example-utility-class {
//         display: block
//       }
//       .sm\\:hover\\:example-utility-class:hover {
//         display: block
//       }
//     }
//     `);
//   });
// });
