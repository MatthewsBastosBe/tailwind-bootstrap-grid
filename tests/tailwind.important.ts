import config from './tailwind.base';

export default {
  ...config,
  safelist: [
    {
      pattern: /./,
      variants: ['mobile', 'tablet', 'desktop'],
    },
  ],
  theme: {
    screens: {
      mobile: '1em',
      tablet: '2em',
      desktop: '3em',
    },
  },
  plugins: [require('../lib')({ containerMaxWidths: {} })],
  important: true,
};
