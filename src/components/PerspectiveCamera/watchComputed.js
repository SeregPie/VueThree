export default [
	function() {
		this.object.fov = this.fov;
	},

	function() {
		this.object.near = this.near;
	},

	function() {
		this.object.far = this.far;
	},
];
