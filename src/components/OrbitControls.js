import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

export default {
	name: 'VueThreeOrbitControls',

	render(createElement) {
		return createElement('div', {
			style: {
				position: 'absolute',
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				overflow: 'hidden',
			},
		});
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
		updateControlsInterval: {
			type: Number,
			default: 1000 / 60,
		},
	},

	data() {
		return {
			frozen$controls: Object.freeze({o: null}),
		};
	},

	beforeCreate() {
		Object.entries({
			updateEnabled() {
				this.controls.enabled = this.enabled;
			},

			updateMinDistance() {
				this.controls.minDistance = this.minDistance;
			},

			updateMaxDistance() {
				this.controls.maxDistance = this.maxDistance;
			},

			updateMinZoom() {
				this.controls.minZoom = this.minZoom;
			},

			updateMaxZoom() {
				this.controls.maxZoom = this.maxZoom;
			},

			updateMinPolarAngle() {
				this.controls.minPolarAngle = this.minPolarAngle;
			},

			updateMaxPolarAngle() {
				this.controls.maxPolarAngle = this.maxPolarAngle;
			},

			updateMinAzimuthAngle() {
				this.controls.minAzimuthAngle = this.minAzimuthAngle;
			},

			updateMaxAzimuthAngle() {
				this.controls.maxAzimuthAngle = this.maxAzimuthAngle;
			},

			updateEnableDamping() {
				this.controls.enableDamping = this.enableDamping;
			},

			updateDampingFactor() {
				this.controls.dampingFactor = this.dampingFactor;
			},

			updateEnableZoom() {
				this.controls.enableZoom = this.enableZoom;
			},

			updateZoomSpeed() {
				this.controls.zoomSpeed = this.zoomSpeed;
			},

			updateEnableRotate() {
				this.controls.enableRotate = this.enableRotate;
			},

			updateRotateSpeed() {
				this.controls.rotateSpeed = this.rotateSpeed;
			},

			updateEnablePan() {
				this.controls.enablePan = this.enablePan;
			},

			updateKeyPanSpeed() {
				this.controls.keyPanSpeed = this.keyPanSpeed;
			},

			updateAutoRotate() {
				this.controls.autoRotate = this.autoRotate;
			},

			updateAutoRotateSpeed() {
				this.controls.autoRotateSpeed = this.autoRotateSpeed;
			},

			updateEnableKeys() {
				this.controls.enableKeys = this.enableKeys;
			},
		}).forEach(([key, fn]) => {
			this.$options.computed[key] = function() {
				if (this.controls) {
					fn.call(this);
				}
			};
			this.$options.watch[key] = Function_noop;
		});
	},

	mounted() {
		let object = new THREE.PerspectiveCamera();
		{
			if (Array.isArray(this.position)) {
				object.position.fromArray(this.position);
			} else {
				Object.assign(object.position, this.position);
			}
		}
		{
			if (Array.isArray(this.quaternion)) {
				object.quaternion.fromArray(this.quaternion);
			} else {
				Object.assign(object.quaternion, this.quaternion);
			}
		}
		this.frozen$controls = Object.freeze({
			o: new THREE.OrbitControls(object, this.$el),
		});
		this.updateControlsScheduler();
	},

	beforeDestroy() {
		if (this.controls) {
			this.controls.dispose();
		}
	},

	computed: {
		controls() {
			return this.frozen$controls.o;
		},

		updateControlsScheduler() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.updateControlsScheduler();
						});
					}, this.updateControlsInterval);
					this.updateControls();
				}
			};
		},
	},

	watch: {},

	methods: {
		updateControls() {
			if (this.controls) {
				this.controls.update();
				this.$emit('update:position', this.controls.object.position.toArray());
				this.$emit('update:quaternion', this.controls.object.quaternion.toArray());
			}
		},
	},
};