import Number_isNumber from '../../Number/isNumber';
import Object_isObject from '../../Object/isObject';

export default function(vector, value) {
	if (Array.isArray(value)) {
		vector.fromArray(value);
	} else
	if (Object_isObject(value)) {
		Object.assign(vector, value);
	} else
	if (Number_isNumber(value)) {
		vector.setScalar(value);
	}
	return vector;
}
