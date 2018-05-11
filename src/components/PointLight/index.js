import VueWatchComputed from 'x.vue/src/mixins/WatchComputed';

import VueThreeObject from '../Object';

import props from './props';
import computed from './computed';
import watchComputed from './watchComputed';

export default {
	name: 'VueThreePointLight',
	mixins: [
		VueThreeObject,
		VueWatchComputed(watchComputed),
	],
	props,
	computed,
};
