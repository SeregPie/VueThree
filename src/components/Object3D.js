import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

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
			updatePosition() {
				if (Array.isArray(this.position)) {
					this.object.position.fromArray(this.position);
				} else {
					Object.assign(this.object.position, this.position);
				}
			},

			updateQuaternion() {
				if (Array.isArray(this.quaternion)) {
					this.object.quaternion.fromArray(this.quaternion);
				} else {
					Object.assign(this.object.quaternion, this.quaternion);
				}
			},

			updateScale() {
				if (Array.isArray(this.scale)) {
					this.object.scale.fromArray(this.scale);
				} else
				if (Number.isFinite(this.scale)) {
					this.object.scale.setScalar(this.scale);
				} else {
					Object.assign(this.object.scale, this.scale);
				}
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