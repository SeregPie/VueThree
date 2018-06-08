export default function(createElement) {
	let canvasContainerElement = createElement(
		'div',
		{
			style: {
				position: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
			},
			ref: 'canvasContainer',
		},
		this.$slots.default,
	);
	let mainElement = createElement(
		'div',
		{
			style: {
				position: 'relative',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
			},
		},
		[canvasContainerElement],
	);
	return mainElement;
}
