export default function(quaternion, value) {
	if (Array.isArray(value)) {
		quaternion.fromArray(value);
	} else {
		Object.assign(quaternion, value);
	}
}
