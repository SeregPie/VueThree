import THREE from 'three';

import Element_getBoundingClientRect from '../helpers/Element/getBoundingClientRect';
import Function_noop from '../helpers/Function/noop';

export default {
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
		clearColor: {
			type: [String, Number],
			default: 0x000000,
		},
		clearAlpha: {
			type: Number,
			default: 1,
		},
		preserveDrawingBuffer: {
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
					preserveDrawingBuffer: this.preserveDrawingBuffer,
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

			setClearColor() {
				this.renderer.setClearColor(this.clearColor, this.clearAlpha);
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
			let {width, height} = Element_getBoundingClientRect(this.$el);
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