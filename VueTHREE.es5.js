(function(a,b){'object'==typeof exports&&'undefined'!=typeof module?module.exports=b(require('vue'),require('three')):'function'==typeof define&&define.amd?define(['vue','three'],b):a.VueTHREE=b(a.Vue,a.THREE)})(this,function(a,b){'use strict';function c(a){return a&&a.__esModule?a['default']:a}function d(a,b){return b={exports:{}},a(b,b.exports),b.exports}var e=Math.min;a=a&&a.hasOwnProperty('default')?a['default']:a,b=b&&b.hasOwnProperty('default')?b['default']:b;var g=function(a,b){return{value:b,done:!!a}},h={},j={}.toString,k=function(a){return j.call(a).slice(8,-1)},l=Object('z').propertyIsEnumerable(0)?Object:function(a){return'String'==k(a)?a.split(''):Object(a)},m=function(a){if(a==void 0)throw TypeError('Can\'t call method on  '+a);return a},n=function(a){return l(m(a))},o=d(function(a){var b=a.exports='undefined'!=typeof window&&window.Math==Math?window:'undefined'!=typeof self&&self.Math==Math?self:Function('return this')();'number'==typeof __g&&(__g=b)}),p=d(function(a){var b=a.exports={version:'2.5.1'};'number'==typeof __e&&(__e=b)}),q=function(a){if('function'!=typeof a)throw TypeError(a+' is not a function!');return a},r=function(d,e,a){return(q(d),void 0===e)?d:1===a?function(b){return d.call(e,b)}:2===a?function(c,a){return d.call(e,c,a)}:3===a?function(f,a,b){return d.call(e,f,a,b)}:function(){return d.apply(e,arguments)}},s=function(a){return'object'==typeof a?null!==a:'function'==typeof a},t=function(a){if(!s(a))throw TypeError(a+' is not an object!');return a},u=function(a){try{return!!a()}catch(a){return!0}},v=!u(function(){return 7!=Object.defineProperty({},'a',{get:function(){return 7}}).a}),w=o.document,x=s(w)&&s(w.createElement),y=function(a){return x?w.createElement(a):{}},z=!v&&!u(function(){return 7!=Object.defineProperty(y('div'),'a',{get:function(){return 7}}).a}),A=function(a,b){if(!s(a))return a;var c,d;if(b&&'function'==typeof(c=a.toString)&&!s(d=c.call(a)))return d;if('function'==typeof(c=a.valueOf)&&!s(d=c.call(a)))return d;if(!b&&'function'==typeof(c=a.toString)&&!s(d=c.call(a)))return d;throw TypeError('Can\'t convert object to primitive value')},B=Object.defineProperty,C=v?Object.defineProperty:function(a,b,c){if(t(a),b=A(b,!0),t(c),z)try{return B(a,b,c)}catch(a){}if('get'in c||'set'in c)throw TypeError('Accessors not supported!');return'value'in c&&(a[b]=c.value),a},D={f:C},E=function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}},F=v?function(a,b,c){return D.f(a,b,E(1,c))}:function(a,b,c){return a[b]=c,a},G='prototype',H=function(a,b,c){var d,e,f,g=a&H.F,h=a&H.G,i=a&H.S,j=a&H.P,k=a&H.B,l=a&H.W,m=h?p:p[b]||(p[b]={}),n=m[G],q=h?o:i?o[b]:(o[b]||{})[G];for(d in h&&(c=b),c)e=!g&&q&&void 0!==q[d],e&&d in m||(f=e?q[d]:c[d],m[d]=h&&'function'!=typeof q[d]?c[d]:k&&e?r(f,o):l&&q[d]==f?function(d){var a=function(e,a,b){if(this instanceof d){switch(arguments.length){case 0:return new d;case 1:return new d(e);case 2:return new d(e,a);}return new d(e,a,b)}return d.apply(this,arguments)};return a[G]=d[G],a}(f):j&&'function'==typeof f?r(Function.call,f):f,j&&((m.virtual||(m.virtual={}))[d]=f,a&H.R&&n&&!n[d]&&F(n,d,f)))};H.F=1,H.G=2,H.S=4,H.P=8,H.B=16,H.W=32,H.U=64,H.R=128;var I=H,J={}.hasOwnProperty,K=function(a,b){return J.call(a,b)},L=Math.ceil,M=Math.floor,N=function(a){return isNaN(a=+a)?0:(0<a?M:L)(a)},P=function(a){return 0<a?e(N(a),9007199254740991):0},O=Math.max,Q=function(a,b){return a=N(a),0>a?O(a+b,0):e(a,b)},R='__core-js_shared__',S=o[R]||(o[R]={}),T=function(a){return S[a]||(S[a]={})},U=0,V=Math.random(),W=function(a){return'Symbol('.concat(a===void 0?'':a,')_',(++U+V).toString(36))},X=T('keys'),Y=function(a){return X[a]||(X[a]=W(a))},Z=function(a){return function(b,c,d){var e,f=n(b),g=P(f.length),h=Q(d,g);if(a&&c!=c){for(;g>h;)if(e=f[h++],e!=e)return!0;}else for(;g>h;h++)if((a||h in f)&&f[h]===c)return a||h||0;return!a&&-1}}(!1),$=Y('IE_PROTO'),_=function(a,b){var c,d=n(a),e=0,f=[];for(c in d)c!=$&&K(d,c)&&f.push(c);for(;b.length>e;)K(d,c=b[e++])&&(~Z(f,c)||f.push(c));return f},aa=['constructor','hasOwnProperty','isPrototypeOf','propertyIsEnumerable','toLocaleString','toString','valueOf'],ba=Object.keys||function(a){return _(a,aa)},ca=v?Object.defineProperties:function(a,b){t(a);for(var c,d=ba(b),e=d.length,f=0;e>f;)D.f(a,c=d[f++],b[c]);return a},da=o.document,ea=da&&da.documentElement,fa=Y('IE_PROTO'),ga=function(){},ha='prototype',ia=function(){var a,b=y('iframe'),c=aa.length,d='<',e='>';for(b.style.display='none',ea.appendChild(b),b.src='javascript:',a=b.contentWindow.document,a.open(),a.write(d+'script'+e+'document.F=Object'+d+'/script'+e),a.close(),ia=a.F;c--;)delete ia[ha][aa[c]];return ia()},ja=Object.create||function(a,b){var c;return null===a?c=ia():(ga[ha]=t(a),c=new ga,ga[ha]=null,c[fa]=a),void 0===b?c:ca(c,b)},ka=d(function(a){var b=T('wks'),c=o.Symbol,d='function'==typeof c,e=a.exports=function(a){return b[a]||(b[a]=d&&c[a]||(d?c:W)('Symbol.'+a))};e.store=b}),la=D.f,ma=ka('toStringTag'),na=function(a,b,c){a&&!K(a=c?a:a.prototype,ma)&&la(a,ma,{configurable:!0,value:b})};var oa={};F(oa,ka('iterator'),function(){return this});var pa=function(a,b,c){a.prototype=ja(oa,{next:E(1,c)}),na(a,b+' Iterator')},qa=function(a){return Object(m(a))},ra=Y('IE_PROTO'),sa=Object.prototype,ta=Object.getPrototypeOf||function(a){return a=qa(a),K(a,ra)?a[ra]:'function'==typeof a.constructor&&a instanceof a.constructor?a.constructor.prototype:a instanceof Object?sa:null};var ua=ka('iterator'),va=!([].keys&&'next'in[].keys()),wa='keys',xa='values',ya=function(){return this},za=function(a,b,c,d,e,f,g){pa(c,b,d);var i,j,k,l=function(a){return!va&&a in p?p[a]:a===wa?function(){return new c(this,a)}:a===xa?function(){return new c(this,a)}:function(){return new c(this,a)}},m=b+' Iterator',n=e==xa,o=!1,p=a.prototype,q=p[ua]||p['@@iterator']||e&&p[e],r=q||l(e),s=e?n?l('entries'):r:void 0,t='Array'==b?p.entries||q:q;if(t&&(k=ta(t.call(new a)),k!==Object.prototype&&k.next&&(na(k,m,!0),!!0)),n&&q&&q.name!==xa&&(o=!0,r=function(){return q.call(this)}),g&&(va||o||!p[ua])&&F(p,ua,r),h[b]=r,h[m]=ya,e)if(i={values:n?r:l(xa),keys:f?r:l(wa),entries:s},g)for(j in i)j in p||F(p,j,i[j]);else I(I.P+I.F*(va||o),b,i);return i};za(Array,'Array',function(a,b){this._t=n(a),this._i=0,this._k=b},function(){var a=this._t,b=this._k,c=this._i++;return!a||c>=a.length?(this._t=void 0,g(1)):'keys'==b?g(0,c):'values'==b?g(0,a[c]):g(0,[c,a[c]])},'values');h.Arguments=h.Array;for(var Aa=ka('toStringTag'),Ba='CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList'.split(','),Ca=0;Ca<Ba.length;Ca++){var i=Ba[Ca],Da=o[i],Ea=Da&&Da.prototype;Ea&&!Ea[Aa]&&F(Ea,Aa,i),h[i]=h.Array}var Fa=function(c){return function(d,e){var f,a,b=m(d)+'',g=N(e),h=b.length;return 0>g||g>=h?c?'':void 0:(f=b.charCodeAt(g),55296>f||56319<f||g+1===h||56320>(a=b.charCodeAt(g+1))||57343<a?c?b.charAt(g):f:c?b.slice(g,g+2):(f-55296<<10)+(a-56320)+65536)}}(!0);za(String,'String',function(a){this._t=a+'',this._i=0},function(){var a,b=this._t,c=this._i;return c>=b.length?{value:void 0,done:!0}:(a=Fa(b,c),this._i+=a.length,{value:a,done:!1})});var Ga=ka('toStringTag'),Ha='Arguments'==k(function(){return arguments}()),Ia=function(a,b){try{return a[b]}catch(a){}},Ja=function(a){var b,c,d;return a===void 0?'Undefined':null===a?'Null':'string'==typeof(c=Ia(b=Object(a),Ga))?c:Ha?k(b):'Object'==(d=k(b))&&'function'==typeof b.callee?'Arguments':d},Ka=ka('iterator'),La=p.isIterable=function(a){var b=Object(a);return b[Ka]!==void 0||'@@iterator'in b||h.hasOwnProperty(Ja(b))},Ma=d(function(a){a.exports={default:La,__esModule:!0}});c(Ma);var Na=ka('iterator'),Oa=p.getIteratorMethod=function(a){if(a!=void 0)return a[Na]||a['@@iterator']||h[Ja(a)]},Pa=p.getIterator=function(a){var b=Oa(a);if('function'!=typeof b)throw TypeError(a+' is not iterable!');return t(b.call(a))},Qa=d(function(a){a.exports={default:Pa,__esModule:!0}});c(Qa);var Ra=d(function(a,b){function c(a){return a&&a.__esModule?a:{default:a}}b.__esModule=!0;var d=c(Ma),e=c(Qa);b.default=function(){function a(a,b){var c,d=[],f=!0,g=!1;try{for(var h,i=(0,e.default)(a);!(f=(h=i.next()).done)&&(d.push(h.value),!(b&&d.length===b));f=!0);}catch(a){g=!0,c=a}finally{try{!f&&i['return']&&i['return']()}finally{if(g)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if((0,d.default)(Object(b)))return a(b,c);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}()}),Sa=c(Ra),Ta={}.propertyIsEnumerable,Ua={f:Ta},Va=Ua.f,Wa=function(a){return function(b){for(var c,d=n(b),e=ba(d),f=e.length,g=0,h=[];f>g;)Va.call(d,c=e[g++])&&h.push(a?[c,d[c]]:d[c]);return h}}(!0);I(I.S,'Object',{entries:function(a){return Wa(a)}});var Xa=p.Object.entries,Ya=d(function(a){a.exports={default:Xa,__esModule:!0}}),Za=c(Ya),$a=d(function(a){var b=W('meta'),c=D.f,d=0,e=Object.isExtensible||function(){return!0},f=!u(function(){return e(Object.preventExtensions({}))}),g=function(a){c(a,b,{value:{i:'O'+ ++d,w:{}}})},h=a.exports={KEY:b,NEED:!1,fastKey:function(a,c){if(!s(a))return'symbol'==typeof a?a:('string'==typeof a?'S':'P')+a;if(!K(a,b)){if(!e(a))return'F';if(!c)return'E';g(a)}return a[b].i},getWeak:function(a,c){if(!K(a,b)){if(!e(a))return!0;if(!c)return!1;g(a)}return a[b].w},onFreeze:function(a){return f&&h.NEED&&e(a)&&!K(a,b)&&g(a),a}}}),_a=$a.onFreeze;(function(a,b){var c=(p.Object||{})[a]||Object[a],d={};d[a]=b(c),I(I.S+I.F*u(function(){c(1)}),'Object',d)})('freeze',function(a){return function(b){return a&&s(b)?a(_a(b)):b}});var ab=p.Object.freeze,bb=d(function(a){a.exports={default:ab,__esModule:!0}}),cb=c(bb),db=function(){},eb={name:'VueThreeRenderer',render:function(a){return a('div',{style:{width:'100%',height:'100%',overflow:'hidden'}},this.$slots.default)},props:{antialias:{type:Boolean,default:!0},alpha:{type:Boolean,default:!1},renderSceneInterval:{type:Number,default:1e3/60},updateContainerSizeInterval:{type:Number,default:1e3}},data:function(){return{containerWidth:0,containerHeight:0,frozen$renderer:cb({o:new b.WebGLRenderer({alpha:this.alpha,antialias:this.alpha})}),frozen$scene:{o:null},frozen$camera:{o:null}}},beforeCreate:function(){var a=this;Za({updateRendererSize:function(){this.renderer.setSize(this.containerWidth,this.containerHeight),0<this.containerWidth&&0<this.containerHeight&&this.camera&&(this.camera.aspect=this.containerWidth/this.containerHeight,this.camera.updateProjectionMatrix())}}).forEach(function(b){var c=Sa(b,2),d=c[0],e=c[1];a.$options.computed[d]=e,a.$options.watch[d]=db})},mounted:function(){this.$el.appendChild(this.renderer.domElement),this.updateContainerSizeScheduler(),this.renderSceneScheduler()},computed:{renderer:function(){return this.frozen$renderer.o},scene:{get:function(){return this.frozen$scene.o},set:function(a){return this.frozen$scene=cb({o:a})}},camera:{get:function(){return this.frozen$camera.o},set:function(a){return this.frozen$camera=cb({o:a})}},updateContainerSizeScheduler:function(){return function(){var a=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){a.updateContainerSizeScheduler()})},this.updateContainerSizeInterval),this.updateContainerSize())}},renderSceneScheduler:function(){return function(){var a=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){a.renderSceneScheduler()})},this.renderSceneInterval),this.renderScene())}}},watch:{},methods:{updateContainerSize:function(){var a=this.$el.getBoundingClientRect(),b=a.width,c=a.height;this.containerWidth=b,this.containerHeight=c},renderScene:function(){this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)}}},fb=o.isFinite;I(I.S,'Number',{isFinite:function(a){return'number'==typeof a&&fb(a)}});var gb=p.Number.isFinite,hb=d(function(a){a.exports={default:gb,__esModule:!0}}),ib=c(hb),jb=Object.getOwnPropertySymbols,kb={f:jb};var lb=Object.assign,mb=!lb||u(function(){var a={},b={},c=Symbol(),d='abcdefghijklmnopqrst';return a[c]=7,d.split('').forEach(function(a){b[a]=a}),7!=lb({},a)[c]||Object.keys(lb({},b)).join('')!=d})?function(a){for(var b=qa(a),c=arguments.length,d=1,e=kb.f,f=Ua.f;c>d;)for(var g,h=l(arguments[d++]),i=e?ba(h).concat(e(h)):ba(h),k=i.length,m=0;k>m;)f.call(h,g=i[m++])&&(b[g]=h[g]);return b}:lb;I(I.S+I.F,'Object',{assign:mb});var nb=p.Object.assign,ob=d(function(a){a.exports={default:nb,__esModule:!0}}),pb=c(ob),qb={name:'VueThreeObject',render:function(a){return a('div',this.$slots.default)},props:{position:{type:[Object,Array],default:function(){return[0,0,0]}},scale:{type:[Object,Array,Number],default:1}},THREE:{object:function(){return new b.Object3D}},data:function(){return{containerWidth:0,containerHeight:0,frozen$object:cb({o:this.$options.THREE.object.call(this)})}},beforeCreate:function(){var a=this;Za({updatePosition:function(){Array.isArray(this.position)?this.object.position.fromArray(this.position):pb(this.object.position,this.position)},updateScale:function(){Array.isArray(this.scale)?this.object.scale.fromArray(this.scale):ib(this.scale)?this.object.scale.setScalar(this.scale):pb(this.object.scale,this.scale)}}).forEach(function(b){var c=Sa(b,2),d=c[0],e=c[1];a.$options.computed[d]=e,a.$options.watch[d]=db})},mounted:function(){this.$parent.object.add(this.object)},beforeDestroy:function(){this.$parent.object.remove(this.object)},computed:{object:function(){return this.frozen$object.o},renderer:function(){return this.$parent.renderer}},watch:{}},rb={name:'VueThreeScene',render:function(a){return a('div',this.$slots.default)},data:function(){return{containerWidth:0,containerHeight:0,frozen$object:cb({o:new b.Scene})}},created:function(){this.$parent.scene=this.object},computed:{object:function(){return this.frozen$object.o},renderer:function(){return this.$parent.renderer}}},sb={name:'VueThreeFog',render:function(a){return a('div')},props:{color:{type:[Number,String],default:0},near:{type:Number,default:1},far:{type:Number,default:1e3}},data:function(){return{containerWidth:0,containerHeight:0,frozen$fog:cb({o:new b.Fog})}},mounted:function(){this.$parent.object.fog=this.fog},beforeCreate:function(){var a=this;Za({updateColor:function(){this.fog.color.set(this.color)},updateNear:function(){this.fog.near=this.near},updateFar:function(){this.fog.far=this.far}}).forEach(function(b){var c=Sa(b,2),d=c[0],e=c[1];a.$options.computed[d]=e,a.$options.watch[d]=db})},beforeDestroy:function(){this.$parent.object.fog=null},computed:{fog:function(){return this.frozen$fog.o}},watch:{}},tb={name:'VueThreePerspectiveCamera',mixins:[qb],render:qb.render,props:{fov:{type:Number,default:50},near:{type:Number,default:1/10},far:{type:Number,default:2e3}},THREE:{object:function(){return new b.PerspectiveCamera}},beforeCreate:function(){var a=this;Za({updateFov:function(){this.object.fov=this.fov},updateNear:function(){this.object.near=this.near},updateFar:function(){this.object.far=this.far}}).forEach(function(b){var c=Sa(b,2),d=c[0],e=c[1];a.$options.computed[d]=e,a.$options.watch[d]=db})},created:function(){this.$parent.$parent.camera=this.object},computed:{},watch:{}},ub={name:'VueThreeOrbitControls',render:function(a){return a('div')},props:{enabled:{type:Boolean,default:!0},minDistance:{type:Number,default:0},maxDistance:{type:Number,default:Infinity},minZoom:{type:Number,default:0},maxZoom:{type:Number,default:Infinity},minPolarAngle:{type:Number,default:0},maxPolarAngle:{type:Number,default:Math.PI},minAzimuthAngle:{type:Number,default:-Infinity},maxAzimuthAngle:{type:Number,default:Infinity},enableDamping:{type:Boolean,default:!1},dampingFactor:{type:Number,default:1/4},enableZoom:{type:Boolean,default:!0},zoomSpeed:{type:Number,default:1},enableRotate:{type:Boolean,default:!0},rotateSpeed:{type:Number,default:1},enablePan:{type:Boolean,default:!0},keyPanSpeed:{type:Number,default:7},autoRotate:{type:Boolean,default:!1},autoRotateSpeed:{type:Number,default:2},enableKeys:{type:Boolean,default:!0},updateControlsInterval:{type:Number,default:1e3/60}},data:function(){var a=this.$parent.object,c=this.$parent.renderer;return{frozen$controls:cb({o:new b.OrbitControls(a,c.domElement)})}},beforeCreate:function(){var a=this;Za({updateEnabled:function(){this.controls.enabled=this.enabled},updateMinDistance:function(){this.controls.minDistance=this.minDistance},updateMaxDistance:function(){this.controls.maxDistance=this.maxDistance},updateMinZoom:function(){this.controls.minZoom=this.minZoom},updateMaxZoom:function(){this.controls.maxZoom=this.maxZoom},updateMinPolarAngle:function(){this.controls.minPolarAngle=this.minPolarAngle},updateMaxPolarAngle:function(){this.controls.maxPolarAngle=this.maxPolarAngle},updateMinAzimuthAngle:function(){this.controls.minAzimuthAngle=this.minAzimuthAngle},updateMaxAzimuthAngle:function(){this.controls.maxAzimuthAngle=this.maxAzimuthAngle},updateEnableDamping:function(){this.controls.enableDamping=this.enableDamping},updateDampingFactor:function(){this.controls.dampingFactor=this.dampingFactor},updateEnableZoom:function(){this.controls.enableZoom=this.enableZoom},updateZoomSpeed:function(){this.controls.zoomSpeed=this.zoomSpeed},updateEnableRotate:function(){this.controls.enableRotate=this.enableRotate},updateRotateSpeed:function(){this.controls.rotateSpeed=this.rotateSpeed},updateEnablePan:function(){this.controls.enablePan=this.enablePan},updateKeyPanSpeed:function(){this.controls.keyPanSpeed=this.keyPanSpeed},updateAutoRotate:function(){this.controls.autoRotate=this.autoRotate},updateAutoRotateSpeed:function(){this.controls.autoRotateSpeed=this.autoRotateSpeed},updateEnableKeys:function(){this.controls.enableKeys=this.enableKeys}}).forEach(function(b){var c=Sa(b,2),d=c[0],e=c[1];a.$options.computed[d]=e,a.$options.watch[d]=db})},mounted:function(){this.updateControlsScheduler()},beforeDestroy:function(){this.controls.dispose()},computed:{controls:function(){return this.frozen$controls.o},updateControlsScheduler:function(){return function(){var a=this;this._isDestroyed||(setTimeout(function(){requestAnimationFrame(function(){a.updateControlsScheduler()})},this.updateControlsInterval),this.updateControls())}}},watch:{},methods:{updateControls:function(){this.controls.update()}}},vb={name:'VueThreePointLight',mixins:[qb],render:qb.render,props:{color:{type:[Number,String],default:16777215},intensity:{type:Number,default:1},distance:{type:Number,default:0},decay:{type:Number,default:1}},THREE:{object:function(){return new b.PointLight}},beforeCreate:function(){var a=this;Za({updateColor:function(){this.object.color.set(this.color)},updateIntensity:function(){this.object.intensity=this.intensity},updateDistance:function(){this.object.distance=this.distance},updateDecay:function(){this.object.decay=this.decay}}).forEach(function(b){var c=Sa(b,2),d=c[0],e=c[1];a.$options.computed[d]=e,a.$options.watch[d]=db})},computed:{},watch:{}};a.component(eb.name,eb),a.component(rb.name,rb),a.component(sb.name,sb),a.component(tb.name,tb),a.component(ub.name,ub),a.component(vb.name,vb);return{Renderer:eb,Object3D:qb,Scene:rb,Fog:sb,PerspectiveCamera:tb,OrbitControls:ub,PointLight:vb}});