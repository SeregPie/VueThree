export default {
	position: {
		type: [Object, Array],
		default() {
			return [0, 0, 0];
		},
	},

	quaternion: {
		type: [Object, Array],
		default() {
			return [0, 0, 0, 1];
		},
	},

	scale: {
		type: [Object, Array, Number],
		default: 1,
	},

	name: {
		type: String,
		default: '',
	},

	userData: {
		default() {
			return {};
		},
	},
};
