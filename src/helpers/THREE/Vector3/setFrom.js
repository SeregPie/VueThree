import Object_isObject from '../../Object/isObject';

export default function(vector, value) {
	if (Array.isArray(value)) {
		vector.fromArray(value);
	} else
	if (Object_isObject(value)) {
		Object.assign(vector, value);
	} else {
		vector.setScalar(value);
	}
}
