import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

import Object3D from './Object3D';

export default {
	name: 'VueThreePointLight',

	mixins: [Object3D],

	props: {
		color: {
			type: [Number, String],
			default: 0xffffff,
		},
		intensity: {
			type: Number,
			default: 1,
		},
		distance: {
			type: Number,
			default: 0,
		},
		decay: {
			type: Number,
			default: 1,
		},
	},

	computed: {
		object() {
			return new THREE.PointLight();
		},
	},

	watch: {},

	beforeCreate() {
		Object.entries({
			setColor() {
				this.object.color.set(this.color);
			},

			setIntensity() {
				this.object.intensity = this.intensity;
			},

			setDistance() {
				this.object.distance = this.distance;
			},

			setDecay() {
				this.object.decay = this.decay;
			},
		}).forEach(([key, fn]) => {
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	render: Object3D.render,
};
