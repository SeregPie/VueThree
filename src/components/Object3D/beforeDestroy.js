export default function() {
	this.$parent.object.remove(this.object);
	this.dispose(this.object);
}
