import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

import Object3D from './Object3D';

export default {
	name: 'VueThreePerspectiveCamera',

	mixins: [Object3D],
	render: Object3D.render,

	props: {
		fov: {
			type: Number,
			default: 50,
		},
		near: {
			type: Number,
			default: 1/10,
		},
		far: {
			type: Number,
			default: 2000,
		},
	},

	beforeCreate() {
		Object.entries({
			setFov() {
				this.object.fov = this.fov;
			},

			setNear() {
				this.object.near = this.near;
			},

			setFar() {
				this.object.far = this.far;
			},
		}).forEach(([key, fn]) => {
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	created() {
		this.$parent.$parent.camera = this.object;
	},

	computed: {
		object() {
			return new THREE.PerspectiveCamera();
		},
	},

	watch: {},
};