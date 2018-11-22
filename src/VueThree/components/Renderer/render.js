export default function(createElement) {
	return createElement(
		'div',
		{
			style: {
				height: '100%',
				overflow: 'hidden',
				position: 'relative',
				width: '100%',
			},
		},
		[createElement(
			'div',
			{
				ref: 'canvasContainer',
				style: {
					bottom: 0,
					left: 0,
					position: 'absolute',
					right: 0,
					top: 0,
				},
			},
			this.$slots.default,
		)],
	);
}
