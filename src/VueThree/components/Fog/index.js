import VueWatchComputed from '/utils/Vue/WatchComputed';

import beforeDestroy from './beforeDestroy';
import computed from './computed';
import created from './created';
import props from './props';
import render from './render';
import watchComputed from './watchComputed';

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
