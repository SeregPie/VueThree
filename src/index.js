import VueThree from './VueThree';

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueThree);
}

export default VueThree;
