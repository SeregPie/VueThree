import VueWatchComputed from '/utils/Vue/WatchComputed';

import props from './props';
import computed from './computed';
import watchComputed from './watchComputed';
import created from './created';
import beforeDestroy from './beforeDestroy';
import render from './render';

export default {
	name: 'VueThreeFog',
	mixins: [
		VueWatchComputed(watchComputed),
	],
	props,
	computed,
	created,
	beforeDestroy,
	render,
};
