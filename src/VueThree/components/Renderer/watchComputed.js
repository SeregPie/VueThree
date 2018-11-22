export default [
	function() {
		let {
			renderer,
			camera,
			elementWidth,
			elementHeight,
		} = this;

		renderer.setSize(elementWidth, elementHeight);
		if (elementWidth > 0 && elementHeight > 0) {
			if (camera) {
				camera.aspect = elementWidth / elementHeight;
				camera.updateProjectionMatrix();
			}
		}
	},

	function() {
		this.renderer.setClearColor(this.clearColor, this.clearAlpha);
	},
];
