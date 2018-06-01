export default function() {
	requestAnimationFrame(() => {
		if (!this._isDestroyed) {
			setTimeout(() => {
				this.startSceneRenderer();
			}, 1000);
			this.renderScene();
		}
	});
}
