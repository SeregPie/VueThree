import Renderer from './components/Renderer';
import Object3D from './components/Object3D';
import Scene from './components/Scene';
import Fog from './components/Fog';
import PerspectiveCamera from './components/PerspectiveCamera';
import OrbitControls from './components/OrbitControls';
import Interactions from './components/Interactions';
import PointLight from './components/PointLight';

let components = {
	Renderer,
	Object3D,
	Scene,
	Fog,
	PerspectiveCamera,
	OrbitControls,
	Interactions,
	PointLight,
};

let VueThree = {
	install(Vue) {
		this.components.forEach(component => {
			Vue.component(component.name, component);
		});
	},

	components: Object.values(components),
};

Object.assign(VueThree, components);

export default VueThree;

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.use(VueThree);
}
