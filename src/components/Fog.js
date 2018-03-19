import {Fog as THREE_Fog} from 'three';

import Function_noop from 'x/src/Function/noop';

let VueThreeFog = {
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
			return new THREE_Fog();
		},
	},

	watch: {},

	mounted() {
		this.$parent.object.fog = this.fog;
	},

	beforeDestroy() {
		this.$parent.object.fog = null;
	},

	render(createElement) {
		return createElement('div');
	},
};

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
	VueThreeFog.computed[key] = fn;
	VueThreeFog.watch[key] = Function_noop;
});

export default VueThreeFog;
