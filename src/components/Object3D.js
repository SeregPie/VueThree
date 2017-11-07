import THREE from 'three';

import Function_noop from '../helpers/Function/noop';
import THREE_Vector3_setFrom from '../helpers/THREE/Vector3/setFrom';
import THREE_Quaternion_setFrom from '../helpers/THREE/Quaternion/setFrom';

export default {
	name: 'VueThreeObject',

	render(createElement) {
		return createElement('div', this.$slots.default);
	},

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

	THREE: {
		object() {
			return new THREE.Object3D();
		},
	},

	data() {
		return {
			frozen$object: Object.freeze({
				o: this.$options.THREE.object.call(this),
			}),
		};
	},

	beforeCreate() {
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
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	mounted() {
		this.$parent.object.add(this.object);
	},

	beforeDestroy() {
		this.$parent.object.remove(this.object);
	},

	computed: {
		object() {
			return this.frozen$object.o;
		},

		renderer() {
			return this.$parent.renderer;
		},
	},

	watch: {},
};