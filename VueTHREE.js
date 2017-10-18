(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('three')) :
	typeof define === 'function' && define.amd ? define(['vue', 'three'], factory) :
	(global.VueTHREE = factory(global.Vue,global.THREE));
}(this, (function (Vue,THREE) { 'use strict';

Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
THREE = THREE && THREE.hasOwnProperty('default') ? THREE['default'] : THREE;

var Function_noop = function() {};

var Renderer = {
	name: 'VueThreeRenderer',

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
		}, this.$slots.default);
	},

	props: {
		antialias: {
			type: Boolean,
			default: true,
		},
		alpha: {
			type: Boolean,
			default: false,
		},
		renderSceneInterval: {
			type: Number,
			default: 1000 / 60,
		},
		updateContainerSizeInterval: {
			type: Number,
			default: 1000,
		},
	},

	data() {
		return {
			containerWidth: 0,
			containerHeight: 0,
			frozen$renderer: Object.freeze({
				o: new THREE.WebGLRenderer({
					alpha: this.alpha,
					antialias: this.antialias,
				}),
			}),
			frozen$scene: {o: null},
			frozen$camera: {o: null},
		};
	},

	beforeCreate() {
		Object.entries({
			updateRendererSize() {
				this.renderer.setSize(this.containerWidth, this.containerHeight);
				if (this.containerWidth > 0 && this.containerHeight > 0) {
					if (this.camera) {
						this.camera.aspect = this.containerWidth / this.containerHeight;
						this.camera.updateProjectionMatrix();
					}
				}
			},
		}).forEach(([key, fn]) => {
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	mounted() {
		this.$el.appendChild(this.renderer.domElement);
		this.updateContainerSizeScheduler();
		this.renderSceneScheduler();
	},

	computed: {
		renderer() {
			return this.frozen$renderer.o;
		},

		scene: {
			get() {
				return this.frozen$scene.o;
			},

			set(o) {
				return this.frozen$scene = Object.freeze({o});
			},
		},

		camera: {
			get() {
				return this.frozen$camera.o;
			},

			set(o) {
				return this.frozen$camera = Object.freeze({o});
			},
		},

		updateContainerSizeScheduler() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.updateContainerSizeScheduler();
						});
					}, this.updateContainerSizeInterval);
					this.updateContainerSize();
				}
			};
		},

		renderSceneScheduler() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.renderSceneScheduler();
						});
					}, this.renderSceneInterval);
					this.renderScene();
				}
			};
		},
	},

	watch: {},

	methods: {
		updateContainerSize() {
			let {width, height} = this.$el.getBoundingClientRect();
			this.containerWidth = width;
			this.containerHeight = height;
		},

		renderScene() {
			if (this.scene && this.camera) {
				this.renderer.render(this.scene, this.camera);
			}
		},
	},
};

var Object3D = {
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

var Scene = {
	name: 'VueThreeScene',

	render(createElement) {
		return createElement('div', this.$slots.default);
	},

	data() {
		return {
			frozen$object: Object.freeze({
				o: new THREE.Scene(),
			}),
		};
	},

	created() {
		this.$parent.scene = this.object;
	},

	computed: {
		object() {
			return this.frozen$object.o;
		},

		renderer() {
			return this.$parent.renderer;
		},
	},
};

var Fog = {
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

var PerspectiveCamera = {
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

	THREE: {
		object() {
			return new THREE.PerspectiveCamera();
		},
	},

	beforeCreate() {
		Object.entries({
			updateFov() {
				this.object.fov = this.fov;
			},

			updateNear() {
				this.object.near = this.near;
			},

			updateFar() {
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

	computed: {},

	watch: {},
};

var OrbitControls = {
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
		let object = new THREE.PerspectiveCamera();
		console.log(this.$el);
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
		return {
			frozen$controls: Object.freeze({
				o: new THREE.OrbitControls(object),
			}),
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
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	mounted() {
		this.updateControlsScheduler();
	},

	beforeDestroy() {
		this.controls.dispose();
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
			this.controls.update();
			this.$emit('update:position', this.controls.object.position.toArray());
			this.$emit('update:quaternion', this.controls.object.quaternion.toArray());
		},
	},
};

var PointLight = {
	name: 'VueThreePointLight',

	mixins: [Object3D],
	render: Object3D.render,

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

	THREE: {
		object() {
			return new THREE.PointLight();
		},
	},

	beforeCreate() {
		Object.entries({
			updateColor() {
				this.object.color.set(this.color);
			},

			updateIntensity() {
				this.object.intensity = this.intensity;
			},

			updateDistance() {
				this.object.distance = this.distance;
			},

			updateDecay() {
				this.object.decay = this.decay;
			},
		}).forEach(([key, fn]) => {
			this.$options.computed[key] = fn;
			this.$options.watch[key] = Function_noop;
		});
	},

	computed: {},

	watch: {},
};

Vue.component(Renderer.name, Renderer);
//this.Vue.component(Object3D.name, Object3D);
Vue.component(Scene.name, Scene);
Vue.component(Fog.name, Fog);
Vue.component(PerspectiveCamera.name, PerspectiveCamera);
Vue.component(OrbitControls.name, OrbitControls);
Vue.component(PointLight.name, PointLight);

var VueTHREE = {
	Renderer,
	Object3D,
	Scene,
	Fog,
	PerspectiveCamera,
	OrbitControls,
	PointLight,
};

return VueTHREE;

})));
