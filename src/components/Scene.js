import {Scene as THREE_Scene} from 'three';

export default {
	name: 'VueThreeScene',

	computed: {
		object() {
			return new THREE_Scene();
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
