import * as components from './components';

let VueThree = {
	install(Vue) {
		Object.values(this.components).forEach(component => {
			Vue.component(component.name, component);
		});
	},
	components,
};

Object.assign(VueThree, components);

export default VueThree;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueThree);
}
