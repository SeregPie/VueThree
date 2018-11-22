import VueFrozenData from '/utils/Vue/FrozenData';
import VueWatchComputed from '/utils/Vue/WatchComputed';

import computed from './computed';
import data from './data';
import frozenData from './frozenData';
import methods from './methods';
import mounted from './mounted';
import props from './props';
import render from './render';
import watchComputed from './watchComputed';

export default {
	name: 'VueThreeRenderer',
	mixins: [
		VueFrozenData(frozenData),
		VueWatchComputed(watchComputed),
	],
	props,
	data,
	computed,
	mounted,
	methods,
	render,
};
