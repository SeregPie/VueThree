import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

let globals = {
	'vue': 'Vue',
	'three': 'THREE',
};

export default {
	input: 'src/VueTHREE.js',
	external: Object.keys(globals),
	output: {
		file: 'VueTHREE.js',
		format: 'umd',
		name: 'VueTHREE',
		globals,
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			presets: [
				['env', {modules: false}],
			],
			plugins: ['transform-runtime'],
			runtimeHelpers: true,
		}),
		nodeResolve(),
		commonjs({
			include: 'node_modules/**',
		}),
		minify({comments: false}),
	],
};