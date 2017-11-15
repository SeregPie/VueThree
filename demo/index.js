(function() {

	new Vue({
		el: '#App',

		data() {
			var defaultCameraPosition = [0, 0, 5/2];
			var defaultCameraQuaternion = [0, 0, 0, 1];

			return {
				backgroundColor: '#1a3041',
				lightPosition: [1, 1, 1],
				defaultCameraPosition: defaultCameraPosition,
				cameraPosition: defaultCameraPosition,
				defaultCameraQuaternion: defaultCameraQuaternion,
				cameraQuaternion: defaultCameraQuaternion,
				threePoints: {},

				drawer: true,
			};
		},

		created() {
			this.redrawPoints();
		},

		computed: {
			threeSphereHelper: function() {
				return {
					component: 'mySphereHelper',
					props: {
						color: '#a0a0a0'
					},
				};
			},

			threeObjects: function() {
				var returns = {};
				if (this.threeSphereHelper) {
					returns['threeSphereHelper'] = this.threeSphereHelper;
				}
				Object.entries(this.threePoints).forEach(function(entry) {
					var key = entry[0];
					var object = entry[1];
					returns['threePoint'+'.'+key] = object;
				});
				return returns;
			},
		},

		methods: {
			resetCamera: function() {
				this.cameraPosition = this.defaultCameraPosition;
				this.cameraQuaternion = this.defaultCameraQuaternion;
			},

			redrawPoints: function() {
				var threePoints = {};
				for (var i = 0; i < 100; ++i) {
					threePoints[Math.random()] = {
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
				this.threePoints = threePoints;
			},
		},

		components: {
			mySphereHelper: {
				mixins: [VueTHREE.Object3D],
				render: VueTHREE.Object3D.render,

				props: {
					color: {},
				},

				beforeCreate: function() {
					Object.entries({
						setMaterialColor: function() {
							this.object.material.color.set(this.color);
						},
					}).forEach(function(entry) {
						var key = entry[0];
						var fn = entry[1];
						this.$options.computed[key] = fn;
						this.$options.watch[key] = function() {};
					}.bind(this));
				},

				beforeDestroy: function() {
					this.object.geometry.dispose();
					this.object.material.dispose();
				},

				computed: {
					object: function() {
						return new THREE.Mesh(
							new THREE.IcosahedronGeometry(1, 3),
							new THREE.MeshBasicMaterial({
								opacity: 1/8,
								transparent: true,
								vertexColors: THREE.VertexColors,
								wireframe: true,
							})
						);
					},
				},

				watch: {},

				methods: {
					destroyObject: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},

			myPoint: {
				mixins: [VueTHREE.Object3D],
				render: VueTHREE.Object3D.render,

				props: {
					color: {},
				},

				beforeCreate: function() {
					Object.entries({
						setMaterialEmissive: function() {
							this.object.material.emissive.set(this.color);
						},
					}).forEach(function(entry) {
						var key = entry[0];
						var fn = entry[1];
						this.$options.computed[key] = fn;
						this.$options.watch[key] = function() {};
					}.bind(this));
				},

				computed: {
					object: function() {
						return new THREE.Mesh(
							new THREE.SphereBufferGeometry(1/2, 24, 24),
							new THREE.MeshStandardMaterial({metalness: 2/3, roughness: 2/3})
						);
					},
				},

				watch: {},

				methods: {
					destroyObject: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},
		},
	});

})();