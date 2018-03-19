import {Vector2 as THREE_Vector2} from 'three';

export default function(vector) {
	let x = vector.x * 2 - 1;
	let y = 1 - vector.y * 2;
	return new THREE_Vector2(x, y);
}
