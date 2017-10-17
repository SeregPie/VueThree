import THREE from 'three';

export default {
	name: 'VueThreeScene',

	render(createElement) {
		return createElement('div', this.$slots.default);
	},

	data() {
		return {
			containerWidth: 0,
			containerHeight: 0,
			frozen$object: Object.freeze({
				o: new THREE.Scene(),
			}),
		};
	},

	created() {
		this.$parent.scene = this.object;
	},

	computed: {
		object() {
			return this.frozen$object.o;
		},

		renderer() {
			return this.$parent.renderer;
		},
	},
};