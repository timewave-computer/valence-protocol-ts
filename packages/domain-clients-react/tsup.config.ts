import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'common/index': 'src/common/index.ts',
    'evm/index': 'src/evm/index.ts',
    'cosmos/index': 'src/cosmos/index.ts',
    'solana/index': 'src/solana/index.ts',
  },
  outDir: 'dist', // output directory
  format: ['esm', 'cjs'],
  dts: true, // emit .d.ts using `tsc`
  sourcemap: true,
  clean: true,

  treeshake: true,
  esbuildOptions(options) {
    // this makes sure all peer deps (including react) are external
    options.external = [
      ...(options.external ?? []),
      ...Object.keys(require('./package.json').peerDependencies),
    ];
  },
  target: 'es2017', // which version of ecmascript to compile to
});
