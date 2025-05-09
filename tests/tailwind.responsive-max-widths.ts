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
      mobile: '60em',
      tablet: '80em',
      desktop: '120em',
    },
  },
  plugins: [
    require('../lib')({
      gridColumns: 3,
      containerMaxWidths: {
        mobile: '20em',
        tablet: '40em',
        desktop: '60em',
      },
    }),
  ],
};
