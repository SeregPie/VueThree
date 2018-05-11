(function() {

	var defaultCameraPosition = [0, 0, 5/2];
	var defaultCameraQuaternion = [0, 0, 0, 1];

	new Vue({
		el: '#App',

		data: {
			backgroundColor: '#253037',
			primaryColor: '#ececeb',
			secondaryColor: '#a3ff00',
			lightPosition: [1, 1, 1],
			cameraPosition: defaultCameraPosition,
			cameraQuaternion: defaultCameraQuaternion,
			tweenedCameraPosition: defaultCameraPosition,
			tweenedCameraQuaternion: defaultCameraQuaternion,
			controlsEnabled: true,
			points: (function() {
				var points = [];
				for (var i = 0; i < 100; ++i) {
					var point = {
						position: (new THREE.Vector3())
							.setX(Math.random())
							.setY(Math.random())
							.setZ(Math.random())
							.subScalar(1/2)
							.setLength(1/6 + Math.random() * 5/6)
							.toArray(),
						scale: (new THREE.Vector3())
							.setScalar(1/100 + Math.random() * 1/25)
							.toArray(),
					};
					points.push(point);
				}
				return points;
			})(),
			selectedPoints: {},
		},

		computed: {
			interactions: function() {
				return {
					hover: {
						objectFilter: this.isThreePoint,
						onHoverIn: this.onThreePointHoverIn,
						onHoverOut: this.onThreePointHoverOut
					},
					press: {
						objectFilter: this.isThreePoint,
						onPress: this.onThreePointPress,
					},
					drag: {
						objectFilter: this.isThreePoint,
						onDragStart: this.onThreePointDragStart,
						onDrag: this.onThreePointDrag,
						onDragEnd: this.onThreePointDragEnd,
					},
					select: {
						shape: 'ellipse',
						objectFilter: this.isThreePoint,
						onSelectStart: this.onThreePointsSelectStart,
						onSelect: this.onThreePointsSelect,
						onSelectEnd: this.onThreePointsSelectEnd,
					},
				};
			},

			threeSphereHelper: function() {
				var primaryColor = this.primaryColor;

				return {
					component: 'mySphereHelper',
					props: {
						color: primaryColor,
					},
				};
			},

			threePoints: function() {
				var points = this.points;
				var selectedPoints = this.selectedPoints;
				var primaryColor = this.primaryColor;
				var secondaryColor = this.secondaryColor;

				var returns = {};
				points.forEach(function(point, pointIndex) {
					var threePointKey = ''+pointIndex;
					var pointSelected = !!selectedPoints[pointIndex];
					var threePointColor = pointSelected ? secondaryColor : primaryColor;
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
					returns[JSON.stringify(['point', key])] = object;
				});
				return returns;
			},
		},

		watch: {
			cameraPosition: function(value) {

			},

			cameraQuaternion: function(value) {

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

			onThreePointDragStart: function(object) {
				this.controlsEnabled = false;
				var pointIndex = object.userData.index;
				Vue.set(this.selectedPoints, pointIndex, true);
			},

			onThreePointDrag: function(object, position) {
				var pointIndex = object.userData.index;
				this.points[pointIndex].position = position;
			},

			onThreePointDragEnd: function(object) {
				this.controlsEnabled = true;
				var pointIndex = object.userData.index;
				Vue.delete(this.selectedPoints, pointIndex);
			},

			onThreePointHoverIn: function(object) {
				var pointIndex = object.userData.index;
				Vue.set(this.selectedPoints, pointIndex, true);
			},

			onThreePointHoverOut: function(object) {
				var pointIndex = object.userData.index;
				Vue.delete(this.selectedPoints, pointIndex);
			},

			onThreePointsSelectStart: function() {
				this.controlsEnabled = false;
			},

			onThreePointsSelect: function(objects, objectsIn, objectsOut) {
				objectsIn.forEach(function(object) {
					var pointIndex = object.userData.index;
					Vue.set(this.selectedPoints, pointIndex, true);
				}.bind(this));
				objectsOut.forEach(function(object) {
					var pointIndex = object.userData.index;
					Vue.delete(this.selectedPoints, pointIndex);
				}.bind(this));
			},

			onThreePointsSelectEnd: function(objects) {
				objects.forEach(function(object) {
					var pointIndex = object.userData.index;
					Vue.delete(this.selectedPoints, pointIndex);
				}.bind(this));
				this.controlsEnabled = true;
			},
		},

		components: {
			mySphereHelper: {
				mixins: [VueThree.Object],

				props: {
					color: {},
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

				created: (function() {
					var watchComputed = [
						function() {
							this.object.material.color.set(this.color);
						},
					];
					return function() {
						watchComputed.forEach(function(func) {
							this.$watch(func);
						}, this);
					};
				})(),

				methods: {
					dispose: function(object) {
						object.geometry.dispose();
						object.material.dispose();
					},
				},
			},

			myPoint: {
				mixins: [VueThree.Object],

				props: {
					color: {},
				},

				computed: {
					object: function() {
						return new THREE.Mesh(
							new THREE.SphereBufferGeometry(1/2, 24, 24),
							new THREE.MeshStandardMaterial({
								metalness: 2/3,
								roughness: 2/3,
							})
						);
					},
				},

				created: (function() {
					var watchComputed = [
						function() {
							this.object.material.emissive.set(this.color);
						},
					];
					return function() {
						watchComputed.forEach(function(func) {
							this.$watch(func);
						}, this);
					};
				})(),

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
