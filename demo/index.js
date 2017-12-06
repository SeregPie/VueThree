(function() {

	var defaultCameraPosition = [0, 0, 5/2];
	var defaultCameraQuaternion = [0, 0, 0, 1];

	new Vue({
		el: '#App',

		data: {
			backgroundColor: '#1a3041',
			lightPosition: [1, 1, 1],
			cameraPosition: defaultCameraPosition,
			cameraQuaternion: defaultCameraQuaternion,
			controlsEnabled: true,
			points: (function() {
				var returns = [];
				for (var i = 0; i < 100; ++i) {
					var point = {
						position: (new THREE.Vector3(Math.random(), Math.random(), Math.random()))
							.subScalar(1/2)
							.setLength(Math.random())
							.toArray(),
						scale: 1/100 + Math.random() * 3/100,
					};
					returns.push(point);
				}
				return returns;
			})(),
			selectedPoints: {},
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

			threePoints: function() {
				var points = this.points;
				var selectedPoints = this.selectedPoints;

				var returns = {};
				points.forEach(function(point, pointIndex) {
					var threePointKey = ''+pointIndex;
					var pointSelected = !!selectedPoints[pointIndex];
					var threePointColor = pointSelected ? '#ff0000' : '#a0a0a0';
					var threePoint = {
						component: 'myPoint',
						props: {
							color: threePointColor,
							position: point.position,
							scale: point.scale,
							userData: {
								type: 'point',
								index: pointIndex,
							},
						},
					};
					returns[threePointKey] = threePoint;
				});
				return returns;
			},

			threeObjects: function() {
				var threeSphereHelper = this.threeSphereHelper;
				var threePoints = this.threePoints;

				var returns = {};
				if (threeSphereHelper) {
					returns['sphereHelper'] = threeSphereHelper;
				}
				Object.entries(threePoints).forEach(function(entry) {
					var key = entry[0];
					var object = entry[1];
					returns['point'+'.'+key] = object;
				});
				return returns;
			},
		},

		methods: {
			resetCamera: function() {
				this.cameraPosition = defaultCameraPosition;
				this.cameraQuaternion = defaultCameraQuaternion;
			},

			isThreePoint: function(object) {
				return object.userData.type === 'point';
			},

			onThreePointPress: function(object) {
				var pointIndex = object.userData.index;
				this.points.splice(pointIndex, 1);
			},

			onThreePointDragStart: function() {
				this.controlsEnabled = false;
			},

			onThreePointDrag: function(object, position) {
				var pointIndex = object.userData.index;
				this.points[pointIndex].position = position;
			},

			onThreePointDragEnd: function() {
				this.controlsEnabled = true;
			},

			onThreePointHoverIn: function(object) {
				var pointIndex = object.userData.index;
				Vue.set(this.selectedPoints, pointIndex, true);
			},

			onThreePointHoverOut: function(object) {
				var pointIndex = object.userData.index;
				Vue.delete(this.selectedPoints, pointIndex);
			},
		},

		components: {
			mySphereHelper: {
				mixins: [VueThree.Object3D],
				render: VueThree.Object3D.render,

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
					dispose: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},

			myPoint: {
				mixins: [VueThree.Object3D],
				render: VueThree.Object3D.render,

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
					dispose: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},
		},
	});

})();