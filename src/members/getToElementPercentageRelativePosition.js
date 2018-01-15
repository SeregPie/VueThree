export default function(position, element) {
	let elementRect = element.getBoundingClientRect();
	let elementPosition = new THREE.Vector2(elementRect.left, elementRect.top);
	let elementSize = new THREE.Vector2(elementRect.width, elementRect.height);
	return position.clone().sub(elementPosition).divide(elementSize);
}
