(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?module.exports=b(require('vue'),require('three')):'function'==typeof define&&define.amd?define(['vue','three'],b):a.VueTHREE=b(a.Vue,a.THREE)})(this,function(a,b){'use strict';a=a&&a.hasOwnProperty('default')?a['default']:a,b=b&&b.hasOwnProperty('default')?b['default']:b;var c=function(){},d=function(){function a(a){this.value=a}function b(b){function c(e,f){try{var g=b[e](f),h=g.value;h instanceof a?Promise.resolve(h.value).then(function(a){c('next',a)},function(a){c('throw',a)}):d(g.done?'return':'normal',g.value)}catch(a){d('throw',a)}}function d(a,b){'return'===a?e.resolve({value:b,done:!0}):'throw'===a?e.reject(b):e.resolve({value:b,done:!1});e=e.next,e?c(e.key,e.arg):f=null}var e,f;this._invoke=function(a,b){return new Promise(function(d,g){var h={key:a,arg:b,resolve:d,reject:g,next:null};f?f=f.next=h:(e=f=h,c(a,b))})},'function'!=typeof b.return&&(this.return=void 0)}return'function'==typeof Symbol&&Symbol.asyncIterator&&(b.prototype[Symbol.asyncIterator]=function(){return this}),b.prototype.next=function(a){return this._invoke('next',a)},b.prototype.throw=function(a){return this._invoke('throw',a)},b.prototype.return=function(a){return this._invoke('return',a)},{wrap:function(a){return function(){return new b(a.apply(this,arguments))}},await:function(b){return new a(b)}}}(),e=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h['return']&&h['return']()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}(),f={name:'VueThreeRenderer',render:function(a){return a('div',{style:{position:'absolute',left:0,right:0,top:0,bottom:0,overflow:'hidden'}},this.$slots.default)},props:{antialias:{type:Boolean,default:!0},alpha:{type:Boolean,default:!1},clearColor:{type:[String,Number],default:0},clearAlpha:{type:Number,default:1},renderSceneInterval:{type:Number,default:1e3/60},updateContainerSizeInterval:{type:Number,default:1e3}},data:function(){return{containerWidth:0,containerHeight:0,frozen$renderer:Object.freeze({o:new b.WebGLRenderer({alpha:this.alpha,antialias:this.antialias})}),frozen$scene:{o:null},frozen$camera:{o:null}}},beforeCreate:function(){var a=this;Object.entries({updateRendererSize:function(){this.renderer.setSize(this.containerWidth,this.containerHeight),0<this.containerWidth&&0<this.containerHeight&&this.camera&&(this.camera.aspect=this.containerWidth/this.containerHeight,this.camera.updateProjectionMatrix())},setClearColor:function(){this.renderer.setClearColor(this.clearColor,this.clearAlpha)}}).forEach(function(b){var d=e(b,2),f=d[0],g=d[1];a.$options.computed[f]=g,a.$options.watch[f]=c})},mounted:function(){this.$el.appendChild(this.renderer.domElement),this.updateContainerSizeScheduler(),this.renderSceneScheduler()},computed:{renderer:function(){return this.frozen$renderer.o},scene:{get:function(){return this.frozen$scene.o},set:function(a){return this.frozen$scene=Object.freeze({o:a})}},camera:{get:function(){return this.frozen$camera.o},set:function(a){return this.frozen$camera=Object.freeze({o:a})}},updateContainerSizeScheduler:function(){return function(){var a=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){a.updateContainerSizeScheduler()})},this.updateContainerSizeInterval),this.updateContainerSize())}},renderSceneScheduler:function(){return function(){var a=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){a.renderSceneScheduler()})},this.renderSceneInterval),this.renderScene())}}},watch:{},methods:{updateContainerSize:function(){var a=this.$el.getBoundingClientRect(),b=a.width,c=a.height;this.containerWidth=b,this.containerHeight=c},renderScene:function(){this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}}},g=function(a,b){Array.isArray(b)?a.fromArray(b):Number.isFinite(b)?a.setScalar(b):Object.assign(a,b)},h=function(a,b){Array.isArray(b)?a.fromArray(b):Object.assign(a,b)},i={name:'VueThreeObject',render:function(a){return a('div',this.$slots.default)},props:{position:{type:[Object,Array],default:function(){return[0,0,0]}},quaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},scale:{type:[Object,Array,Number],default:1}},THREE:{object:function(){return new b.Object3D}},data:function(){return{frozen$object:Object.freeze({o:this.$options.THREE.object.call(this)})}},beforeCreate:function(){var a=this;Object.entries({updatePosition:function(){g(this.object.position,this.position)},updateQuaternion:function(){h(this.object.quaternion,this.quaternion)},updateScale:function(){g(this.object.scale,this.scale)}}).forEach(function(b){var d=e(b,2),f=d[0],g=d[1];a.$options.computed[f]=g,a.$options.watch[f]=c})},mounted:function(){this.$parent.object.add(this.object)},beforeDestroy:function(){this.$parent.object.remove(this.object)},computed:{object:function(){return this.frozen$object.o},renderer:function(){return this.$parent.renderer}},watch:{}},j={name:'VueThreeScene',render:function(a){return a('div',this.$slots.default)},data:function(){return{frozen$object:Object.freeze({o:new b.Scene})}},created:function(){this.$parent.scene=this.object},computed:{object:function(){return this.frozen$object.o},renderer:function(){return this.$parent.renderer}}},k={name:'VueThreeFog',render:function(a){return a('div')},props:{color:{type:[Number,String],default:0},near:{type:Number,default:1},far:{type:Number,default:1e3}},data:function(){return{frozen$fog:Object.freeze({o:new b.Fog})}},mounted:function(){this.$parent.object.fog=this.fog},beforeCreate:function(){var a=this;Object.entries({updateColor:function(){this.fog.color.set(this.color)},updateNear:function(){this.fog.near=this.near},updateFar:function(){this.fog.far=this.far}}).forEach(function(b){var d=e(b,2),f=d[0],g=d[1];a.$options.computed[f]=g,a.$options.watch[f]=c})},beforeDestroy:function(){this.$parent.object.fog=null},computed:{fog:function(){return this.frozen$fog.o}},watch:{}},l={name:'VueThreePerspectiveCamera',mixins:[i],render:i.render,props:{fov:{type:Number,default:50},near:{type:Number,default:1/10},far:{type:Number,default:2e3}},THREE:{object:function(){return new b.PerspectiveCamera}},beforeCreate:function(){var a=this;Object.entries({updateFov:function(){this.object.fov=this.fov},updateNear:function(){this.object.near=this.near},updateFar:function(){this.object.far=this.far}}).forEach(function(b){var d=e(b,2),f=d[0],g=d[1];a.$options.computed[f]=g,a.$options.watch[f]=c})},created:function(){this.$parent.$parent.camera=this.object},computed:{},watch:{}},m={name:'VueThreeOrbitControls',render:function(a){return a('div',{style:{position:'absolute',left:0,right:0,top:0,bottom:0,overflow:'hidden'}})},props:{position:{type:[Object,Array],default:function(){return[0,0,0]}},quaternion:{type:[Object,Array],default:function(){return[0,0,0,1]}},enabled:{type:Boolean,default:!0},minDistance:{type:Number,default:0},maxDistance:{type:Number,default:Infinity},minZoom:{type:Number,default:0},maxZoom:{type:Number,default:Infinity},minPolarAngle:{type:Number,default:0},maxPolarAngle:{type:Number,default:Math.PI},minAzimuthAngle:{type:Number,default:-Infinity},maxAzimuthAngle:{type:Number,default:Infinity},enableDamping:{type:Boolean,default:!1},dampingFactor:{type:Number,default:1/4},enableZoom:{type:Boolean,default:!0},zoomSpeed:{type:Number,default:1},enableRotate:{type:Boolean,default:!0},rotateSpeed:{type:Number,default:1},enablePan:{type:Boolean,default:!0},keyPanSpeed:{type:Number,default:7},autoRotate:{type:Boolean,default:!1},autoRotateSpeed:{type:Number,default:2},enableKeys:{type:Boolean,default:!0},updateControlsInterval:{type:Number,default:1e3/60}},data:function(){return{frozen$controls:Object.freeze({o:null})}},beforeCreate:function(){var a=this;Object.entries({updateEnabled:function(){this.controls.enabled=this.enabled},updateMinDistance:function(){this.controls.minDistance=this.minDistance},updateMaxDistance:function(){this.controls.maxDistance=this.maxDistance},updateMinZoom:function(){this.controls.minZoom=this.minZoom},updateMaxZoom:function(){this.controls.maxZoom=this.maxZoom},updateMinPolarAngle:function(){this.controls.minPolarAngle=this.minPolarAngle},updateMaxPolarAngle:function(){this.controls.maxPolarAngle=this.maxPolarAngle},updateMinAzimuthAngle:function(){this.controls.minAzimuthAngle=this.minAzimuthAngle},updateMaxAzimuthAngle:function(){this.controls.maxAzimuthAngle=this.maxAzimuthAngle},updateEnableDamping:function(){this.controls.enableDamping=this.enableDamping},updateDampingFactor:function(){this.controls.dampingFactor=this.dampingFactor},updateEnableZoom:function(){this.controls.enableZoom=this.enableZoom},updateZoomSpeed:function(){this.controls.zoomSpeed=this.zoomSpeed},updateEnableRotate:function(){this.controls.enableRotate=this.enableRotate},updateRotateSpeed:function(){this.controls.rotateSpeed=this.rotateSpeed},updateEnablePan:function(){this.controls.enablePan=this.enablePan},updateKeyPanSpeed:function(){this.controls.keyPanSpeed=this.keyPanSpeed},updateAutoRotate:function(){this.controls.autoRotate=this.autoRotate},updateAutoRotateSpeed:function(){this.controls.autoRotateSpeed=this.autoRotateSpeed},updateEnableKeys:function(){this.controls.enableKeys=this.enableKeys}}).forEach(function(b){var d=e(b,2),f=d[0],g=d[1];a.$options.computed[f]=function(){this.controls&&g.call(this)},a.$options.watch[f]=c})},mounted:function(){var a=new b.PerspectiveCamera;g(a.position,this.position),h(a.quaternion,this.quaternion),this.frozen$controls=Object.freeze({o:new b.OrbitControls(a,this.$el)}),this.updateControlsScheduler()},beforeDestroy:function(){this.controls&&this.controls.dispose()},computed:{controls:function(){return this.frozen$controls.o},updateControlsScheduler:function(){return function(){var a=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){a.updateControlsScheduler()})},this.updateControlsInterval),this.updateControls())}}},watch:{},methods:{updateControls:function(){this.controls&&(this.controls.update(),this.$emit('update:position',this.controls.object.position.toArray()),this.$emit('update:quaternion',this.controls.object.quaternion.toArray()))}}},n={name:'VueThreePointLight',mixins:[i],render:i.render,props:{color:{type:[Number,String],default:16777215},intensity:{type:Number,default:1},distance:{type:Number,default:0},decay:{type:Number,default:1}},THREE:{object:function(){return new b.PointLight}},beforeCreate:function(){var a=this;Object.entries({updateColor:function(){this.object.color.set(this.color)},updateIntensity:function(){this.object.intensity=this.intensity},updateDistance:function(){this.object.distance=this.distance},updateDecay:function(){this.object.decay=this.decay}}).forEach(function(b){var d=e(b,2),f=d[0],g=d[1];a.$options.computed[f]=g,a.$options.watch[f]=c})},computed:{},watch:{}};a.component(f.name,f),a.component(i.name,i),a.component(j.name,j),a.component(k.name,k),a.component(l.name,l),a.component(m.name,m),a.component(n.name,n);return{Renderer:f,Object3D:i,Scene:j,Fog:k,PerspectiveCamera:l,OrbitControls:m,PointLight:n}});
