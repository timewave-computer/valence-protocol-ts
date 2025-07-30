import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'common/index': 'src/common/index.ts',
    'cosmos/index': 'src/cosmos/index.ts',
    'evm/index': 'src/evm/index.ts',
  },
  outDir: 'dist', // output directory
  format: ['esm', 'cjs'],
  dts: true, // generates .d.ts files for each entry point. internally calls tsc --emitDeclarationOnly
  sourcemap: false, 
  clean: true, // clean up build artifacts each time
});
