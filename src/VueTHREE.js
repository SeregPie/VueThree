import Vue from 'vue';

import Renderer from './components/Renderer.js';
import Object3D from './components/Object3D.js';
import Scene from './components/Scene.js';
import Fog from './components/Fog.js';
import PerspectiveCamera from './components/PerspectiveCamera.js';
import OrbitControls from './components/OrbitControls.js';
import PointLight from './components/PointLight.js';

Vue.component(Renderer.name, Renderer);
Vue.component(Object3D.name, Object3D);
Vue.component(Scene.name, Scene);
Vue.component(Fog.name, Fog);
Vue.component(PerspectiveCamera.name, PerspectiveCamera);
Vue.component(OrbitControls.name, OrbitControls);
Vue.component(PointLight.name, PointLight);

export default {
	Renderer,
	Object3D,
	Scene,
	Fog,
	PerspectiveCamera,
	OrbitControls,
	PointLight,
};