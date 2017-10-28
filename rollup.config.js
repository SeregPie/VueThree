import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

let globals = {
	'vue': 'Vue',
	'three': 'THREE',
};

export default {
	debug: true,
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
			presets: [
				['env', {
					targets: {
						browsers: 'last 2 versions',
					},
					modules: false,
				}],
			],
			plugins: ['external-helpers'],
		}),
		minify({comments: false}),
	],
};