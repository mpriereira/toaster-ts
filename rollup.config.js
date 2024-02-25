import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'
import scss from 'rollup-plugin-scss'

/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    plugins: [terser()]
  },
  plugins: [typescript(), scss({ fileName: 'bundle.css' })]
};
