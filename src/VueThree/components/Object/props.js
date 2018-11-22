import Function_stubObject from '/utils/Function/stubObject';

export default {
	name: {
		type: String,
		default: '',
	},

	position: {
		type: [Array, Object],
		default() {
			return [0, 0, 0];
		},
	},

	quaternion: {
		type: [Array, Object],
		default() {
			return [0, 0, 0, 1];
		},
	},

	scale: {
		type: [Number, Array, Object],
		default: 1,
	},

	userData: {
		default: Function_stubObject,
	},
};
