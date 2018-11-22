import startAnimationLoop from '/utils/startAnimationLoop';

export default function() {
	this.$refs.canvasContainer.appendChild(this.renderer.domElement);
	startAnimationLoop(() => {
		if (this._isDestroyed) {
			return false;
		}
		this.updateElementSize();
		this.renderScene();
	}, 1000);
}
