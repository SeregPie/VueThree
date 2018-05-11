import VueWatchComputed from 'x.vue/src/mixins/WatchComputed';

import VueThreeObject from '../Object';

import props from './props';
import computed from './computed';
import watchComputed from './watchComputed';
import created from './created';
import beforeDestroy from './beforeDestroy';

export default {
	name: 'VueThreePerspectiveCamera',
	mixins: [
		VueThreeObject,
		VueWatchComputed(watchComputed),
	],
	props,
	computed,
	created,
	beforeDestroy,
};
