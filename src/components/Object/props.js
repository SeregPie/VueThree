import Function_stubObject from '/utils/Function/stubObject';

export default {
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

	name: {
		type: String,
		default: '',
	},

	userData: {
		default: Function_stubObject,
	},
};
