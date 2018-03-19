import {PerspectiveCamera as THREE_PerspectiveCamera} from 'three';

let camera = new THREE_PerspectiveCamera();

export default {
	color: {
		type: [Number, String],
		default: fog.color.getHexString(),
	},

	near: {
		type: Number,
		default: fog.near,
	},

	far: {
		type: Number,
		default: fog.far,
	},
};
