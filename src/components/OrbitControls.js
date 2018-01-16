import THREE from 'three';

import Function_noop from '../helpers/Function/noop';
import THREE_Quaternion_setFrom from '../helpers/THREE/Quaternion/setFrom';
import THREE_Vector3_setFrom from '../helpers/THREE/Vector3/setFrom';

let VueThreeOrbitControls = {
	name: 'VueThreeOrbitControls',

	props: {
		cameraPosition: {
			type: [Object, Array],
			default() {
				return [0, 0, 0];
			},
		},
		cameraQuaternion: {
			type: [Object, Array],
			default() {
				return [0, 0, 0, 1];
			},
		},
		enabled: {
			type: Boolean,
			default: true,
		},
		/*target: {
			default: new THREE.Vector3(),
		},*/
		minDistance: {
			type: Number,
			default: 0,
		},
		maxDistance: {
			type: Number,
			default: Infinity,
		},
		minZoom: {
			type: Number,
			default: 0,
		},
		maxZoom: {
			type: Number,
			default: Infinity,
		},
		minPolarAngle: {
			type: Number,
			default: 0,
		},
		maxPolarAngle: {
			type: Number,
			default: Math.PI,
		},
		minAzimuthAngle: {
			type: Number,
			default: -Infinity,
		},
		maxAzimuthAngle: {
			type: Number,
			default: Infinity,
		},
		enableDamping: {
			type: Boolean,
			default: false,
		},
		dampingFactor: {
			type: Number,
			default: 1/4,
		},
		enableZoom: {
			type: Boolean,
			default: true,
		},
		zoomSpeed: {
			type: Number,
			default: 1,
		},
		enableRotate: {
			type: Boolean,
			default: true,
		},
		rotateSpeed: {
			type: Number,
			default: 1,
		},
		enablePan: {
			type: Boolean,
			default: true,
		},
		keyPanSpeed: {
			type: Number,
			default: 7,
		},
		autoRotate: {
			type: Boolean,
			default: false,
		},
		autoRotateSpeed: {
			type: Number,
			default: 2,
		},
		enableKeys: {
			type: Boolean,
			default: true,
		},
		intervalBetweenUpdateControls: {
			type: Number,
			default: 1000 / 60,
		},
	},

	data() {
		return {
			frozen$object: Object.freeze({
				o: this.createObject(),
			}),
			value: Object.freeze({
				cameraPosition: this.cameraPosition,
				cameraQuaternion: this.cameraQuaternion,
			}),
		};
	},

	computed: {
		object() {
			return this.frozen$object.o;
		},

		renderer() {
			return this.$parent.renderer;
		},

		controls() {
			return new THREE.OrbitControls(this.object, this.renderer.domElement);
		},

		startToUpdateControls() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.startToUpdateControls();
						});
					}, this.intervalBetweenUpdateControls);
					this.updateControls();
				}
			};
		},
	},

	watch: {
		cameraPosition(value) {
			if (this.value.cameraPosition !== value) {
				this.setObject();
			}
		},

		cameraQuaternion(value) {
			if (this.value.cameraQuaternion !== value) {
				this.setObject();
			}
		},

		controls: {
			handler(newControls, oldControls) {
				if (oldControls) {
					this.dispose(oldControls);
				}
			},
			immediate: true,
		},

		value({cameraPosition, cameraQuaternion}) {
			this.$emit('update:cameraPosition', cameraPosition);
			this.$emit('update:cameraQuaternion', cameraQuaternion);
		},
	},

	mounted() {
		this.startToUpdateControls();
	},

	beforeDestroy() {
		this.dispose(this.controls);
	},

	methods: {
		createObject() {
			let object = new THREE.PerspectiveCamera();
			THREE_Vector3_setFrom(object.position, this.cameraPosition);
			THREE_Quaternion_setFrom(object.quaternion, this.cameraQuaternion);
			return object;
		},

		setObject() {
			this.frozen$object = Object.freeze({
				o: this.createObject(),
			});
		},

		dispose(controls) {
			controls.dispose();
		},

		updateControls() {
			this.controls.update();
			this.value = Object.freeze({
				cameraPosition: this.object.position.toArray(),
				cameraQuaternion: this.object.quaternion.toArray(),
			});
		},
	},

	render(createElement) {
		return createElement('div');
	},
};

Object.entries({
	setEnabled() {
		this.controls.enabled = this.enabled;
	},

	setMinDistance() {
		this.controls.minDistance = this.minDistance;
	},

	setMaxDistance() {
		this.controls.maxDistance = this.maxDistance;
	},

	setMinZoom() {
		this.controls.minZoom = this.minZoom;
	},

	setMaxZoom() {
		this.controls.maxZoom = this.maxZoom;
	},

	setMinPolarAngle() {
		this.controls.minPolarAngle = this.minPolarAngle;
	},

	setMaxPolarAngle() {
		this.controls.maxPolarAngle = this.maxPolarAngle;
	},

	setMinAzimuthAngle() {
		this.controls.minAzimuthAngle = this.minAzimuthAngle;
	},

	setMaxAzimuthAngle() {
		this.controls.maxAzimuthAngle = this.maxAzimuthAngle;
	},

	setEnableDamping() {
		this.controls.enableDamping = this.enableDamping;
	},

	setDampingFactor() {
		this.controls.dampingFactor = this.dampingFactor;
	},

	setEnableZoom() {
		this.controls.enableZoom = this.enableZoom;
	},

	setZoomSpeed() {
		this.controls.zoomSpeed = this.zoomSpeed;
	},

	setEnableRotate() {
		this.controls.enableRotate = this.enableRotate;
	},

	setRotateSpeed() {
		this.controls.rotateSpeed = this.rotateSpeed;
	},

	setEnablePan() {
		this.controls.enablePan = this.enablePan;
	},

	setKeyPanSpeed() {
		this.controls.keyPanSpeed = this.keyPanSpeed;
	},

	setAutoRotate() {
		this.controls.autoRotate = this.autoRotate;
	},

	setAutoRotateSpeed() {
		this.controls.autoRotateSpeed = this.autoRotateSpeed;
	},

	setEnableKeys() {
		this.controls.enableKeys = this.enableKeys;
	},
}).forEach(([key, fn]) => {
	VueThreeOrbitControls.computed[key] = fn;
	VueThreeOrbitControls.watch[key] = Function_noop;
});

export default VueThreeOrbitControls;
