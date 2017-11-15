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

Include [polyfills](https://polyfill.io/) to support older browsers.

```html

<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Number.isFinite,Object.entries"></script>

```

## usage

```html

<vue-three-renderer clear-color="#00ff00">
	<vue-three-scene>
		<vue-three-fog color="#ff0000"></vue-three-fog>
		<vue-three-perspective-camera
			:fov="75"
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

	computed: {
		object() {
			return new THREE.Mesh(
				new THREE.SphereBufferGeometry(1/2, 24, 24),
				new THREE.MeshStandardMaterial({metalness: 2/3, roughness: 2/3}),
			);
		},

		setMaterialEmissive() {
			this.object.material.emissive.set(this.color);
		},
	},

	watch: {
		setMaterialEmissive() {},
	},

	methods: {
		destroyObject(object) {
			object.geometry.dispose();
			object.material.dispose();
		},
	},
},

```

## components

### Object3D

`vue-three-object`

| property | type | default |
| ---: | :--- | :--- |
| `position` | `[Object, Array]` | `[0, 0, 0]` |
| `quaternion` | `[Object, Array]` | `[0, 0, 0, 1]` |
| `scale` | `[Object, Array, Number]` | `1` |
| `name` | `String` | `''` |
| `userData` | `userData` | `{}` |