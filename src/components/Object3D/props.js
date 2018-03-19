import {Object3D as THREE_Object3D} from 'three';
import Function_partial from 'x/src/Function/partial';
import Lang_clone from 'x/src/Lang/clone';

let object = new THREE_Object3D();

export default {
	position: {
		type: [Object, Array],
		default: Function_partial(Lang_clone, object.position.toArray()),
	},

	quaternion: {
		type: [Object, Array],
		default: Function_partial(Lang_clone, object.quaternion.toArray()),
	},

	scale: {
		type: [Object, Array, Number],
		default: Function_partial(Lang_clone, object.scale.toArray()),
	},

	name: {
		type: String,
		default: Function_partial(Lang_clone, object.name),
	},

	userData: {
		default: Function_partial(Lang_clone, object.userData),
	},
};
