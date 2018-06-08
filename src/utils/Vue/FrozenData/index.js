let prefix = 'frozenData_';

export default function(frozenData) {
	return {
		data() {
			let data = {};
			let computed = {};
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
			Object.assign(this.$options.computed, computed);
			return data;
		},
	};
}
