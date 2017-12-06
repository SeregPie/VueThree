import THREE from 'three';

import Function_noop from '../helpers/Function/noop';
import Function_stubFalse from '../helpers/Function/stubFalse';

import getPercentageRelativePositionToElement from '../members/getPercentageRelativePositionToElement';

export default {
	name: 'VueThreeInteractions',

	render(createElement) {
		return this.strategy.render(createElement);
	},

	props: {
		press: Object,
		drag: Object,
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
		this.startTicking();
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
			return this.onTouchStart.bind(this);
		},

		touchMoveEventListener() {
			return this.onTouchMove.bind(this);
		},

		touchEndEventListener() {
			return this.onTouchEnd.bind(this);
		},

		mouseMoveEventListener() {
			return this.onMouseMove.bind(this);
		},

		mouseDownEventListener() {
			return this.onMouseDown.bind(this);
		},

		mouseUpEventListener() {
			return this.onMouseUp.bind(this);
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
				onTouchStart: Function_stubFalse,
				onTouchMove: Function_stubFalse,
				onTouchEnd: Function_stubFalse,
				onMouseMove: Function_stubFalse,
				onMouseDown: Function_stubFalse,
				onMouseUp: Function_stubFalse,
				onTick: Function_noop,
				onEnd: Function_noop,
				//controlsEnabled: true,
			}, this.currentStrategy || this.initialStrategy);
		},

		initialStrategy() {
			let press = this.press;
			let drag = this.drag;

			if (press) {
				press = Object.assign({
					distanceTolerance: 1,
					delay: 100, // touch only
					objectFilter: Function_stubFalse,
					onPress: Function_noop,
				}, press);
			}
			if (drag) {
				drag = Object.assign({
					distanceTolerance: 1,
					delay: 100,
					objectsFilter: Function_stubFalse,
					onDragStart: Function_noop,
					onDrag: Function_noop,
					onDragEnd: Function_noop,
				}, drag);
			}
			if (drag) {
				return {
					onMouseDown(event) {
						let element = this.renderer.domElement;
						if (event.which === 1 && event.target === element) {
							let startPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
							let [object] = this.intersectPoint(startPointerPosition, drag.objectFilter);
							if (object) {
								let startThreePosition = object.position.clone();
								let startTime = Date.now();
								return {
									onMouseMove(event) {
										let currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
										if (currentPointerPosition.distanceTo(startPointerPosition) > drag.distanceTolerance) {
											return false;
										}
									},

									onTick() {
										let currentTime = Date.now();
										if (currentTime - startTime > drag.delay) {
											return {
												onMouseMove(event) {
													let currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
													let currentThreePosition = this.intersectPlane(startThreePosition, currentPointerPosition);
													drag.onDragStart(object, currentPointerPosition.toArray());
													drag.onDrag(object, currentThreePosition.toArray(), currentPointerPosition.toArray());
													return {
														onMouseMove(event) {
															let currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
															let currentThreePosition = this.intersectPlane(startThreePosition, currentPointerPosition);
															drag.onDrag(object, currentThreePosition.toArray(), currentPointerPosition.toArray());
														},

														onEnd() {
															drag.onDragEnd(object);
														},

														//controlsEnabled: false,
													};
												},

												//controlsEnabled: false,
											};
										}
									},
								};
							}
						}
					},
				};
			}
			if (press) {
				return {
					onMouseDown(event) {
						let element = this.renderer.domElement;
						if (event.which === 1 && event.target === element) {
							let startPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
							let [object] = this.intersectPoint(startPointerPosition, press.objectFilter);
							if (object) {
								let currentPointerPosition = startPointerPosition;
								return {
									onMouseMove(event) {
										currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
										if (currentPointerPosition.distanceTo(startPointerPosition) > press.distanceTolerance) {
											return false;
										}
									},

									onMouseUp(event) {
										if (event.which === 1) {
											if (this.intersectObject(currentPointerPosition, object)) {
												press.onPress(object, currentPointerPosition.toArray());
											}
										}
										return false;
									},
								};
							}
						}
					},
				};
			}
		},
	},

	watch: {
		strategy(newStrategy, oldStrategy) {
			if (oldStrategy) {
				oldStrategy.onEnd.call(this);
			}
		},
	},

	methods: {
		onTouchStart(event) {
			this.setNextStrategy(this.strategy.onTouchStart.call(this, event));
		},

		onTouchMove(event) {
			this.setNextStrategy(this.strategy.onTouchMove.call(this, event));
		},

		onTouchEnd(event) {
			this.setNextStrategy(this.strategy.onTouchEnd.call(this, event));
		},

		onMouseMove(event) {
			this.setNextStrategy(this.strategy.onMouseMove.call(this, event));
		},

		onMouseDown(event) {
			this.setNextStrategy(this.strategy.onMouseDown.call(this, event));
		},

		onMouseUp(event) {
			this.setNextStrategy(this.strategy.onMouseUp.call(this, event));
		},

		onTick() {
			this.setNextStrategy(this.strategy.onTick.call(this));
		},

		startTicking() {
			if (!this._isDestroyed) {
				requestAnimationFrame(() => {
					this.startTicking();
				});
				this.onTick();
			}
		},

		setNextStrategy(value) {
			if (value === false) {
				this.currentStrategy = null;
			} else
			if (value) {
				this.currentStrategy = value;
			}
		},

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

		intersectPlane(originalThreePosition, pointerPosition) {
			let raycaster = this.createRaycaster(pointerPosition);
			let plane = new THREE.Plane();
			plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(plane.normal), originalThreePosition);
			return raycaster.ray.intersectPlane(plane);
		},
	},
};