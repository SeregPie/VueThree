export default function(vector) {
	let x = vector.x * 2 - 1;
	let y = 1 - vector.y * 2;
	return new THREE.Vector2(x, y);
}