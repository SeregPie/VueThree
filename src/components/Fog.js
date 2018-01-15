import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

export default {
	name: 'VueThreeFog',

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

	computed: {
		fog() {
			return new THREE.Fog();
		},
	},

	watch: {},

	mounted() {
		this.$parent.object.fog = this.fog;
	},

	beforeCreate() {
		Object.entries({
			setColor() {
				this.fog.color.set(this.color);
			},

			setNear() {
				this.fog.near = this.near;
			},

			setFar() {
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

	render(createElement) {
		return createElement('div');
	},
};
