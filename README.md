# VueThree

*in the early development stage*

A Vue wrapper for THREE.

## demo

[Try it out!](https://seregpie.github.io/VueThree/)

## dependencies

- [Vue](https://github.com/vuejs/vue)
- [THREE](https://github.com/mrdoob/three.js)

## setup

### NPM

```sh

npm install vuethree

```

### ES2015

Register the components in the scope of another instance.

```js

import {Renderer: VueThreeRenderer, Scene: VueThreeScene} from 'vuethree';

export default {
	// ...
	components: {
		VueThreeRenderer,
		VueThreeScene,
	},
};

```

### Browser

```html

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://cdn.rawgit.com/mrdoob/three.js/dev/examples/js/controls/OrbitControls.js"></script>
<script src="https://unpkg.com/vuethree"></script>

```

If Vue is detected, the components will be registered automatically.

Include [polyfills](https://polyfill.io/) to support older browsers.

```html

<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Object.entries"></script>

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
	mixins: [VueThree.Object3D],
	render: VueThree.Object3D.render,

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
		dispose(object) {
			object.geometry.dispose();
			object.material.dispose();
		},
	},
},

```

## components

### Renderer

#### name

`vue-three-renderer`

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `antialias` | `Boolean` | `true` |
| `alpha` | `Boolean` | `false` |
| `clearColor` | `[String, Number]` | `0x000000` |
| `clearAlpha` | `Number` | `1` |
| `preserveDrawingBuffer` | `Boolean` | `false` |
| `intervalBetweenRenderScene` | `Number` | `1000 / 60` |
| `intervalBetweenUpdateContainerSize` | `Number` | `1000` |

### Object3D

#### name

`vue-three-object`

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `position` | `[Object, Array]` | `[0, 0, 0]` |
| `quaternion` | `[Object, Array]` | `[0, 0, 0, 1]` |
| `scale` | `[Object, Array, Number]` | `1` |
| `name` | `String` | `''` |
| `userData` | `userData` | `{}` |

### Scene

#### name

`vue-three-scene`

### PerspectiveCamera

#### name

`vue-three-perspective-camera`

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `fov` | `Number` | `50` |
| `near` | `Number` | `1/10` |
| `far` | `Number` | `2000` |

### OrbitControls

#### name

`vue-three-orbit-controls`

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `position` | `[Object, Array]` | `[0, 0, 0]` |
| `quaternion` | `[Object, Array]` | `[0, 0, 0, 1]` |
| `enabled` | `Boolean` | `true` |
| `minDistance` | `Number` | `0` |
| `maxDistance` | `Number` | `Infinity` |
| `minZoom` | `Number` | `0` |
| `maxZoom` | `Number` | `Infinity` |
| `minPolarAngle` | `Number` | `0` |
| `maxPolarAngle` | `Number` | `Math.PI` |
| `minAzimuthAngle` | `Number` | `-Infinity` |
| `maxAzimuthAngle` | `Number` | `Infinity` |
| `enableDamping` | `Boolean` | `false` |
| `dampingFactor` | `Number` | `1/4` |
| `enableZoom` | `Boolean` | `true` |
| `zoomSpeed` | `Number` | `1` |
| `enableRotate` | `Boolean` | `true` |
| `rotateSpeed` | `Number` | `1` |
| `enablePan` | `Boolean` | `true` |
| `keyPanSpeed` | `Number` | `7` |
| `autoRotate` | `Boolean` | `false` |
| `autoRotateSpeed` | `Number` | `2` |
| `enableKeys` | `Boolean` | `true` |
| `fintervalBetweenUpdateControlsov` | `Number` | `1000 / 60` |

### PointLight

#### name

`vue-three-point-light`

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `color` | `[Number, String]` | `0xffffff` |
| `intensity` | `Number` | `1` |
| `distance` | `Number` | `0` |
| `decay` | `Number` | `1` |
