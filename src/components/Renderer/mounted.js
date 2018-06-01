export default function() {
	this.$refs.canvasContainer.appendChild(this.renderer.domElement);
	this.startElementResizeDetector();
	this.startSceneRenderer();
}
