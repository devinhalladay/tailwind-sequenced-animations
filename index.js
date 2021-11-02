const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addUtilities, theme, variants }) {
    // Retrieve some values from user's Tailwind config.
    const options = theme('sequencedAnimations.options', {});
    const sequence = theme('sequencedAnimations.sequence', []);
    const keyframes = theme('keyframes', {});

    // Generate our utilities by iterating over our theme's keyframes,
    // then again over our sequence length.
    const utilities = Object.keys(keyframes).reduce(
      (allUtilities, currentValue) => {
        const classes = sequence.reduce((allClasses, delay, index) => {
          return {
            ...allClasses,
            [`.animate-sequence-${currentValue}-${index + 1}`]: {
              'animation-name': currentValue,
              'animation-fill-mode': options.fillMode || '',
              'animation-delay': delay,
              'animation-timing-function': options.easing,
              'animation-duration': options.duration || '',
            },
          };
        }, {});

        return {
          ...allUtilities,
          ...classes,
        };
      },
      {}
    );

    // Register the utilities with Tailwind.
    addUtilities(utilities, {
      variants: variants('sequencedAnimations'),
    });
  },
  {
    theme: {
      sequencedAnimations: {
        /**
         * @returns [0s, 0.05s, 0.1s, 0.15s, 0.2s, 0.25s, ...]
         * An array of durations after which an animation will be triggered.
         * To increase the number of durations generated, you can simply increase the
         * number given to the Array() call.
         */
        sequence: Array(6)
          .fill()
          .map((_, i) => `${i * 0.05}s`),
        options: {
          duration: '0.3s',
          easing: 'ease-in-out',
          fillMode: 'both',
        },
      },
      variants: {
        animationSequences: ['responsive'],
      },
    },
  }
);
