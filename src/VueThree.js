import Renderer from './components/Renderer';
import Object3D from './components/Object3D';
import Scene from './components/Scene';
import Fog from './components/Fog';
import PerspectiveCamera from './components/PerspectiveCamera';
import OrbitControls from './components/OrbitControls';
import PointLight from './components/PointLight';

export default {
	Renderer,
	Object3D,
	Scene,
	Fog,
	PerspectiveCamera,
	OrbitControls,
	PointLight,
};

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component(Renderer.name, Renderer);
	window.Vue.component(Object3D.name, Object3D);
	window.Vue.component(Scene.name, Scene);
	window.Vue.component(Fog.name, Fog);
	window.Vue.component(PerspectiveCamera.name, PerspectiveCamera);
	window.Vue.component(OrbitControls.name, OrbitControls);
	window.Vue.component(PointLight.name, PointLight);
}