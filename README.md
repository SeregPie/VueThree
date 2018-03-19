# VueThree

*in the early development stage*

A Vue wrapper for THREE.

## demo

[Try it out!](https://seregpie.github.io/VueThree/)

## dependencies

- [Vue](https://github.com/vuejs/vue)
- [THREE](https://github.com/mrdoob/three.js)

## setup

### npm

```shell
npm install vuethree
```

### ES module

Register the components globally.

```javascript
import Vue from 'vue';
import VueThree from 'vuethree';

Vue.use(VueThree);
```

*or*

Register the components in the scope of another instance.

```javascript
import {Renderer, Scene} from 'vuethree';

export default {
  // ...
  components: {
    [Renderer.name]: Renderer,
    [Scene.name]: Scene,
  },
};
```

### browser

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://cdn.rawgit.com/mrdoob/three.js/dev/examples/js/controls/OrbitControls.js"></script>
<script src="https://unpkg.com/vuethree"></script>
```

If Vue is detected, the components will be registered automatically.

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
    :camera-position.sync="cameraPosition"
    :camera-quaternion.sync="cameraQuaternion"
    auto-rotate
  ></vue-three-orbit-controls>
</vue-three-renderer>
```

---

Create custom Vue THREE components.

```javascript
let MySphere = {
  mixins: [VueThree.Object3D],

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
  },

  created() {
    this.$watch(function() {
      this.object.material.emissive.set(this.color);
    });
  },

  methods: {
    dispose(object) {
      object.geometry.dispose();
      object.material.dispose();
    },
  },

  render: VueThree.Object3D.render,
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
| `cameraPosition` | `[Object, Array]` | `[0, 0, 0]` |
| `cameraQuaternion` | `[Object, Array]` | `[0, 0, 0, 1]` |
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

### Interactions

#### name

`vue-three-interactions`

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `hover` | `Object` | n/a |
| `press` | `Object` | n/a |
| `drag` | `Object` | n/a |
| `select` | `Object` | n/a |

```javascript
// hover
{
  distanceTolerance: 2,
  delay: 100, // mouse only
  objectFilter(object) {
    return object.name === 'horse';
  },
  interval: 200, // mouse only
  onHoverIn(hoveredObject, hoverPosition2D) {

  },
  onHoverOut(hoveredObject) {

  },
}
```

```javascript
// press
{
  distanceTolerance: 2,
  delay: 100, // touch only
  objectFilter(object) {
    return object.name === 'horse';
  },
  onPress(pressedObject, pressPosition2D) {

  },
}
```

```javascript
// drag
{
  distanceTolerance: 2,
  delay: 100,
  objectFilter(object) {
    return object.name === 'horse';
  },
  onDragStart(draggedObject, dragPosition3D, dragPosition2D) {

  },
  onDrag(draggedObject, dragPosition3D, dragPosition2D) {

  },
  onDragEnd(draggedObject, dragPosition3D, dragPosition2D) {

  },
}
```

```javascript
// select
{
  shape: 'rectangle', // or 'ellipse'
  distanceTolerance: 1,
  delay: 100,
  objectFilter(object) {
    return object.name === 'horse';
  },
  interval: 200,
  borderWidth: 1,
  borderColor: 'rgba(0,0,0,0.5)',
  backgroundColor: 'rgba(255,255,255,0.1)',
  onSelectStart(startSelectPosition2D, endSelectPosition2D) {

  },
  onSelect(selectedObjects, selectedObjectsIn, selectedObjectsOut, startSelectPosition2D, endSelectPosition2D) {

  },
  onSelectStart(selectedObjects, startSelectPosition2D, endSelectPosition2D) {

  },
}
```

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
