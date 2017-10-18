import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

export default {
	name: 'VueThreeFog',

	render(createElement) {
		return createElement('div');
	},

	props: {
		color: {
			type: [Number, String],
			default: 0x000000,
		},
		near: {
			type: Number,
			default: 1,
		},
		far: {
			type: Number,
			default: 1000,
		},
	},

	data() {
		return {
			frozen$fog: Object.freeze({
				o: new THREE.Fog(),
			}),
		};
	},

	mounted() {
		this.$parent.object.fog = this.fog;
	},

	beforeCreate() {
		Object.entries({
			updateColor() {
				this.fog.color.set(this.color);
			},

			updateNear() {
				this.fog.near = this.near;
			},

			updateFar() {
				this.fog.far = this.far;
			},
		}).forEach(([key, fn]) => {
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	beforeDestroy() {
		this.$parent.object.fog = null;
	},

	computed: {
		fog() {
			return this.frozen$fog.o;
		},
	},

	watch: {},
};