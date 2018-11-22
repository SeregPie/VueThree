import VueWatchComputed from '/utils/Vue/WatchComputed';

import VueThreeObject from '../Object';

import beforeDestroy from './beforeDestroy';
import computed from './computed';
import created from './created';
import props from './props';
import watchComputed from './watchComputed';

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
