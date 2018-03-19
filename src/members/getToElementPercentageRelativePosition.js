import {Vector2 as THREE_Vector2} from 'three';

export default function(position, element) {
	let elementRect = element.getBoundingClientRect();
	let elementPosition = new THREE_Vector2(elementRect.left, elementRect.top);
	let elementSize = new THREE_Vector2(elementRect.width, elementRect.height);
	return position.clone().sub(elementPosition).divide(elementSize);
}
