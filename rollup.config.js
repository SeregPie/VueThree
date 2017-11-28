import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

let globals = {
	'three': 'THREE',
};

export default {
	input: 'src/VueThree.js',
	external: Object.keys(globals),
	output: {
		file: 'VueThree.js',
		format: 'umd',
		name: 'VueThree',
		globals,
	},
	plugins: [
		buble(),
		uglify(),
	],
};