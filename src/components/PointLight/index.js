import VueWatchComputed from 'x.vue/src/mixins/WatchComputed';

import VueThee_Object from '../Object3D';

import props from './props';
import computed from './computed';
import watchComputed from './watchComputed';

export default {
	name: 'VueThreePointLight',
	mixins: [
		VueThee_Object,
		VueWatchComputed(watchComputed),
	],
	props,
	computed,
};
