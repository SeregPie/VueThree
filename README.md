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
		<vue-three-point-light :decay="4" :position="[50, 0, 0]"></vue-three-point-light>
	</vue-three-scene>
</vue-three-renderer>

```