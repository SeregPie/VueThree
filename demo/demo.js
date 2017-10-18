(function() {

	new Vue({
		el: '#demo',

		data: {
			backgroundColor: '#1a3041',
			lightPosition: [1, 1, 1],
			cameraPosition: [0, 0, 4/2],
			cameraQuaternion: [0, 0, 0, 1],
		},

		computed: {
			threeSphereHelper() {
				return {
					component: 'mySphereHelper',
					props: {
						color: '#a0a0a0'
					},
				};
			},

			threePoints() {
				let returns = {};
				for (let i = 0; i < 100; ++i) {
					returns[Math.random()] = {
						component: 'myPoint',
						props: {
							color: '#a0a0a0',
							position: (new THREE.Vector3(Math.random(), Math.random(), Math.random()))
								.subScalar(1/2)
								.setLength(Math.random()),
							scale: 1/100,
						},
					};
				}
				return returns;
			},

			threeObjects() {

				let returns = {};
				{
					let object = this.threeSphereHelper;
					if (object) {
						returns['threeSphereHelper'] = object;
					}
				}
				for (let [key, object] of Object.entries(this.threePoints)) {
					returns[`threePoint.${key}`] = object;
				}
				return returns;
			},
		},

		methods: {
			test() {
				this.lightPosition = [Math.random(), Math.random(), Math.random()];
			},
		},

		components: {
			mySphereHelper: {
				mixins: [VueTHREE.Object3D],
				render: VueTHREE.Object3D.render,

				props: {
					color: {},
				},

				THREE: {
					object() {
						return new THREE.Mesh(
							new THREE.IcosahedronGeometry(1, 3),
							new THREE.MeshBasicMaterial({
								opacity: 1/8,
								transparent: true,
								vertexColors: THREE.VertexColors,
								wireframe: true,
							}),
						);
					},
				},

				beforeCreate() {
					Object.entries({
						updateColor() {
							this.object.material.color.set(this.color);
						},
					}).forEach(([key, fn]) => {
						this.$options.computed[key] = fn;
						this.$options.watch[key] = function() {};
					});
				},

				beforeDestroy() {
					this.object.geometry.dispose();
					this.object.material.dispose();
				},

				computed: {},
				watch: {},
			},

			myPoint: {
				mixins: [VueTHREE.Object3D],
				render: VueTHREE.Object3D.render,

				props: {
					color: {},
				},

				THREE: {
					object() {
						return new THREE.Mesh(
							new THREE.SphereBufferGeometry(1/2, 24, 24),
							new THREE.MeshStandardMaterial({metalness: 2/3, roughness: 2/3}),
						);
					},
				},

				beforeCreate() {
					Object.entries({
						updateColor() {
							this.object.material.emissive.set(this.color);
						},
					}).forEach(([key, fn]) => {
						this.$options.computed[key] = fn;
						this.$options.watch[key] = function() {};
					});
				},

				beforeDestroy() {
					this.object.geometry.dispose();
					this.object.material.dispose();
				},

				computed: {},
				watch: {},
			},
		},
	});

})();