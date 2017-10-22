# VueTHREE

*in the early development stage*

A Vue wrapper for THREE.

## dependencies

- [Vue](https://github.com/vuejs/vue)
- [THREE](https://github.com/mrdoob/three.js)

## setup

Install the [package](https://www.npmjs.com/package/vuethree) via npm.

```sh

npm install vuethree

```

---

Include the code in your page via a CDN.

```html

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://cdn.rawgit.com/mrdoob/three.js/dev/examples/js/controls/OrbitControls.js"></script>
<script src="https://unpkg.com/vuethree"></script>

```

## usage

```html

<vue-three-renderer clear-color="#00ff00">
	<vue-three-scene>
		<vue-three-fog color="#ff0000"></vue-three-fog>
		<vue-three-perspective-camera
			:fov="60"
			:position="cameraPosition"
			:quaternion="cameraQuaternion"
		></vue-three-perspective-camera>
		<component
			v-for="threeObject in threeObjects"
			:key="threeObject.key"
			:is="threeObject.component"
			v-bind="threeObject.props"
		></component>
		<vue-three-point-light
			:decay="2"
			:position="[50, 0, 0]"
		></vue-three-point-light>
	</vue-three-scene>
	<vue-three-orbit-controls
		:position.sync="cameraPosition"
		:quaternion.sync="cameraQuaternion"
		auto-rotate
	></vue-three-orbit-controls>
</vue-three-renderer>

```

---

Create custom THREE components.

```js

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
