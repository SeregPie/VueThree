!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("three")):"function"==typeof define&&define.amd?define(["three"],t):e.VueThree=t(e.THREE)}(this,function(e){"use strict";function t(){}e=e&&e.hasOwnProperty("default")?e.default:e;var n={name:"VueThreeRenderer",props:{antialias:{type:Boolean,default:!0},alpha:{type:Boolean,default:!1},clearColor:{type:[String,Number],default:0},clearAlpha:{type:Number,default:1},preserveDrawingBuffer:{type:Boolean,default:!1},intervalBetweenRenderScene:{type:Number,default:1e3/60},intervalBetweenUpdateContainerSize:{type:Number,default:1e3}},data:function(){return{containerWidth:0,containerHeight:0,frozen$renderer:Object.freeze({o:new e.WebGLRenderer({alpha:this.alpha,antialias:this.antialias,preserveDrawingBuffer:this.preserveDrawingBuffer})}),frozen$scene:{o:null},frozen$camera:{o:null}}},computed:{renderer:function(){return this.frozen$renderer.o},scene:{get:function(){return this.frozen$scene.o},set:function(e){return this.frozen$scene=Object.freeze({o:e})}},camera:{get:function(){return this.frozen$camera.o},set:function(e){return this.frozen$camera=Object.freeze({o:e})}},startToUpdateContainerSize:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToUpdateContainerSize()})},this.intervalBetweenUpdateContainerSize),this.updateContainerSize())}},startToRenderScene:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToRenderScene()})},this.intervalBetweenRenderScene),this.renderScene())}}},watch:{},beforeCreate:function(){var e=this;Object.entries({setSize:function(){this.renderer.setSize(this.containerWidth,this.containerHeight),this.containerWidth>0&&this.containerHeight>0&&this.camera&&(this.camera.aspect=this.containerWidth/this.containerHeight,this.camera.updateProjectionMatrix())},setClearColor:function(){this.renderer.setClearColor(this.clearColor,this.clearAlpha)}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},mounted:function(){this.$refs.container.appendChild(this.renderer.domElement),this.startToUpdateContainerSize(),this.startToRenderScene()},methods:{updateContainerSize:function(){var e=this.$el.getBoundingClientRect(),t=e.width,n=e.height;this.containerWidth=t,this.containerHeight=n},renderScene:function(){this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}},render:function(e){return e("div",{style:{position:"relative",width:"100%",height:"100%"}},[e("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"},ref:"container"},this.$slots.default)])}};function o(e,t){Array.isArray(t)?e.fromArray(t):Object.assign(e,t)}function r(e,t){var n;Array.isArray(t)?e.fromArray(t):(n=t)&&"object"==typeof n?Object.assign(e,t):e.setScalar(t)}var i={name:"VueThreeObject",props:{position:{type:[Object,Array],default:function(){return[0,0,0]}},quaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},scale:{type:[Object,Array,Number],default:1},name:{type:String,default:""},userData:{default:function(){return{}}}},computed:{object:function(){return new e.Object3D},renderer:function(){return this.$parent.renderer}},watch:{object:{handler:function(e,t){t&&(this.$parent.object.remove(t),this.dispose(t)),this.$parent.object.add(e)},immediate:!0}},beforeCreate:function(){var e=this;Object.entries({setPosition:function(){r(this.object.position,this.position)},setQuaternion:function(){o(this.object.quaternion,this.quaternion)},setScale:function(){r(this.object.scale,this.scale)},setName:function(){this.object.name=this.name},setUserData:function(){this.object.userData=this.userData}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},beforeDestroy:function(){this.$parent.object.remove(this.object),this.dispose(this.object)},methods:{dispose:function(e){}},render:function(e){return e("div",this.$slots.default)}},a={name:"VueThreeScene",computed:{object:function(){return new e.Scene},renderer:function(){return this.$parent.renderer}},created:function(){this.$parent.scene=this.object},render:function(e){return e("div",this.$slots.default)}},s={name:"VueThreeFog",props:{color:{type:[Number,String],default:0},near:{type:Number,default:1},far:{type:Number,default:1e3}},computed:{fog:function(){return new e.Fog}},watch:{},mounted:function(){this.$parent.object.fog=this.fog},beforeCreate:function(){var e=this;Object.entries({setColor:function(){this.fog.color.set(this.color)},setNear:function(){this.fog.near=this.near},setFar:function(){this.fog.far=this.far}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},beforeDestroy:function(){this.$parent.object.fog=null},render:function(e){return e("div")}},c={name:"VueThreePerspectiveCamera",mixins:[i],props:{fov:{type:Number,default:50},near:{type:Number,default:.1},far:{type:Number,default:2e3}},computed:{object:function(){return new e.PerspectiveCamera}},watch:{},beforeCreate:function(){var e=this;Object.entries({setFov:function(){this.object.fov=this.fov},setNear:function(){this.object.near=this.near},setFar:function(){this.object.far=this.far}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},created:function(){this.$parent.$parent.camera=this.object},render:i.render},u={name:"VueThreeOrbitControls",props:{cameraPosition:{type:[Object,Array],default:function(){return[0,0,0]}},cameraQuaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},enabled:{type:Boolean,default:!0},minDistance:{type:Number,default:0},maxDistance:{type:Number,default:1/0},minZoom:{type:Number,default:0},maxZoom:{type:Number,default:1/0},minPolarAngle:{type:Number,default:0},maxPolarAngle:{type:Number,default:Math.PI},minAzimuthAngle:{type:Number,default:-1/0},maxAzimuthAngle:{type:Number,default:1/0},enableDamping:{type:Boolean,default:!1},dampingFactor:{type:Number,default:.25},enableZoom:{type:Boolean,default:!0},zoomSpeed:{type:Number,default:1},enableRotate:{type:Boolean,default:!0},rotateSpeed:{type:Number,default:1},enablePan:{type:Boolean,default:!0},keyPanSpeed:{type:Number,default:7},autoRotate:{type:Boolean,default:!1},autoRotateSpeed:{type:Number,default:2},enableKeys:{type:Boolean,default:!0},intervalBetweenUpdateControls:{type:Number,default:1e3/60}},data:function(){return{frozen$object:Object.freeze({o:this.createObject()}),value:Object.freeze({cameraPosition:this.cameraPosition,cameraQuaternion:this.cameraQuaternion})}},computed:{object:function(){return this.frozen$object.o},renderer:function(){return this.$parent.renderer},controls:function(){return new e.OrbitControls(this.object,this.renderer.domElement)},startToUpdateControls:function(){return function(){var e=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){e.startToUpdateControls()})},this.intervalBetweenUpdateControls),this.updateControls())}}},watch:{cameraPosition:function(e){this.value.cameraPosition!==e&&this.setObject()},cameraQuaternion:function(e){this.value.cameraQuaternion!==e&&this.setObject()},controls:{handler:function(e,t){t&&this.dispose(t)},immediate:!0},value:function(e){var t=e.cameraPosition,n=e.cameraQuaternion;this.$emit("update:cameraPosition",t),this.$emit("update:cameraQuaternion",n)}},beforeCreate:function(){var e=this;Object.entries({setEnabled:function(){this.controls.enabled=this.enabled},setMinDistance:function(){this.controls.minDistance=this.minDistance},setMaxDistance:function(){this.controls.maxDistance=this.maxDistance},setMinZoom:function(){this.controls.minZoom=this.minZoom},setMaxZoom:function(){this.controls.maxZoom=this.maxZoom},setMinPolarAngle:function(){this.controls.minPolarAngle=this.minPolarAngle},setMaxPolarAngle:function(){this.controls.maxPolarAngle=this.maxPolarAngle},setMinAzimuthAngle:function(){this.controls.minAzimuthAngle=this.minAzimuthAngle},setMaxAzimuthAngle:function(){this.controls.maxAzimuthAngle=this.maxAzimuthAngle},setEnableDamping:function(){this.controls.enableDamping=this.enableDamping},setDampingFactor:function(){this.controls.dampingFactor=this.dampingFactor},setEnableZoom:function(){this.controls.enableZoom=this.enableZoom},setZoomSpeed:function(){this.controls.zoomSpeed=this.zoomSpeed},setEnableRotate:function(){this.controls.enableRotate=this.enableRotate},setRotateSpeed:function(){this.controls.rotateSpeed=this.rotateSpeed},setEnablePan:function(){this.controls.enablePan=this.enablePan},setKeyPanSpeed:function(){this.controls.keyPanSpeed=this.keyPanSpeed},setAutoRotate:function(){this.controls.autoRotate=this.autoRotate},setAutoRotateSpeed:function(){this.controls.autoRotateSpeed=this.autoRotateSpeed},setEnableKeys:function(){this.controls.enableKeys=this.enableKeys}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},mounted:function(){this.startToUpdateControls()},beforeDestroy:function(){this.dispose(this.controls)},methods:{createObject:function(){var t=new e.PerspectiveCamera;return r(t.position,this.cameraPosition),o(t.quaternion,this.cameraQuaternion),t},setObject:function(){this.frozen$object=Object.freeze({o:this.createObject()})},dispose:function(e){e.dispose()},updateControls:function(){this.controls.update(),this.value=Object.freeze({cameraPosition:this.object.position.toArray(),cameraQuaternion:this.object.quaternion.toArray()})}},render:function(e){return e("div")}};function h(e){for(var t,n,o=[],r=arguments.length-1;r-- >0;)o[r]=arguments[r+1];return t=function(e){for(var t=[],n=arguments.length-1;n-- >0;)t[n]=arguments[n+1];var o=new Set;return e.forEach(function(e){t.every(function(t){return!t.has(e)})&&o.add(e)}),o}.apply(void 0,[new Set(e)].concat(o.map(function(e){return new Set(e)}))),n=[],t.forEach(function(e){n.push(e)}),n}function l(e){return function(){return e}}var d=l(!1),f=l(null);function m(e,t){var n=t.getBoundingClientRect(),o=new THREE.Vector2(n.left,n.top),r=new THREE.Vector2(n.width,n.height);return e.clone().sub(o).divide(r)}function p(e,t){return n=m(e,t),o=2*n.x-1,r=1-2*n.y,new THREE.Vector2(o,r);var n,o,r}var b={Renderer:n,Object3D:i,Scene:a,Fog:s,PerspectiveCamera:c,OrbitControls:u,Interactions:{name:"VueThreeInteractions",props:{hover:Object,press:Object,drag:Object,select:Object},data:function(){return{currentStrategy:null,renderClock:null}},computed:{touchStartEventListener:function(){return this.onTouchStart.bind(this)},touchMoveEventListener:function(){return this.onTouchMove.bind(this)},touchEndEventListener:function(){return this.onTouchEnd.bind(this)},mouseMoveEventListener:function(){return this.onMouseMove.bind(this)},mouseDownEventListener:function(){return this.onMouseDown.bind(this)},mouseUpEventListener:function(){return this.onMouseUp.bind(this)},renderer:function(){return this.$parent.renderer},camera:function(){return this.$parent.camera},scene:function(){return this.$parent.scene},populatedHover:function(){var e=this.hover;if(e)return Object.assign({distanceTolerance:2,delay:200,objectsFilter:d,interval:200,onHoverIn:t,onHoverOut:t},e)},populatedPress:function(){var e=this.press;if(e)return Object.assign({distanceTolerance:2,delay:200,objectFilter:d,onPress:t},e)},populatedDrag:function(){var e=this.drag;if(e)return Object.assign({distanceTolerance:2,delay:200,objectsFilter:d,onDragStart:t,onDrag:t,onDragEnd:t},e)},populatedSelect:function(){var e=this.select;if(e)return Object.assign({shape:"rectangle",distanceTolerance:1,delay:200,objectsFilter:d,interval:200,borderWidth:1,borderColor:"rgba(0,0,0,0.5)",backgroundColor:"rgba(255,255,255,0.1)",onSelectStart:t,onSelect:t,onSelectEnd:t},e)},strategy:function(){return Object.assign({render:function(e){return e("div")},onTouchStart:t,onTouchMove:t,onTouchEnd:t,onMouseMove:t,onMouseDown:t,onMouseUp:t,onTick:t,onEnd:t},this.currentStrategy||this.initialStrategy)},initialStrategy:function(){var t,n,o,r,i,a,s,c,u,l,d,p,b,v=this.renderer.domElement,y=this.populatedHover,g=this.populatedPress,w=this.populatedDrag,j=this.populatedSelect;return g||w||j?{onMouseDown:function(y){var E=this;return function(g,w,j){if(1===y.which&&y.target===v){var S,T;if(t=new e.Vector2(y.clientX,y.clientY),g)S=E.intersectPoint(t,g.objectFilter),(i=S[0])||(g=!1);if(w)T=E.intersectPoint(t,w.objectFilter),(a=T[0])?(s=a.position.clone(),j=!1):w=!1;if(g||w||j)return n=t,o=Date.now(),{onMouseMove:function(i){if(n=new e.Vector2(i.clientX,i.clientY),r=Date.now(),w&&r-o>w.delay)return n=new e.Vector2(i.clientX,i.clientY),w.onDragStart(a,n.toArray()),{onMouseMove:function(t){n=new e.Vector2(t.clientX,t.clientY),c=this.intersectPlane(s,n),w.onDrag(a,c.toArray(),n.toArray())},onMouseDown:f,onMouseUp:f,onEnd:function(){w.onDragEnd(a,c.toArray(),n.toArray())}};if(j&&r-o>j.delay){switch(n=new e.Vector2(i.clientX,i.clientY),b=r,j.shape){case"rectangle":u=this.intersectRectangle(t,n,j.objectFilter);break;case"ellipse":u=this.intersectEllipse(t,n,j.objectFilter)}return d=u,p=l=[],j.onSelectStart(t.toArray(),n.toArray()),j.onSelect(u.slice(),d.slice(),p.slice(),t.toArray(),n.toArray()),{render:function(e){var o=m(t,v),r=m(n,v),i=o.clone().min(r).clampScalar(0,1),a=o.clone().max(r).clampScalar(0,1).sub(i),s={backgroundColor:j.backgroundColor,border:j.borderWidth+"px solid "+j.borderColor,boxSizing:"border-box",height:100*a.y+"%",left:100*i.x+"%",position:"absolute",top:100*i.y+"%",width:100*a.x+"%"};return"ellipse"===j.shape&&(s.borderRadius="100%"),e("div",{style:{bottom:0,left:0,overflow:"hidden",position:"absolute",right:0,top:0}},[e("div",{style:s})])},onMouseMove:function(t){n=new e.Vector2(t.clientX,t.clientY),this.rerender()},onMouseDown:f,onMouseUp:f,onTick:function(){if((r=Date.now())-b>j.interval){switch(b=r,l=u,j.shape){case"rectangle":u=this.intersectRectangle(t,n,j.objectFilter);break;case"ellipse":u=this.intersectEllipse(t,n,j.objectFilter)}d=h(u,l),p=h(l,u),(d.length>0||p.length>0)&&j.onSelect(u.slice(),d.slice(),p.slice(),t.toArray(),n.toArray())}},onEnd:function(){j.onSelectEnd(u,t.toArray(),n.toArray())}}}return g&&n.distanceTo(t)>g.distanceTolerance&&(g=!1),w&&n.distanceTo(t)>w.distanceTolerance&&(w=!1),j&&n.distanceTo(t)>j.distanceTolerance&&(j=!1),g||w||j?void 0:null},onMouseUp:function(e){return g&&1===e.which&&this.intersectObject(n,i)&&g.onPress(i,n.toArray()),null}}}}(g,w,j)}}:y?{onMouseMove:function(t){var n=Date.now(),o=new e.Vector2(t.clientX,t.clientY),r=o;return{onMouseMove:function(t){if((r=new e.Vector2(t.clientX,t.clientY)).distanceTo(o)>y.distanceTolerance)return null},onTick:function(){if(Date.now()-n>y.delay){var t,i=0;return{onMouseMove:function(t){if((r=new e.Vector2(t.clientX,t.clientY)).distanceTo(o)>y.distanceTolerance)return null},onTick:function(){var e=Date.now();if(e-i>y.interval){i=e;var n=this.intersectPoint(r,y.objectFilter)[0];t!==n&&(t&&y.onHoverOut(t),n&&(t=n,y.onHoverIn(t,r.toArray())))}},onEnd:function(){t&&y.onHoverOut(t)}}}}}}}:void 0}},mounted:function(){window.addEventListener("touchstart",this.touchStartEventListener),window.addEventListener("touchmove",this.touchMoveEventListener),window.addEventListener("touchend",this.touchEndEventListener),window.addEventListener("mousemove",this.mouseMoveEventListener),window.addEventListener("mousedown",this.mouseDownEventListener),window.addEventListener("mouseup",this.mouseUpEventListener),this.startTicking()},beforeDestroy:function(){window.removeEventListener("touchstart",this.touchStartEventListener),window.removeEventListener("touchmove",this.touchMoveEventListener),window.removeEventListener("touchend",this.touchEndEventListener),window.removeEventListener("mousemove",this.mouseMoveEventListener),window.removeEventListener("mousedown",this.mouseDownEventListener),window.removeEventListener("mouseup",this.mouseUpEventListener)},methods:{onTouchStart:function(e){var t=this.strategy,n=t.onTouchStart.call(this,e);void 0!==n&&(t.onEnd.call(this),this.currentStrategy=n,this.onTouchStart(e))},onTouchMove:function(e){var t=this.strategy,n=t.onTouchMove.call(this,e);void 0!==n&&(t.onEnd.call(this),this.currentStrategy=n,this.onTouchMove(e))},onTouchEnd:function(e){var t=this.strategy,n=t.onTouchEnd.call(this,e);void 0!==n&&(t.onEnd.call(this),this.currentStrategy=n,this.onTouchEnd(e))},onMouseMove:function(e){var t=this.strategy,n=t.onMouseMove.call(this,e);void 0!==n&&(t.onEnd.call(this),this.currentStrategy=n,this.onMouseMove(e))},onMouseDown:function(e){var t=this.strategy,n=t.onMouseDown.call(this,e);void 0!==n&&(t.onEnd.call(this),this.currentStrategy=n,this.onMouseDown(e))},onMouseUp:function(e){var t=this.strategy,n=t.onMouseUp.call(this,e);void 0!==n&&(t.onEnd.call(this),this.currentStrategy=n,this.onMouseUp(e))},onTick:function(){var e=this.strategy,t=e.onTick.call(this);void 0!==t&&(e.onEnd.call(this),this.currentStrategy=t,this.onTick())},startTicking:function(){var e=this;this._isDestroyed||(requestAnimationFrame(function(){e.startTicking()}),this.onTick())},rerender:function(){this.renderClock={}},createRaycaster:function(t){var n=p(t,this.renderer.domElement),o=new e.Raycaster;return o.setFromCamera(n,this.camera),o},intersectPoint:function(e,t){var n=this.scene.children.filter(t);return this.intersectObjects(e,n)},intersectObjects:function(e,t){return this.createRaycaster(e).intersectObjects(t).map(function(e){return e.object})},intersectObject:function(e,t){return!!this.createRaycaster(e).intersectObject(t).length},intersectPlane:function(t,n){var o=this.createRaycaster(n),r=new e.Plane;return r.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(r.normal),t),o.ray.intersectPlane(r)},intersectRectangle:function(t,n,o){var r=this,i=p(t,this.renderer.domElement),a=p(n,this.renderer.domElement),s=i.clone().min(a),c=i.clone().max(a),u=new e.Box2(s,c);return this.scene.children.filter(o).filter(function(t){var n=t.position.clone().project(r.camera);return n=new e.Vector2(n.x,n.y),u.containsPoint(n)})},intersectEllipse:function(t,n,o){var r=this,i=p(t,this.renderer.domElement),a=p(n,this.renderer.domElement),s=i.clone().min(a),c=i.clone().max(a),u=new e.Box2(s,c);return this.scene.children.filter(o).filter(function(t){var n,o,i,a,s,c=t.position.clone().project(r.camera);return c=new e.Vector2(c.x,c.y),o=c,a=(n=u).getCenter(),s=n.getSize(i).divideScalar(2),Math.pow(o.x-a.x,2)/Math.pow(s.x,2)+Math.pow(o.y-a.y,2)/Math.pow(s.y,2)<=1})}},render:function(e){this.renderClock;return this.strategy.render(e)}},PointLight:{name:"VueThreePointLight",mixins:[i],props:{color:{type:[Number,String],default:16777215},intensity:{type:Number,default:1},distance:{type:Number,default:0},decay:{type:Number,default:1}},computed:{object:function(){return new e.PointLight}},watch:{},beforeCreate:function(){var e=this;Object.entries({setColor:function(){this.object.color.set(this.color)},setIntensity:function(){this.object.intensity=this.intensity},setDistance:function(){this.object.distance=this.distance},setDecay:function(){this.object.decay=this.decay}}).forEach(function(n){var o=n[0],r=n[1];e.$options.computed[o]=r,e.$options.watch[o]=t})},render:i.render}},v={install:function(e){this.components.forEach(function(t){e.component(t.name,t)})},components:Object.values(b)};return Object.assign(v,b),"undefined"!=typeof window&&window.Vue&&window.Vue.use(v),v});
