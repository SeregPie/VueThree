import THREE from 'three';

import Array_difference from '../helpers/Array/difference';
import Function_noop from '../helpers/Function/noop';
import Function_stubFalse from '../helpers/Function/stubFalse';

import getPercentageRelativePositionToElement from '../members/getPercentageRelativePositionToElement';

export default {
	name: 'VueThreeInteractions',

	render(createElement) {
		let renderClock = this.renderClock;
		return this.strategy.render(createElement);
	},

	props: {
		hover: Object,
		press: Object,
		drag: Object,
		select: Object,
	},

	data() {
		return {
			currentStrategy: null,
			renderClock: null,
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
			let domElement = this.renderer.domElement;
			let hover = this.hover;
			let press = this.press;
			let drag = this.drag;
			let select = this.select;

			if (press || drag || select) {
				if (press) {
					press = Object.assign({
						distanceTolerance: 2,
						delay: 100, // touch only
						objectFilter: Function_stubFalse,
						onPress: Function_noop,
					}, press);
				}
				if (drag) {
					drag = Object.assign({
						distanceTolerance: 2,
						delay: 100,
						objectsFilter: Function_stubFalse,
						onDragStart: Function_noop,
						onDrag: Function_noop,
						onDragEnd: Function_noop,
					}, drag);
				}
				select = Object.assign({
					shape: 'rectangle', // ellipse
					distanceTolerance: 1,
					delay: 100,
					objectsFilter: Function_stubFalse,
					interval: 200,
					borderWidth: 1,
					borderColor: 'rgba(0,0,0,0.5)',
					backgroundColor: 'rgba(255,255,255,0.1)',
					onSelectStart: Function_noop,
					onSelectIn: Function_noop,
					onSelectOut: Function_noop,
					onSelectEnd: Function_noop,
				}, select);
				let startPointerPosition;
				let currentPointerPosition;
				let startTime;
				let currentTime;
				let pressedObject;
				let draggedObject;
				let draggedObjectOriginalPosition;
				let draggedObjectDragPosition;
				let selectedObjects;
				let previousSelectedObjects;
				let selectedObjectsIn;
				let selectedObjectsOut;
				let previousIntersect;

				return {
					onMouseDown(event) {
						if (event.which === 1 && event.target === domElement) {
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
									if (select) {
										select = false;
									}
								} else {
									drag = false;
								}
							}
							if (press || drag || select) {
								currentPointerPosition = startPointerPosition;
								startTime = Date.now();
								return {
									onMouseMove(event) {
										currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
										currentTime = Date.now();
										if (drag) {
											if (currentTime - startTime > drag.delay) {
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
														drag.onDragEnd(draggedObject, draggedObjectDragPosition.toArray(), currentPointerPosition.toArray());
													},
													//controlsEnabled: false,
												};
											}
										}
										if (select) {
											if (currentTime - startTime > select.delay) {
												currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
												previousIntersect = currentTime;
												selectedObjects = this.intersectRectangle(startPointerPosition, currentPointerPosition, select.objectFilter);
												previousSelectedObjects = [];
												selectedObjectsIn = selectedObjects;
												selectedObjectsOut = previousSelectedObjects;
												select.onSelectStart(startPointerPosition.toArray(), currentPointerPosition.toArray());
												select.onSelect(selectedObjects.slice(), selectedObjectsIn.slice(), selectedObjectsOut.slice(), startPointerPosition.toArray(), currentPointerPosition.toArray());
												return {
													render(createElement) {
														let startPosition = getPercentageRelativePositionToElement(startPointerPosition, domElement);
														let endPosition = getPercentageRelativePositionToElement(currentPointerPosition, domElement);
														let areaPosition = startPosition.clone().min(endPosition).clampScalar(0, 1);
														let areaSize = startPosition.clone().max(endPosition).clampScalar(0, 1).sub(areaPosition);
														return (
															createElement(
																'div',
																{
																	style: {
																		position: 'absolute',
																		left: 0,
																		right: 0,
																		top: 0,
																		bottom: 0,
																		overflow: 'hidden',
																	},
																},
																[
																	createElement(
																		'div',
																		{
																			style: {
																				boxSizing: 'border-box',
																				position: 'absolute',
																				left: `${areaPosition.x * 100}%`,
																				top: `${areaPosition.y * 100}%`,
																				width: `${areaSize.x * 100}%`,
																				height: `${areaSize.y * 100}%`,
																				borderWidth: select.borderWidth,
																				borderColor: select.borderColor,
																				backgroundColor: select.backgroundColor,
																			},
																		},
																	),
																],
															)
														);
													},
													onMouseMove(event) {
														currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
														this.rerender();
													},
													onTick() {
														currentTime = Date.now();
														if (currentTime - previousIntersect > select.interval) {
															previousIntersect = currentTime;
															previousSelectedObjects = selectedObjects;
															selectedObjects = this.intersectRectangle(startPointerPosition, currentPointerPosition, select.objectFilter);
															selectedObjectsIn = Array_difference(selectedObjects, previousSelectedObjects);
															selectedObjectsOut = Array_difference(previousSelectedObjects, selectedObjects);
															if (selectedObjectsIn.length > 0 || selectedObjectsOut.length > 0) {
																select.onSelect(selectedObjects.slice(), selectedObjectsIn.slice(), selectedObjectsOut.slice(), startPointerPosition.toArray(), currentPointerPosition.toArray());
															}
														}
													},
													onEnd() {
														select.onSelectEnd(selectedObjects, startPointerPosition.toArray(), currentPointerPosition.toArray());
													},
													//controlsEnabled: false,
												};
											}
										}
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
										if (select) {
											if (currentPointerPosition.distanceTo(startPointerPosition) > select.distanceTolerance) {
												select = false;
											}
										}
										return press || drag || select;
									},
									onMouseUp(event) {
										if (press) {
											if (event.which === 1) {
												if (this.intersectObject(currentPointerPosition, pressedObject)) {
													press.onPress(pressedObject, currentPointerPosition.toArray());
												}
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
			if (hover) {
				hover = Object.assign({
					distanceTolerance: 2,
					delay: 100, // mouse only
					objectsFilter: Function_stubFalse,
					interval: 200, // mouse only
					onHoverIn: Function_noop,
					onHoverOut: Function_noop,
				}, hover);
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

		rerender() {
			this.renderClock = {};
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

		intersectRectangle(startPointerPosition, endPointerPosition, objectFilter) {
			let startRay = this.createRaycaster(startPointerPosition).ray;
			let endRay = this.createRaycaster(endPointerPosition).ray;
			let objects = this.scene.children.filter(objectFilter);
			return objects.filter(object => {
				let startPosition = startRay.closestPointToPoint(object.position);
				let endPosition = endRay.closestPointToPoint(object.position);
				let ellipseRadius = startPosition.distanceTo(endPosition) / 2;
				let ellipseOrigin = startPosition.clone().add(endPosition).divideScalar(2);
				return ellipseOrigin.distanceTo(object.position) < ellipseRadius;
			});
		},

		intersectEllipse(startPointerPosition, endPointerPosition) {
			return this.intersectRectangle(startPointerPosition, endPointerPosition, objectFilter);
		},
	},
};