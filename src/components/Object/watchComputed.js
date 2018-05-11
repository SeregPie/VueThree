export default [
	function() {
		this.object.position.fromArray(this.position);
	},

	function() {
		this.object.quaternion.fromArray(this.quaternion);
	},

	function() {
		this.object.scale.fromArray(this.scale);
	},

	function() {
		this.object.name = this.name;
	},

	function() {
		this.object.userData = this.userData;
	},
];
