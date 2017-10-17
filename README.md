# VueTHREE

```html

<vue-three-renderer clear-color="#00ff00">
	<vue-three-scene>
		<vue-three-fog color="#ff0000"></vue-three-fog>
		<vue-three-perspective-camera :fov="60">
			<vue-three-orbit-controls auto-rotate></vue-three-orbit-controls>
		</vue-three-perspective-camera>
		<component
			v-for="threeObject in threeObjects"
			:key="threeObject.key"
			:is="threeObject.component"
			v-bind="threeObject.props"
		></component>
		<vue-three-point-light :decay="2" :position="[50, 0, 0]"></vue-three-point-light>
	</vue-three-scene>
</vue-three-renderer>

```

---

Create custom THREE components.

```html

let MySphere = {
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

	beforeDestroy() {
		this.object.geometry.dispose();
		this.object.material.dispose();
	},

	computed: {
		updateColor() {
			this.object.material.emissive.set(this.color);
		},
	},

	watch: {
		updateColor() {},
	},
},

```