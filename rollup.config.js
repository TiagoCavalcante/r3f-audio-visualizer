import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const config = {
	input: 'src/index.tsx',
	output: [
		{
			file: './lib/cjs/index.js',
			format: 'cjs',
		},
		{
			file: './lib/esm/index.js',
			format: 'es',
		},
	],
	external: [...Object.keys(pkg.peerDependencies)],
	plugins: [
		nodeResolve(),
		commonjs(),
		typescript({
			typescript: require('typescript'),
		})
	],
};

export default config;
