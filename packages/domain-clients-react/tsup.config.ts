import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'common/index': 'src/common/index.ts',
    'evm/index': 'src/evm/index.ts',
    'cosmos/index': 'src/cosmos/index.ts',
  },
  outDir: 'dist', // output directory
  format: ['esm', 'cjs'],
  dts: true, // emit .d.ts using `tsc`
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'], // exclude packages from bundle (peer dependencies)
  target: 'es2017', // which version of ecmascript to compile to
});
