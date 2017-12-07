import Set_difference from '../Set/difference';
import Set_toArray from '../Set/toArray';

export default function(array, ...otherArrays) {
	return Set_toArray(Set_difference(new Set(array), ...otherArrays.map(otherArray => new Set(otherArray))));
}