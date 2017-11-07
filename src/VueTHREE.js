import Vue from 'vue';

import Renderer from './components/Renderer';
import Object3D from './components/Object3D';
import Scene from './components/Scene';
import Fog from './components/Fog';
import PerspectiveCamera from './components/PerspectiveCamera';
import OrbitControls from './components/OrbitControls';
import PointLight from './components/PointLight';

if (typeof window !== 'undefined') {
	Vue.component(Renderer.name, Renderer);
	Vue.component(Object3D.name, Object3D);
	Vue.component(Scene.name, Scene);
	Vue.component(Fog.name, Fog);
	Vue.component(PerspectiveCamera.name, PerspectiveCamera);
	Vue.component(OrbitControls.name, OrbitControls);
	Vue.component(PointLight.name, PointLight);
}

export default {
	Renderer,
	Object3D,
	Scene,
	Fog,
	PerspectiveCamera,
	OrbitControls,
	PointLight,
};