import THREE from 'three';

import Function_noop from '../helpers/Function/noop';

let VueThreeRenderer = {
	name: 'VueThreeRenderer',

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
		intervalBetweenRenderScene: {
			type: Number,
			default: 1000 / 60,
		},
		intervalBetweenUpdateContainerSize: {
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

		startToUpdateContainerSize() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.startToUpdateContainerSize();
						});
					}, this.intervalBetweenUpdateContainerSize);
					this.updateContainerSize();
				}
			};
		},

		startToRenderScene() {
			return function() {
				if (!this._isDestroyed) {
					setTimeout(() => {
						requestAnimationFrame(() => {
							this.startToRenderScene();
						});
					}, this.intervalBetweenRenderScene);
					this.renderScene();
				}
			};
		},
	},

	watch: {},

	mounted() {
		this.$refs.container.appendChild(this.renderer.domElement);
		this.startToUpdateContainerSize();
		this.startToRenderScene();
	},

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

	render(createElement) {
		return(
			createElement(
				'div',
				{
					style: {
						position: 'relative',
						width: '100%',
						height: '100%',
					},
				},
				[
					createElement(
						'div',
						{
							style: {
								position: 'absolute',
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								overflow: 'hidden',
							},
							ref: 'container'
						},
						this.$slots.default,
					),
				],
			)
		);
	},
};

Object.entries({
	setSize() {
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
	VueThreeRenderer.computed[key] = fn;
	VueThreeRenderer.watch[key] = Function_noop;
});


export default VueThreeRenderer;
