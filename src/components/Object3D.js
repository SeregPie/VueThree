import {Object3D as THREE_Object3D} from 'three';

import Function_noop from 'x/src/Function/noop';
import THREE_Quaternion_setFrom from 'x.three/src/Quaternion/setFrom';
import THREE_Vector3_setFrom from 'x.three/src/Vector3/setFrom';

let VueThreeObject = {
	name: 'VueThreeObject',

	props: {
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
	},

	computed: {
		object() {
			return new THREE_Object3D();
		},

		renderer() {
			return this.$parent.renderer;
		},
	},

	watch: {
		object: {
			handler(newObject, oldObject) {
				if (oldObject) {
					this.$parent.object.remove(oldObject);
					this.dispose(oldObject);
				}
				this.$parent.object.add(newObject);
			},
			immediate: true,
		},
	},

	beforeDestroy() {
		this.$parent.object.remove(this.object);
		this.dispose(this.object);
	},

	methods: {
		dispose(object) {},
	},

	render(createElement) {
		return createElement('div', this.$slots.default);
	},
};

Object.entries({
	setPosition() {
		THREE_Vector3_setFrom(this.object.position, this.position);
	},

	setQuaternion() {
		THREE_Quaternion_setFrom(this.object.quaternion, this.quaternion);
	},

	setScale() {
		THREE_Vector3_setFrom(this.object.scale, this.scale);
	},

	setName() {
		this.object.name = this.name;
	},

	setUserData() {
		this.object.userData = this.userData;
	},
}).forEach(([key, fn]) => {
	VueThreeObject.computed[key] = fn;
	VueThreeObject.watch[key] = Function_noop;
});

export default VueThreeObject;
