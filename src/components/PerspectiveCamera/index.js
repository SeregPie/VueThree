import VueWatchComputed from '/utils/Vue/WatchComputed';

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
