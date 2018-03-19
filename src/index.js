import VueThree from './VueThree';

export default VueThree;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueThree);
}
