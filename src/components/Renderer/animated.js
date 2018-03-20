export default [
	{
		method() {
			this.elementWidth = this.$el.offsetWidth;
			this.elementHeight = this.$el.offsetHeight;
		},
		interval: 1000,
	},
	{
		method() {
			let {
				renderer,
				scene,
				camera,
			} = this;

			if (renderer && scene && camera) {
				renderer.render(scene, camera);
			}
		},
		interval: 1000 / 60,
	},
];
