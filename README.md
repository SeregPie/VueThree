# VueThree

A wrapper for THREE.

## demo

[Try it out!](https://seregpie.github.io/VueThree/)

## dependencies

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

Register the components in the scope of another component.

```javascript
import VueThree from 'vuethree';

export default {
  components: {
    [VueThree.Renderer.name]: VueThree.Renderer,
    [VueThree.Object.name]: VueThree.Object,
    [VueThree.Scene.name]: VueThree.Scene,
  },
  /*...*/
};
```

### browser

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/three"></script>
<script src="https://unpkg.com/vuethree"></script>
```

If Vue is detected, the components will be registered automatically.

## usage

```html
<vue-three-renderer clear-color="#00ff00">
  <vue-three-scene>
    <vue-three-fog color="#ff0000"/>
    <vue-three-perspective-camera
      :fov="75"
      :position="cameraPosition"
      :quaternion="cameraQuaternion"
    />
    <component
      :is="threeObject.component"
      v-for="threeObject in threeObjects"
      :key="threeObject.key"      
      v-bind="threeObject.props"
    />
    <vue-three-point-light
      :decay="2"
      :position="[50, 0, 0]"
    />
  </vue-three-scene>
</vue-three-renderer>
```

---

Create custom Vue THREE components.

```javascript
let MySphere = {
  mixins: [VueThree.Object],

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
};
```

## components

### Renderer

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `alpha` | `Boolean` | `false` |
| `antialias` | `Boolean` | `true` |
| `clear-alpha` | `Number` | `1` |
| `clear-color` | `[Number, String]` | `0x000000` |
| `preserve-drawing-buffer` | `Boolean` | `false` |

### Object

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `name` | `String` | `''` |
| `position` | `[Array, Object]` | `[0, 0, 0]` |
| `quaternion` | `[Array, Object]` | `[0, 0, 0, 1]` |
| `scale` | `[Number, Array, Object]` | `1` |
| `user-data` | `userData` | `{}` |

### Scene

### Fog

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `color` | `[Number, String]` | `0x000000` |
| `far` | `Number` | `1000` |
| `near` | `Number` | `1` |

### PerspectiveCamera

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `far` | `Number` | `2000` |
| `fov` | `Number` | `50` |
| `near` | `Number` | `1/10` |

### PointLight

#### properties

| property | type | default |
| ---: | :--- | :--- |
| `color` | `[Number, String]` | `0xffffff` |
| `decay` | `Number` | `1` |
| `distance` | `Number` | `0` |
| `intensity` | `Number` | `1` |
