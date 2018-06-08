export default function(watchComputed) {
	return {
		created() {
			watchComputed.forEach(func => {
				this.$watch(func);
			});
		},
	};
}
