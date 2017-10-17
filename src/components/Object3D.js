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
			containerWidth: 0,
			containerHeight: 0,
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