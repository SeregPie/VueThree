import getToElementPercentageRelativePosition from './getToElementPercentageRelativePosition';
import getNormalizedDeviceCoordinates from './getNormalizedDeviceCoordinates';

export default function(position, element) {
	return getNormalizedDeviceCoordinates(getToElementPercentageRelativePosition(position, element));
}
