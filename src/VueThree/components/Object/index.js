import VueWatchComputed from '/utils/Vue/WatchComputed';

import beforeDestroy from './beforeDestroy';
import computed from './computed';
import methods from './methods';
import props from './props';
import render from './render';
import watch from './watch';
import watchComputed from './watchComputed';

export default {
	name: 'VueThreeObject',
	mixins: [
		VueWatchComputed(watchComputed),
	],
	props,
	computed,
	watch,
	beforeDestroy,
	methods,
	render,
};
