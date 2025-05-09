import config from './tailwind.base';

export default {
  ...config,
  safelist: [
    {
      pattern: /./,
      variants: ['mobile', 'desktop'],
    },
  ],
  theme: {
    screens: {
      mobile: '1em',
      desktop: '2em',
    },
  },
  plugins: [
    require('../lib')({
      gridColumns: 3,
      rtl: true,
      containerMaxWidths: {},
    }),
  ],
};
