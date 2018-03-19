import {PerspectiveCamera as THREE_PerspectiveCamera} from 'three';

import Function_noop from 'x/src/Function/noop';

import Object3D from './Object3D';

let VueThreePerspectiveCamera = {
	name: 'VueThreePerspectiveCamera',

	mixins: [Object3D],

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

	computed: {
		object() {
			return new THREE_PerspectiveCamera();
		},
	},

	watch: {},

	created() {
		this.$parent.$parent.camera = this.object;
	},

	render: Object3D.render,
};

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
	VueThreePerspectiveCamera.computed[key] = fn;
	VueThreePerspectiveCamera.watch[key] = Function_noop;
});

export default VueThreePerspectiveCamera;
