import {Fog as THREE_Fog} from 'three';
import Function_partial from 'x/src/Function/partial';
import Lang_clone from 'x/src/Lang/clone';

let fog = new THREE_Fog();

export default {
	color: {
		type: [Number, String],
		default: Function_partial(Lang_clone, fog.color.getHexString()),
	},

	near: {
		type: Number,
		default: Function_partial(Lang_clone, fog.near),
	},

	far: {
		type: Number,
		default: Function_partial(Lang_clone, fog.far),
	},
};
