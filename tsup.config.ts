import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    entry: './types/index.ts',
  },
  clean: true,
  outDir: 'build',
});
