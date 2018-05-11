export default [
	{
		method() {
			this.elWidth = this.$el.offsetWidth;
			this.elHeight = this.$el.offsetHeight;
		},
		delay: 1000,
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
		delay: 1000 / 60,
	},
];
