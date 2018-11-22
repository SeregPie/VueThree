let prefix = '$_frozenData_';

export default function(frozenData) {
	return {
		data() {
			let {$options} = this;
			let data = {};
			let {computed} = $options;
			Object.entries(frozenData).forEach(([key, value]) => {
				data[prefix + key] = {};
				computed[key] = {
					get() {
						this[prefix + key];
						return value;
					},
					set(newValue) {
						value = newValue;
						this[prefix + key] = {};
					},
				};
			});
			return data;
		},
		computed: {},
	};
}
