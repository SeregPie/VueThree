import VueAnimated from 'x.vue/src/mixins/Animated';
import VueFrozenData from 'x.vue/src/mixins/FrozenData';
import VueWatchComputed from 'x.vue/src/mixins/WatchComputed';

import props from './props';
import data from './data';
import frozenData from './frozenData';
import computed from './computed';
import watchComputed from './watchComputed';
import mounted from './mounted';
import animated from './animated';
import render from './render';

export default {
	name: 'VueThreeRenderer',
	mixins: [
		VueFrozenData(frozenData),
		VueWatchComputed(watchComputed),
		VueAnimated(animated),
	],
	props,
	data,
	computed,
	mounted,
	render,
};
