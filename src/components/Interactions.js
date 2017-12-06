import THREE from 'three';

import Function_noop from '../helpers/Function/noop';
import Function_stubFalse from '../helpers/Function/stubFalse';
import Function_stubNull from '../helpers/Function/stubNull';

import getPercentageRelativePositionToElement from '../members/getPercentageRelativePositionToElement';

let touchStartEventListener = function(event) {
	this.currentStrategy = this.strategy.onTouchStart.call(this, event);
};

let touchMoveEventListener = function(event) {
	this.currentStrategy = this.strategy.onTouchMove.call(this, event);
};

let touchEndEventListener = function(event) {
	this.currentStrategy = this.strategy.onTouchEnd.call(this, event);
};

let mouseMoveEventListener = function(event) {
	this.currentStrategy = this.strategy.onMouseMove.call(this, event);
};

let mouseDownEventListener = function(event) {
	this.currentStrategy = this.strategy.onMouseDown.call(this, event);
};

let mouseUpEventListener = function(event) {
	this.currentStrategy = this.strategy.onMouseUp.call(this, event);
};

export default {
	name: 'VueThreeInteractions',

	render(createElement) {
		return this.strategy.render(createElement);
	},

	props: {
		press: {
			type: Object,
			default() {
				return {
					distanceTolerance: 1,
					delay: 200, // touch only
					objectFilter: Function_stubFalse,
					onPress: Function_noop,
				};
			},
		},
	},

	data() {
		return {
			currentStrategy: null,
		};
	},

	mounted() {
		window.addEventListener('touchstart', this.touchStartEventListener);
		window.addEventListener('touchmove', this.touchMoveEventListener);
		window.addEventListener('touchend', this.touchEndEventListener);
		window.addEventListener('mousemove', this.mouseMoveEventListener);
		window.addEventListener('mousedown', this.mouseDownEventListener);
		window.addEventListener('mouseup', this.mouseUpEventListener);
	},

	beforeDestroy() {
		window.removeEventListener('touchstart', this.touchStartEventListener);
		window.removeEventListener('touchmove', this.touchMoveEventListener);
		window.removeEventListener('touchend', this.touchEndEventListener);
		window.removeEventListener('mousemove', this.mouseMoveEventListener);
		window.removeEventListener('mousedown', this.mouseDownEventListener);
		window.removeEventListener('mouseup', this.mouseUpEventListener);
	},

	computed: {
		touchStartEventListener() {
			return touchStartEventListener.bind(this);
		},

		touchMoveEventListener() {
			return touchMoveEventListener.bind(this);
		},

		touchEndEventListener() {
			return touchEndEventListener.bind(this);
		},

		mouseMoveEventListener() {
			return mouseMoveEventListener.bind(this);
		},

		mouseDownEventListener() {
			return mouseDownEventListener.bind(this);
		},

		mouseUpEventListener() {
			return mouseUpEventListener.bind(this);
		},

		renderer() {
			return this.$parent.renderer;
		},

		camera() {
			return this.$parent.camera;
		},

		scene() {
			return this.$parent.scene;
		},

		strategy() {
			return Object.assign({
				render(createElement) {
					return createElement('div');
				},
				onTouchStart: Function_stubNull,
				onTouchMove: Function_stubNull,
				onTouchEnd: Function_stubNull,
				onMouseMove: Function_stubNull,
				onMouseDown: Function_stubNull,
				onMouseUp: Function_stubNull,
			}, this.currentStrategy || this.initialStrategy);
		},

		initialStrategy() {
			let press = this.press;

			if (press) {
				press = Object.assign(this.$options.props.press.default(), press);
			}
			if (press) {
				return {
					onMouseDown(event) {
						let element = this.renderer.domElement;
						if (event.which === 1 && event.target === element) {
							let startPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
							let [intersectedObject] = this.intersectPoint(startPointerPosition, press.objectFilter);
							if (intersectedObject) {
								let currentPointerPosition = startPointerPosition;
								return {
									onMouseMove(event) {
										currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
										if (currentPointerPosition.distanceTo(startPointerPosition) > press.distanceTolerance) {
											return null;
										}
									},

									onMouseUp(event) {
										if (event.which === 1) {
											if (this.intersectObject(currentPointerPosition, intersectedObject)) {
												press.onPress(intersectedObject);
											}
										}
										return null;
									},
								};
							}
						}
					},
				};
			}
		},
	},

	methods: {
		createRaycaster(pointerPosition) {
			let position = getPercentageRelativePositionToElement(pointerPosition, this.renderer.domElement);
			let x = position.x * 2 - 1;
			let y = 1 - position.y * 2;
			let raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);
			return raycaster;
		},

		intersectPoint(pointerPosition, objectFilter) {
			let objects = this.scene.children.filter(objectFilter);
			return this.intersectObjects(pointerPosition, objects);
		},

		intersectObjects(pointerPosition, objects) {
			let raycaster = this.createRaycaster(pointerPosition);
			let intersects = raycaster.intersectObjects(objects);
			return intersects.map(({object}) => object);
		},

		intersectObject(pointerPosition, object) {
			let raycaster = this.createRaycaster(pointerPosition);
			let intersects = raycaster.intersectObject(object);
			return !!intersects.length;
		},
	},
};