import THREE from 'three';

import Array_difference from '../helpers/Array/difference';
import Function_noop from '../helpers/Function/noop';
import Function_stubFalse from '../helpers/Function/stubFalse';
import Function_stubNull from '../helpers/Function/stubNull';
import THREE_Ellipse_containsPoint from '../helpers/THREE/Ellipse/containsPoint';

import getToElementPercentageRelativePosition from '../members/getToElementPercentageRelativePosition';
import getRaycastableCoords from '../members/getRaycastableCoords';

export default {
	name: 'VueThreeInteractions',

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

		populatedHover() {
			let hover = this.hover;

			if (hover) {
				return Object.assign({
					distanceTolerance: 2,
					delay: 200, // mouse only
					objectsFilter: Function_stubFalse,
					interval: 200, // mouse only
					onHoverIn: Function_noop,
					onHoverOut: Function_noop,
				}, hover);
			}
		},

		populatedPress() {
			let press = this.press;

			if (press) {
				return Object.assign({
					distanceTolerance: 2,
					delay: 200, // touch only
					objectFilter: Function_stubFalse,
					onPress: Function_noop,
				}, press);
			}
		},

		populatedDrag() {
			let drag = this.drag;

			if (drag) {
				return Object.assign({
					distanceTolerance: 2,
					delay: 200,
					objectsFilter: Function_stubFalse,
					onDragStart: Function_noop,
					onDrag: Function_noop,
					onDragEnd: Function_noop,
				}, drag);
			}
		},

		populatedSelect() {
			let select = this.select;

			if (select) {
				return Object.assign({
					shape: 'rectangle', // ellipse
					distanceTolerance: 1,
					delay: 200,
					objectsFilter: Function_stubFalse,
					interval: 200,
					borderWidth: 1,
					borderColor: 'rgba(0,0,0,0.5)',
					backgroundColor: 'rgba(255,255,255,0.1)',
					onSelectStart: Function_noop,
					onSelect: Function_noop,
					onSelectEnd: Function_noop,
				}, select);
			}
		},

		strategy() {
			return Object.assign({
				render(createElement) {
					return createElement('div');
				},
				onTouchStart: Function_noop,
				onTouchMove: Function_noop,
				onTouchEnd: Function_noop,
				onMouseMove: Function_noop,
				onMouseDown: Function_noop,
				onMouseUp: Function_noop,
				onTick: Function_noop,
				onEnd: Function_noop,
				//controlsEnabled: true,
			}, this.currentStrategy || this.initialStrategy);
		},

		initialStrategy() {
			let domElement = this.renderer.domElement;
			let hover = this.populatedHover;
			let press = this.populatedPress;
			let drag = this.populatedDrag;
			let select = this.populatedSelect;

			if (press || drag || select) {
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
						return ((press, drag, select) => {
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
										select = false;
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
													drag.onDragStart(draggedObject, currentPointerPosition.toArray());
													return {
														onMouseMove(event) {
															currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
															draggedObjectDragPosition = this.intersectPlane(draggedObjectOriginalPosition, currentPointerPosition);
															drag.onDrag(draggedObject, draggedObjectDragPosition.toArray(), currentPointerPosition.toArray());
														},
														onMouseDown: Function_stubNull,
														onMouseUp: Function_stubNull,
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
													switch (select.shape) {
														case 'rectangle': {
															selectedObjects = this.intersectRectangle(startPointerPosition, currentPointerPosition, select.objectFilter);
															break;
														}
														case 'ellipse': {
															selectedObjects = this.intersectEllipse(startPointerPosition, currentPointerPosition, select.objectFilter);
															break;
														}
													}
													previousSelectedObjects = [];
													selectedObjectsIn = selectedObjects;
													selectedObjectsOut = previousSelectedObjects;
													select.onSelectStart(startPointerPosition.toArray(), currentPointerPosition.toArray());
													select.onSelect(selectedObjects.slice(), selectedObjectsIn.slice(), selectedObjectsOut.slice(), startPointerPosition.toArray(), currentPointerPosition.toArray());
													return {
														render(createElement) {
															let startPosition = getToElementPercentageRelativePosition(startPointerPosition, domElement);
															let endPosition = getToElementPercentageRelativePosition(currentPointerPosition, domElement);
															let areaPosition = startPosition.clone().min(endPosition).clampScalar(0, 1);
															let areaSize = startPosition.clone().max(endPosition).clampScalar(0, 1).sub(areaPosition);
															let areaStyle = {
																backgroundColor: select.backgroundColor,
																border: `${select.borderWidth}px solid ${select.borderColor}`,
																boxSizing: 'border-box',
																height: `${areaSize.y * 100}%`,
																left: `${areaPosition.x * 100}%`,
																position: 'absolute',
																top: `${areaPosition.y * 100}%`,
																width: `${areaSize.x * 100}%`,
															};
															if (select.shape === 'ellipse') {
																areaStyle.borderRadius = '100%';
															}
															return createElement('div', {
																style: {
																	bottom: 0,
																	left: 0,
																	overflow: 'hidden',
																	position: 'absolute',
																	right: 0,
																	top: 0,
																},
															}, [createElement('div', {style: areaStyle})]);
														},
														onMouseMove(event) {
															currentPointerPosition = new THREE.Vector2(event.clientX, event.clientY);
															this.rerender();
														},
														onMouseDown: Function_stubNull,
														onMouseUp: Function_stubNull,
														onTick() {
															currentTime = Date.now();
															if (currentTime - previousIntersect > select.interval) {
																previousIntersect = currentTime;
																previousSelectedObjects = selectedObjects;
																switch (select.shape) {
																	case 'rectangle': {
																		selectedObjects = this.intersectRectangle(startPointerPosition, currentPointerPosition, select.objectFilter);
																		break;
																	}
																	case 'ellipse': {
																		selectedObjects = this.intersectEllipse(startPointerPosition, currentPointerPosition, select.objectFilter);
																		break;
																	}
																}
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
											if (press || drag || select) {
												// pass
											} else {
												return null;
											}
										},
										onMouseUp(event) {
											if (press) {
												if (event.which === 1) {
													if (this.intersectObject(currentPointerPosition, pressedObject)) {
														press.onPress(pressedObject, currentPointerPosition.toArray());
													}
												}
											}
											return null;
										},
									};
								}
							}
						})(press, drag, select);
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
									return null;
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
												return null;
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

	methods: {
		onTouchStart(event) {
			let oldStrategy = this.strategy;
			let newStrategy = oldStrategy.onTouchStart.call(this, event);
			if (newStrategy !== undefined) {
				oldStrategy.onEnd.call(this);
				this.currentStrategy = newStrategy;
				this.onTouchStart(event);
			}
		},

		onTouchMove(event) {
			let oldStrategy = this.strategy;
			let newStrategy = oldStrategy.onTouchMove.call(this, event);
			if (newStrategy !== undefined) {
				oldStrategy.onEnd.call(this);
				this.currentStrategy = newStrategy;
				this.onTouchMove(event);
			}
		},

		onTouchEnd(event) {
			let oldStrategy = this.strategy;
			let newStrategy = oldStrategy.onTouchEnd.call(this, event);
			if (newStrategy !== undefined) {
				oldStrategy.onEnd.call(this);
				this.currentStrategy = newStrategy;
				this.onTouchEnd(event);
			}
		},

		onMouseMove(event) {
			let oldStrategy = this.strategy;
			let newStrategy = oldStrategy.onMouseMove.call(this, event);
			if (newStrategy !== undefined) {
				oldStrategy.onEnd.call(this);
				this.currentStrategy = newStrategy;
				this.onMouseMove(event);
			}
		},

		onMouseDown(event) {
			let oldStrategy = this.strategy;
			let newStrategy = oldStrategy.onMouseDown.call(this, event);
			if (newStrategy !== undefined) {
				oldStrategy.onEnd.call(this);
				this.currentStrategy = newStrategy;
				this.onMouseDown(event);
			}
		},

		onMouseUp(event) {
			let oldStrategy = this.strategy;
			let newStrategy = oldStrategy.onMouseUp.call(this, event);
			if (newStrategy !== undefined) {
				oldStrategy.onEnd.call(this);
				this.currentStrategy = newStrategy;
				this.onMouseUp(event);
			}
		},

		onTick() {
			let oldStrategy = this.strategy;
			let newStrategy = oldStrategy.onTick.call(this);
			if (newStrategy !== undefined) {
				oldStrategy.onEnd.call(this);
				this.currentStrategy = newStrategy;
				this.onTick();
			}
		},

		startTicking() {
			if (!this._isDestroyed) {
				requestAnimationFrame(() => {
					this.startTicking();
				});
				this.onTick();
			}
		},

		rerender() {
			this.renderClock = {};
		},

		createRaycaster(pointerPosition) {
			let position = getRaycastableCoords(pointerPosition, this.renderer.domElement);
			let raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(position, this.camera);
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
			let startPosition = getRaycastableCoords(startPointerPosition, this.renderer.domElement);
			let endPosition = getRaycastableCoords(endPointerPosition, this.renderer.domElement);
			let minPosition = startPosition.clone().min(endPosition);
			let maxPosition = startPosition.clone().max(endPosition);
			let rectangle = new THREE.Box2(minPosition, maxPosition);
			let objects = this.scene.children.filter(objectFilter);
			return objects.filter(object => {
				let position = object.position.clone().project(this.camera);
				position = new THREE.Vector2(position.x, position.y);
				return rectangle.containsPoint(position);
			});
		},

		intersectEllipse(startPointerPosition, endPointerPosition, objectFilter) {
			let startPosition = getRaycastableCoords(startPointerPosition, this.renderer.domElement);
			let endPosition = getRaycastableCoords(endPointerPosition, this.renderer.domElement);
			let minPosition = startPosition.clone().min(endPosition);
			let maxPosition = startPosition.clone().max(endPosition);
			let rectangle = new THREE.Box2(minPosition, maxPosition);
			let objects = this.scene.children.filter(objectFilter);
			return objects.filter(object => {
				let position = object.position.clone().project(this.camera);
				position = new THREE.Vector2(position.x, position.y);
				return THREE_Ellipse_containsPoint(rectangle, position);
			});
		},
	},

	render(createElement) {
		let renderClock = this.renderClock;
		return this.strategy.render(createElement);
	},
};
