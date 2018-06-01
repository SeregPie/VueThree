const prefix = 'frozenData_';

export default function(frozenData) {
	let options = {
		data() {
			let returns = {};
			Object.entries(frozenData).forEach(([key, value]) => {
				returns[prefix + key] = Object.freeze([value]);
			});
			return returns;
		},
		computed: {},
	};
	Object.keys(frozenData).forEach(key => {
		options.computed[key] = {
			get() {
				return this[prefix + key][0];
			},

			set(value) {
				return this[prefix + key] = Object.freeze([value]);
			},
		};
	});
	return options;
}
