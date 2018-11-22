export default [
	function() {
		this.fog.color.set(this.color);
	},

	function() {
		this.fog.near = this.near;
	},

	function() {
		this.fog.far = this.far;
	},
];
