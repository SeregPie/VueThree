import Object_isObject from '../../Object/isObject';

export default function(quaternion, value) {
	if (Array.isArray(value)) {
		quaternion.fromArray(value);
	} else
	if (Object_isObject(value)) {
		Object.assign(quaternion, value);
	}
	return quaternion;
}
