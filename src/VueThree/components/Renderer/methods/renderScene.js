export default function() {
	let {
		camera,
		renderer,
		scene,
	} = this;
	if (renderer && scene && camera) {
		renderer.render(scene, camera);
	}
}
