export default {
	handler(newObject, oldObject) {
		if (oldObject) {
			this.$parent.object.remove(oldObject);
			this.dispose(oldObject);
		}
		if (newObject) {
			this.$parent.object.add(newObject);
		}
	},
	immediate: true,
};
