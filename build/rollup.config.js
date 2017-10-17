export default {
	input: 'src/VueTHREE.js',
	external: ['vue', 'three'],
	output: {
		file: 'VueTHREE.js',
		format: 'umd',
		name: 'VueTHREE',
		globals: {
			'vue': 'Vue',
			'three': 'THREE',
		},
	},
	plugins: [],
};