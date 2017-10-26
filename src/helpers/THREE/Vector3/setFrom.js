export default function(vector, value) {
	if (Array.isArray(value)) {
		vector.fromArray(value);
	} else
	if (Number.isFinite(value)) {
		vector.setScalar(value);
	} else {
		Object.assign(vector, value);
	}
}