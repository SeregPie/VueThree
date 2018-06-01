export default function() {
	let {
		renderer,
		scene,
		camera,
	} = this;

	if (renderer && scene && camera) {
		renderer.render(scene, camera);
	}
}
