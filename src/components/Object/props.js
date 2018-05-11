export default {
	position: {
		type: Array,
		default() {
			return [0, 0, 0];
		},
	},

	quaternion: {
		type: Array,
		default() {
			return [0, 0, 0, 1];
		},
	},

	scale: {
		type: Array,
		default: [1, 1, 1],
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
