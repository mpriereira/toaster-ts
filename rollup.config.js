import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only'

/*** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [typescript(), css({ output: 'bundle.css' })]
};
