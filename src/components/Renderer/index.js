import VueFrozenData from '/utils/Vue/FrozenData';
import VueWatchComputed from '/utils/Vue/WatchComputed';

import props from './props';
import data from './data';
import frozenData from './frozenData';
import computed from './computed';
import watchComputed from './watchComputed';
import mounted from './mounted';
import methods from './methods';
import render from './render';

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
