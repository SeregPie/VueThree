import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

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
		buble(),
		uglify(),
	],
};