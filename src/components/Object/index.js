import VueWatchComputed from '/utils/Vue/WatchComputed';

import props from './props';
import computed from './computed';
import watchComputed from './watchComputed';
import watch from './watch';
import beforeDestroy from './beforeDestroy';
import methods from './methods';
import render from './render';

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
