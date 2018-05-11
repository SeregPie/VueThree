export default [
	function() {
		let {
			renderer,
			camera,
			elWidth,
			elHeight,
		} = this;

		renderer.setSize(elWidth, elHeight);
		if (elWidth > 0 && elHeight > 0) {
			if (camera) {
				camera.aspect = elWidth / elHeight;
				camera.updateProjectionMatrix();
			}
		}
	},

	function() {
		this.renderer.setClearColor(this.clearColor, this.clearAlpha);
	},
];
