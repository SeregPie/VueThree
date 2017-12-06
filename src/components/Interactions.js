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
		hover: Object,
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
			let element = this.renderer.domElement;
			let hover = this.hover;
			let press = this.press;
			let drag = this.drag;

			if (hover) {
				hover = Object.assign({
					distanceTolerance: 1,
					delay: 100, // mouse only
					objectsFilter: Function_stubFalse,
					interval: 200, // mouse only
					onHoverIn: Function_noop,
					onHoverOut: Function_noop,
				}, hover);
			}
			if (press || drag) {
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
				let startPointerPosition;
				let currentPointerPosition;
				let startTime;
				let currentTime;
				let pressedObject;
				let draggedObject;
				let draggedObjectOriginalPosition;
				let draggedObjectDragPosition;

				return {
					onMouseDown(event) {
						if (event.which === 1 && event.target === element) {
							startPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
							if (press) {
								([pressedObject] = this.intersectPoint(startPointerPosition, press.objectFilter));
								if (!pressedObject) {
									press = false;
								}
							}
							if (drag) {
								([draggedObject] = this.intersectPoint(startPointerPosition, drag.objectFilter));
								if (draggedObject) {
									draggedObjectOriginalPosition = draggedObject.position.clone();
								} else {
									drag = false;
								}
							}
							if (press || drag) {
								currentPointerPosition = startPointerPosition;
								startTime = Date.now();
								return {
									onMouseMove(event) {
										currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
										if (press) {
											if (currentPointerPosition.distanceTo(startPointerPosition) > press.distanceTolerance) {
												press = false;
											}
										}
										if (drag) {
											if (currentPointerPosition.distanceTo(startPointerPosition) > drag.distanceTolerance) {
												drag = false;
											}
										}
										return press || drag;
									},

									onMouseUp(event) {
										if (press) {
											if (event.which === 1) {
												if (this.intersectObject(currentPointerPosition, pressedObject)) {
													press.onPress(pressedObject, currentPointerPosition.toArray());
												}
											}
											return false;
										}
									},

									onTick() {
										if (drag) {
											currentTime = Date.now();
											if (currentTime - startTime > drag.delay) {
												return {
													onMouseMove(event) {
														currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
														draggedObjectDragPosition = this.intersectPlane(draggedObjectOriginalPosition, currentPointerPosition);
														drag.onDragStart(draggedObject, currentPointerPosition.toArray());
														drag.onDrag(draggedObject, draggedObjectDragPosition.toArray(), currentPointerPosition.toArray());
														return {
															onMouseMove(event) {
																currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
																draggedObjectDragPosition = this.intersectPlane(draggedObjectOriginalPosition, currentPointerPosition);
																drag.onDrag(draggedObject, draggedObjectDragPosition.toArray(), currentPointerPosition.toArray());
															},

															onEnd() {
																drag.onDragEnd(draggedObject);
															},

															//controlsEnabled: false,
														};
													},

													//controlsEnabled: false,
												};
											}
										}
									},
								};
							}
						}
					},
				};
			}
			if (hover) {
				return {
					onMouseMove(event) {
						let startTime = Date.now();
						let startPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
						let currentPointerPosition = startPointerPosition;
						return {
							onMouseMove(event) {
								currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
								if (currentPointerPosition.distanceTo(startPointerPosition) > hover.distanceTolerance) {
									return false;
								}
							},

							onTick() {
								let currentTime = Date.now();
								if (currentTime - startTime > hover.delay) {
									let hoveredObject;
									let previousIntersect = 0;
									return {
										onMouseMove(event) {
											currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
											if (currentPointerPosition.distanceTo(startPointerPosition) > hover.distanceTolerance) {
												return false;
											}
										},

										onTick() {
											let currentTime = Date.now();
											if (currentTime - previousIntersect > hover.interval) {
												previousIntersect = currentTime;
												let [object] = this.intersectPoint(currentPointerPosition, hover.objectFilter);
												if (hoveredObject !== object) {
													if (hoveredObject) {
														hover.onHoverOut(hoveredObject);
													}
													if (object) {
														hoveredObject = object;
														hover.onHoverIn(hoveredObject, currentPointerPosition.toArray());
													}
												}
											}
										},

										onEnd() {
											if (hoveredObject) {
												hover.onHoverOut(hoveredObject);
											}
										},
									};
								}
							},
						};
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