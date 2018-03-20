import {WebGLRenderer as THREE_WebGLRenderer} from 'three';

export default function() {
	let {
		alpha,
		antialias,
		preserveDrawingBuffer,
	} = this;

	return new THREE_WebGLRenderer({
		alpha,
		antialias,
		preserveDrawingBuffer,
	});
}
