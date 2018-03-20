export default [
	function() {
		this.object.color.set(this.color);
	},

	function() {
		this.object.intensity = this.intensity;
	},

	function() {
		this.object.distance = this.distance;
	},

	function() {
		this.object.decay = this.decay;
	},
];
