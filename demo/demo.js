(function() {

	new Vue({
		el: '#demo',

		data: {

		},

		computed: {
			threePoints() {
				let returns = {};
				for (let i = 0; i < 100; ++i) {
					returns[Math.random()] = {
						component: 'myPoint',
						props: {
							color: '#ffff00',
							position: (new THREE.Vector3(Math.random(), Math.random(), Math.random()))
								.subScalar(1/2)
								.setLength(1 + Math.random())
								.multiplyScalar(2),
							scale: 1/100,
						},
					};
				}
				return returns;
			},

			threeObjects() {
				let returns = {};
				for (let [key, value] of Object.entries(this.threePoints)) {
					key = `threePoint.${key}`;
					returns[key] = value;
				}
				return returns;
			},
		},

		components: {
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