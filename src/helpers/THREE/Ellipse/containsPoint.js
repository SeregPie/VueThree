import THREE_Ellipse_getRadius from './getRadius';

export default function(rectangle, point) {
	let ellipseCenter = rectangle.getCenter();
	let ellipseRadius = THREE_Ellipse_getRadius(rectangle);
	return (Math.pow(point.x - ellipseCenter.x, 2) / Math.pow(ellipseRadius.x, 2)) + (Math.pow(point.y - ellipseCenter.y, 2) / Math.pow(ellipseRadius.y, 2)) <= 1;
}