import VueScheduled from 'x.vue/src/mixins/Scheduled';
import VueFrozenData from 'x.vue/src/mixins/FrozenData';
import VueWatchComputed from 'x.vue/src/mixins/WatchComputed';

import props from './props';
import data from './data';
import frozenData from './frozenData';
import computed from './computed';
import watchComputed from './watchComputed';
import mounted from './mounted';
import scheduled from './scheduled';
import render from './render';

export default {
	name: 'VueThreeRenderer',
	mixins: [
		VueFrozenData(frozenData),
		VueWatchComputed(watchComputed),
		VueScheduled(scheduled),
	],
	props,
	data,
	computed,
	mounted,
	render,
};
