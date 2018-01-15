import THREE from 'three';

export default {
	name: 'VueThreeScene',

	computed: {
		object() {
			return new THREE.Scene();
		},

		renderer() {
			return this.$parent.renderer;
		},
	},

	created() {
		this.$parent.scene = this.object;
	},

	render(createElement) {
		return createElement('div', this.$slots.default);
	},
};
