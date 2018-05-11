import {WebGLRenderer} from 'three';

export default function() {
	let {
		alpha,
		antialias,
		preserveDrawingBuffer,
	} = this;

	return new WebGLRenderer({
		alpha,
		antialias,
		preserveDrawingBuffer,
	});
}
