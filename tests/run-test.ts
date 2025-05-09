import { expect } from 'vitest';

const postcss = require('postcss');
const prettier = require('prettier');
const tailwindcss = require('@tailwindcss/postcss');

const CSS_INPUT = `
@tailwind components;
@tailwind utilities;
`;

export default async (testFile: string) => {
  const configFile = testFile.replace('.test.ts', '.ts');

  const result = await postcss()
    .use(tailwindcss(configFile))
    .process(CSS_INPUT, { from: undefined });

  expect(result.warnings()).toHaveLength(0);

  const css = await prettier.format(result.css, { parser: 'css' });

  expect(css).toMatchSnapshot();
};
