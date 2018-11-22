import THREE_Quaternion_setFrom from '/utils/THREE/Quaternion/setFrom';
import THREE_Vector3_setFrom from '/utils/THREE/Vector3/setFrom';

export default [
	function() {
		THREE_Vector3_setFrom(this.object.position, this.position);
	},

	function() {
		THREE_Quaternion_setFrom(this.object.quaternion, this.quaternion);
	},

	function() {
		THREE_Vector3_setFrom(this.object.scale, this.scale);
	},

	function() {
		this.object.name = this.name;
	},

	function() {
		this.object.userData = this.userData;
	},
];
