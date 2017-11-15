import THREE from 'three';

export default {
	name: 'VueThreeScene',

	render(createElement) {
		return createElement('div', this.$slots.default);
	},

	created() {
		this.$parent.scene = this.object;
	},

	computed: {
		object() {
			return new THREE.Scene();
		},

		renderer() {
			return this.$parent.renderer;
		},
	},
};