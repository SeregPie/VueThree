!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("three")):"function"==typeof define&&define.amd?define(["three"],t):e.VueThree=t(e.THREE)}(this,function(e){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e;var t=function(){},n={name:"VueThreeRenderer",props:{antialias:{type:Boolean,default:!0},alpha:{type:Boolean,default:!1},clearColor:{type:[String,Number],default:0},clearAlpha:{type:Number,default:1},preserveDrawingBuffer:{type:Boolean,default:!1},intervalBetweenRenderScene:{type:Number,default:1e3/60},intervalBetweenUpdateContainerSize:{type:Number,default:1e3}},data:function(){return{containerWidth:0,containerHeight:0,frozen$renderer:Object.freeze({o:new e.WebGLRenderer({alpha:this.alpha,antialias:this.antialias,preserveDrawingBuffer:this.preserveDrawingBuffer})}),frozen$scene:{o:null},frozen$camera:{o:null}}},computed:{renderer:function(){return this.frozen$renderer.o},scene:{get:function(){return this.frozen$scene.o},set:function(e){return this.frozen$scene=Object.freeze({o:e})}},camera:{get:function(){return this.frozen$camera.o},set:function(e){return this.frozen$camera=Object.freeze({o:e})}},startToUpdateContainerSize:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToUpdateContainerSize()})},this.intervalBetweenUpdateContainerSize),this.updateContainerSize())}},startToRenderScene:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToRenderScene()})},this.intervalBetweenRenderScene),this.renderScene())}}},watch:{},beforeCreate:function(){var e=this;Object.entries({setSize:function(){this.renderer.setSize(this.containerWidth,this.containerHeight),this.containerWidth>0&&this.containerHeight>0&&this.camera&&(this.camera.aspect=this.containerWidth/this.containerHeight,this.camera.updateProjectionMatrix())},setClearColor:function(){this.renderer.setClearColor(this.clearColor,this.clearAlpha)}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},mounted:function(){this.$refs.container.appendChild(this.renderer.domElement),this.startToUpdateContainerSize(),this.startToRenderScene()},methods:{updateContainerSize:function(){var e=this.$el.getBoundingClientRect(),t=e.width,n=e.height;this.containerWidth=t,this.containerHeight=n},renderScene:function(){this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}},render:function(e){return e("div",{style:{position:"relative",width:"100%",height:"100%"}},[e("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"},ref:"container"},this.$slots.default)])}},o=function(e,t){Array.isArray(t)?e.fromArray(t):!function(e){return e&&"object"==typeof e}(t)?e.setScalar(t):Object.assign(e,t)},r=function(e,t){Array.isArray(t)?e.fromArray(t):Object.assign(e,t)},i={name:"VueThreeObject",props:{position:{type:[Object,Array],default:function(){return[0,0,0]}},quaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},scale:{type:[Object,Array,Number],default:1},name:{type:String,default:""},userData:{default:function(){return{}}}},computed:{object:function(){return new e.Object3D},renderer:function(){return this.$parent.renderer}},watch:{object:{handler:function(e,t){t&&(this.$parent.object.remove(t),this.dispose(t)),this.$parent.object.add(e)},immediate:!0}},beforeCreate:function(){var e=this;Object.entries({setPosition:function(){o(this.object.position,this.position)},setQuaternion:function(){r(this.object.quaternion,this.quaternion)},setScale:function(){o(this.object.scale,this.scale)},setName:function(){this.object.name=this.name},setUserData:function(){this.object.userData=this.userData}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},beforeDestroy:function(){this.$parent.object.remove(this.object),this.dispose(this.object)},methods:{dispose:function(e){}},render:function(e){return e("div",this.$slots.default)}},a={name:"VueThreeScene",computed:{object:function(){return new e.Scene},renderer:function(){return this.$parent.renderer}},created:function(){this.$parent.scene=this.object},render:function(e){return e("div",this.$slots.default)}},s={name:"VueThreeFog",props:{color:{type:[Number,String],default:0},near:{type:Number,default:1},far:{type:Number,default:1e3}},computed:{fog:function(){return new e.Fog}},watch:{},mounted:function(){this.$parent.object.fog=this.fog},beforeCreate:function(){var e=this;Object.entries({setColor:function(){this.fog.color.set(this.color)},setNear:function(){this.fog.near=this.near},setFar:function(){this.fog.far=this.far}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},beforeDestroy:function(){this.$parent.object.fog=null},render:function(e){return e("div")}},c={name:"VueThreePerspectiveCamera",mixins:[i],props:{fov:{type:Number,default:50},near:{type:Number,default:.1},far:{type:Number,default:2e3}},computed:{object:function(){return new e.PerspectiveCamera}},watch:{},beforeCreate:function(){var e=this;Object.entries({setFov:function(){this.object.fov=this.fov},setNear:function(){this.object.near=this.near},setFar:function(){this.object.far=this.far}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},created:function(){this.$parent.$parent.camera=this.object},render:i.render},u={name:"VueThreeOrbitControls",props:{cameraPosition:{type:[Object,Array],default:function(){return[0,0,0]}},cameraQuaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},enabled:{type:Boolean,default:!0},minDistance:{type:Number,default:0},maxDistance:{type:Number,default:1/0},minZoom:{type:Number,default:0},maxZoom:{type:Number,default:1/0},minPolarAngle:{type:Number,default:0},maxPolarAngle:{type:Number,default:Math.PI},minAzimuthAngle:{type:Number,default:-1/0},maxAzimuthAngle:{type:Number,default:1/0},enableDamping:{type:Boolean,default:!1},dampingFactor:{type:Number,default:.25},enableZoom:{type:Boolean,default:!0},zoomSpeed:{type:Number,default:1},enableRotate:{type:Boolean,default:!0},rotateSpeed:{type:Number,default:1},enablePan:{type:Boolean,default:!0},keyPanSpeed:{type:Number,default:7},autoRotate:{type:Boolean,default:!1},autoRotateSpeed:{type:Number,default:2},enableKeys:{type:Boolean,default:!0},intervalBetweenUpdateControls:{type:Number,default:1e3/60}},data:function(){return{frozen$object:Object.freeze({o:this.createObject()}),value:Object.freeze({cameraPosition:this.cameraPosition,cameraQuaternion:this.cameraQuaternion})}},computed:{object:function(){return this.frozen$object.o},renderer:function(){return this.$parent.renderer},controls:function(){return new e.OrbitControls(this.object,this.renderer.domElement)},startToUpdateControls:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToUpdateControls()})},this.intervalBetweenUpdateControls),this.updateControls())}}},watch:{cameraPosition:function(e){this.value.cameraPosition!==e&&this.setObject()},cameraQuaternion:function(e){this.value.cameraQuaternion!==e&&this.setObject()},controls:{handler:function(e,t){t&&this.dispose(t)},immediate:!0},value:function(e){var t=e.cameraPosition,n=e.cameraQuaternion;this.$emit("update:cameraPosition",t),this.$emit("update:cameraQuaternion",n)}},beforeCreate:function(){var e=this;Object.entries({setEnabled:function(){this.controls.enabled=this.enabled},setMinDistance:function(){this.controls.minDistance=this.minDistance},setMaxDistance:function(){this.controls.maxDistance=this.maxDistance},setMinZoom:function(){this.controls.minZoom=this.minZoom},setMaxZoom:function(){this.controls.maxZoom=this.maxZoom},setMinPolarAngle:function(){this.controls.minPolarAngle=this.minPolarAngle},setMaxPolarAngle:function(){this.controls.maxPolarAngle=this.maxPolarAngle},setMinAzimuthAngle:function(){this.controls.minAzimuthAngle=this.minAzimuthAngle},setMaxAzimuthAngle:function(){this.controls.maxAzimuthAngle=this.maxAzimuthAngle},setEnableDamping:function(){this.controls.enableDamping=this.enableDamping},setDampingFactor:function(){this.controls.dampingFactor=this.dampingFactor},setEnableZoom:function(){this.controls.enableZoom=this.enableZoom},setZoomSpeed:function(){this.controls.zoomSpeed=this.zoomSpeed},setEnableRotate:function(){this.controls.enableRotate=this.enableRotate},setRotateSpeed:function(){this.controls.rotateSpeed=this.rotateSpeed},setEnablePan:function(){this.controls.enablePan=this.enablePan},setKeyPanSpeed:function(){this.controls.keyPanSpeed=this.keyPanSpeed},setAutoRotate:function(){this.controls.autoRotate=this.autoRotate},setAutoRotateSpeed:function(){this.controls.autoRotateSpeed=this.autoRotateSpeed},setEnableKeys:function(){this.controls.enableKeys=this.enableKeys}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},mounted:function(){this.startToUpdateControls()},beforeDestroy:function(){this.dispose(this.controls)},methods:{createObject:function(){var t=new e.PerspectiveCamera;return o(t.position,this.cameraPosition),r(t.quaternion,this.cameraQuaternion),t},setObject:function(){this.frozen$object=Object.freeze({o:this.createObject()})},dispose:function(e){e.dispose()},updateControls:function(){this.controls.update(),this.value=Object.freeze({cameraPosition:this.object.position.toArray(),cameraQuaternion:this.object.quaternion.toArray()})}},render:function(e){return e("div")}},l=function(e){for(var t=[],n=arguments.length-1;n-- >0;)t[n]=arguments[n+1];return function(e){var t=[];return e.forEach(function(e){t.push(e)}),t}(function(e){for(var t=[],n=arguments.length-1;n-- >0;)t[n]=arguments[n+1];var o=new Set;return e.forEach(function(e){t.every(function(t){return!t.has(e)})&&o.add(e)}),o}.apply(void 0,[new Set(e)].concat(t.map(function(e){return new Set(e)}))))},h=function(e){return function(){return e}},d=h(!1),f=h(null),p=function(e,t){var n=t.getBoundingClientRect(),o=new THREE.Vector2(n.left,n.top),r=new THREE.Vector2(n.width,n.height);return e.clone().sub(o).divide(r)},m=function(e,t){return function(e){var t=2*e.x-1,n=1-2*e.y;return new THREE.Vector2(t,n)}(p(e,t))},b={Renderer:n,Object3D:i,Scene:a,Fog:s,PerspectiveCamera:c,OrbitControls:u,Interactions:{name:"VueThreeInteractions",props:{hover:Object,press:Object,drag:Object,select:Object},data:function(){return{currentStrategy:null,renderClock:null}},computed:{touchStartEventListener:function(){return this.onTouchStart.bind(this)},touchMoveEventListener:function(){return this.onTouchMove.bind(this)},touchEndEventListener:function(){return this.onTouchEnd.bind(this)},mouseMoveEventListener:function(){return this.onMouseMove.bind(this)},mouseDownEventListener:function(){return this.onMouseDown.bind(this)},mouseUpEventListener:function(){return this.onMouseUp.bind(this)},renderer:function(){return this.$parent.renderer},camera:function(){return this.$parent.camera},scene:function(){return this.$parent.scene},populatedHover:function(){var e=this.hover;if(e)return Object.assign({distanceTolerance:2,delay:100,objectsFilter:d,interval:200,onHoverIn:t,onHoverOut:t},e)},populatedPress:function(){var e=this.press;if(e)return Object.assign({distanceTolerance:2,delay:100,objectFilter:d,onPress:t},e)},populatedDrag:function(){var e=this.drag;if(e)return Object.assign({distanceTolerance:2,delay:100,objectsFilter:d,onDragStart:t,onDrag:t,onDragEnd:t},e)},populatedSelect:function(){var e=this.select;if(e)return Object.assign({shape:"rectangle",distanceTolerance:1,delay:100,objectsFilter:d,interval:200,borderWidth:1,borderColor:"rgba(0,0,0,0.5)",backgroundColor:"rgba(255,255,255,0.1)",onSelectStart:t,onSelect:t,onSelectEnd:t},e)},strategy:function(){return this.currentStrategy||this.getInitialStrategy()},populatedStrategy:function(){return Object.assign({render:function(e){return e("div")},onTouchStart:t,onTouchMove:t,onTouchEnd:t,onMouseMove:t,onMouseDown:t,onMouseUp:t,onTick:t,onEnd:t},this.strategy)}},watch:{strategy:function(e,t){t&&t.onEnd.call(this)}},mounted:function(){window.addEventListener("touchstart",this.touchStartEventListener),window.addEventListener("touchmove",this.touchMoveEventListener),window.addEventListener("touchend",this.touchEndEventListener),window.addEventListener("mousemove",this.mouseMoveEventListener),window.addEventListener("mousedown",this.mouseDownEventListener),window.addEventListener("mouseup",this.mouseUpEventListener),this.startTicking()},beforeDestroy:function(){window.removeEventListener("touchstart",this.touchStartEventListener),window.removeEventListener("touchmove",this.touchMoveEventListener),window.removeEventListener("touchend",this.touchEndEventListener),window.removeEventListener("mousemove",this.mouseMoveEventListener),window.removeEventListener("mousedown",this.mouseDownEventListener),window.removeEventListener("mouseup",this.mouseUpEventListener)},methods:{onTouchStart:function(e){this.setNextStrategy(this.populatedStrategy.onTouchStart.call(this,e))},onTouchMove:function(e){this.setNextStrategy(this.populatedStrategy.onTouchMove.call(this,e))},onTouchEnd:function(e){this.setNextStrategy(this.populatedStrategy.onTouchEnd.call(this,e))},onMouseMove:function(e){this.setNextStrategy(this.populatedStrategy.onMouseMove.call(this,e))},onMouseDown:function(e){this.setNextStrategy(this.populatedStrategy.onMouseDown.call(this,e))},onMouseUp:function(e){this.setNextStrategy(this.populatedStrategy.onMouseUp.call(this,e))},onTick:function(){this.setNextStrategy(this.populatedStrategy.onTick.call(this))},startTicking:function(){var e=this;this._isDestroyed||(requestAnimationFrame(function(){e.startTicking()}),this.onTick())},setNextStrategy:function(e){null===e?this.currentStrategy=this.getInitialStrategy():e&&(this.currentStrategy=e)},getInitialStrategy:function(){var t=this.renderer.domElement,n=this.populatedHover,o=this.populatedPress,r=this.populatedDrag,i=this.populatedSelect;if(o||r||i){var a,s,c,u,h,d,m,b,v,y,g,w,j;return{onMouseDown:function(n){if(1===n.which&&n.target===t){if(a=new e.Vector2(n.clientX,n.clientY),o){var S;S=this.intersectPoint(a,o.objectFilter),(h=S[0])||(o=!1)}if(r){var E;E=this.intersectPoint(a,r.objectFilter),(d=E[0])?(m=d.position.clone(),i&&(i=!1)):r=!1}return o||r||i?(s=a,c=Date.now(),{onMouseMove:function(n){if(s=new e.Vector2(n.clientX,n.clientY),u=Date.now(),r&&u-c>r.delay)return s=new e.Vector2(n.clientX,n.clientY),b=this.intersectPlane(m,s),r.onDragStart(d,s.toArray()),r.onDrag(d,b.toArray(),s.toArray()),{onMouseMove:function(t){s=new e.Vector2(t.clientX,t.clientY),b=this.intersectPlane(m,s),r.onDrag(d,b.toArray(),s.toArray())},onMouseDown:f,onMouseUp:f,onEnd:function(){r.onDragEnd(d,b.toArray(),s.toArray())}};if(i&&u-c>i.delay){switch(s=new e.Vector2(n.clientX,n.clientY),j=u,i.shape){case"rectangle":v=this.intersectRectangle(a,s,i.objectFilter);break;case"ellipse":v=this.intersectEllipse(a,s,i.objectFilter)}return y=[],g=v,w=y,i.onSelectStart(a.toArray(),s.toArray()),i.onSelect(v.slice(),g.slice(),w.slice(),a.toArray(),s.toArray()),{render:function(e){var n=p(a,t),o=p(s,t),r=n.clone().min(o).clampScalar(0,1),c=n.clone().max(o).clampScalar(0,1).sub(r),u={backgroundColor:i.backgroundColor,border:i.borderWidth+"px solid "+i.borderColor,boxSizing:"border-box",height:100*c.y+"%",left:100*r.x+"%",position:"absolute",top:100*r.y+"%",width:100*c.x+"%"};return"ellipse"===i.shape&&(u.borderRadius="100%"),e("div",{style:{bottom:0,left:0,overflow:"hidden",position:"absolute",right:0,top:0}},[e("div",{style:u})])},onMouseMove:function(t){s=new e.Vector2(t.clientX,t.clientY),this.rerender()},onMouseDown:f,onMouseUp:f,onTick:function(){if((u=Date.now())-j>i.interval){switch(j=u,y=v,i.shape){case"rectangle":v=this.intersectRectangle(a,s,i.objectFilter);break;case"ellipse":v=this.intersectEllipse(a,s,i.objectFilter)}g=l(v,y),w=l(y,v),(g.length>0||w.length>0)&&i.onSelect(v.slice(),g.slice(),w.slice(),a.toArray(),s.toArray())}},onEnd:function(){i.onSelectEnd(v,a.toArray(),s.toArray())}}}return o&&s.distanceTo(a)>o.distanceTolerance&&(o=!1),r&&s.distanceTo(a)>r.distanceTolerance&&(r=!1),i&&s.distanceTo(a)>i.distanceTolerance&&(i=!1),o||r||i?void 0:null},onMouseDown:f,onMouseUp:function(e){return o&&1===e.which&&this.intersectObject(s,h)&&o.onPress(h,s.toArray()),null}}):null}}}}if(n)return{onMouseMove:function(t){var o=Date.now(),r=new e.Vector2(t.clientX,t.clientY),i=r;return{onMouseMove:function(t){if((i=new e.Vector2(t.clientX,t.clientY)).distanceTo(r)>n.distanceTolerance)return null},onTick:function(){if(Date.now()-o>n.delay){var t,a=0;return{onMouseMove:function(t){if((i=new e.Vector2(t.clientX,t.clientY)).distanceTo(r)>n.distanceTolerance)return null},onTick:function(){var e=Date.now();if(e-a>n.interval){a=e;var o=this.intersectPoint(i,n.objectFilter)[0];t!==o&&(t&&n.onHoverOut(t),o&&(t=o,n.onHoverIn(t,i.toArray())))}},onEnd:function(){t&&n.onHoverOut(t)}}}}}}}},rerender:function(){this.renderClock={}},createRaycaster:function(t){var n=m(t,this.renderer.domElement),o=new e.Raycaster;return o.setFromCamera(n,this.camera),o},intersectPoint:function(e,t){var n=this.scene.children.filter(t);return this.intersectObjects(e,n)},intersectObjects:function(e,t){return this.createRaycaster(e).intersectObjects(t).map(function(e){return e.object})},intersectObject:function(e,t){return!!this.createRaycaster(e).intersectObject(t).length},intersectPlane:function(t,n){var o=this.createRaycaster(n),r=new e.Plane;return r.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(r.normal),t),o.ray.intersectPlane(r)},intersectRectangle:function(t,n,o){var r=this,i=m(t,this.renderer.domElement),a=m(n,this.renderer.domElement),s=i.clone().min(a),c=i.clone().max(a),u=new e.Box2(s,c);return this.scene.children.filter(o).filter(function(t){var n=t.position.clone().project(r.camera);return n=new e.Vector2(n.x,n.y),u.containsPoint(n)})},intersectEllipse:function(t,n,o){var r=this,i=m(t,this.renderer.domElement),a=m(n,this.renderer.domElement),s=i.clone().min(a),c=i.clone().max(a),u=new e.Box2(s,c);return this.scene.children.filter(o).filter(function(t){var n=t.position.clone().project(r.camera);return n=new e.Vector2(n.x,n.y),function(e,t){var n=e.getCenter(),o=function(t,n){return e.getSize(n).divideScalar(2)}();return Math.pow(t.x-n.x,2)/Math.pow(o.x,2)+Math.pow(t.y-n.y,2)/Math.pow(o.y,2)<=1}(u,n)})}},render:function(e){this.renderClock;return this.populatedStrategy.render(e)}},PointLight:{name:"VueThreePointLight",mixins:[i],props:{color:{type:[Number,String],default:16777215},intensity:{type:Number,default:1},distance:{type:Number,default:0},decay:{type:Number,default:1}},computed:{object:function(){return new e.PointLight}},watch:{},beforeCreate:function(){var e=this;Object.entries({setColor:function(){this.object.color.set(this.color)},setIntensity:function(){this.object.intensity=this.intensity},setDistance:function(){this.object.distance=this.distance},setDecay:function(){this.object.decay=this.decay}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},render:i.render}},v={install:function(e){this.components.forEach(function(t){e.component(t.name,t)})},components:Object.values(b)};return Object.assign(v,b),"undefined"!=typeof window&&window.Vue&&window.Vue.use(v),v});
