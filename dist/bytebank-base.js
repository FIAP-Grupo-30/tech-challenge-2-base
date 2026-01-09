var In=Object.defineProperty;var kn=(e,t,n)=>t in e?In(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var J=(e,t,n)=>kn(e,typeof t!="symbol"?t+"":t,n);import{jsx as g,jsxs as N}from"react/jsx-runtime";import*as f from"react";import He,{useState as X,useEffect as ne}from"react";import*as Pn from"react-dom";import Rn from"single-spa-react";var Ut={exports:{}},Ft={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var le=He;function An(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Mn=typeof Object.is=="function"?Object.is:An,Nn=le.useSyncExternalStore,Tn=le.useRef,Ln=le.useEffect,On=le.useMemo,Dn=le.useDebugValue;Ft.useSyncExternalStoreWithSelector=function(e,t,n,r,a){var i=Tn(null);if(i.current===null){var o={hasValue:!1,value:null};i.current=o}else o=i.current;i=On(function(){function s(m){if(!d){if(d=!0,c=m,m=r(m),a!==void 0&&o.hasValue){var y=o.value;if(a(y,m))return u=y}return u=m}if(y=u,Mn(c,m))return y;var v=r(m);return a!==void 0&&a(y,v)?(c=m,y):(c=m,u=v)}var d=!1,c,u,p=n===void 0?null:n;return[function(){return s(t())},p===null?void 0:function(){return s(p())}]},[t,n,r,a]);var l=Nn(e,i[0],i[1]);return Ln(function(){o.hasValue=!0,o.value=l},[l]),Dn(l),l};Ut.exports=Ft;var Bn=Ut.exports;function jn(e){e()}function zn(){let e=null,t=null;return{clear(){e=null,t=null},notify(){jn(()=>{let n=e;for(;n;)n.callback(),n=n.next})},get(){const n=[];let r=e;for(;r;)n.push(r),r=r.next;return n},subscribe(n){let r=!0;const a=t={callback:n,next:null,prev:t};return a.prev?a.prev.next=a:e=a,function(){!r||e===null||(r=!1,a.next?a.next.prev=a.prev:t=a.prev,a.prev?a.prev.next=a.next:e=a.next)}}}}var gt={notify(){},get:()=>[]};function Un(e,t){let n,r=gt,a=0,i=!1;function o(v){c();const h=r.subscribe(v);let b=!1;return()=>{b||(b=!0,h(),u())}}function l(){r.notify()}function s(){y.onStateChange&&y.onStateChange()}function d(){return i}function c(){a++,n||(n=e.subscribe(s),r=zn())}function u(){a--,n&&a===0&&(n(),n=void 0,r.clear(),r=gt)}function p(){i||(i=!0,c())}function m(){i&&(i=!1,u())}const y={addNestedSub:o,notifyNestedSubs:l,handleChangeWrapper:s,isSubscribed:d,trySubscribe:p,tryUnsubscribe:m,getListeners:()=>r};return y}var Fn=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",$n=Fn(),Zn=()=>typeof navigator<"u"&&navigator.product==="ReactNative",Wn=Zn(),Vn=()=>$n||Wn?f.useLayoutEffect:f.useEffect,Gn=Vn(),Oe=Symbol.for("react-redux-context"),De=typeof globalThis<"u"?globalThis:{};function Hn(){if(!f.createContext)return{};const e=De[Oe]??(De[Oe]=new Map);let t=e.get(f.createContext);return t||(t=f.createContext(null),e.set(f.createContext,t)),t}var F=Hn();function qn(e){const{children:t,context:n,serverState:r,store:a}=e,i=f.useMemo(()=>{const s=Un(a);return{store:a,subscription:s,getServerState:r?()=>r:void 0}},[a,r]),o=f.useMemo(()=>a.getState(),[a]);Gn(()=>{const{subscription:s}=i;return s.onStateChange=s.notifyNestedSubs,s.trySubscribe(),o!==a.getState()&&s.notifyNestedSubs(),()=>{s.tryUnsubscribe(),s.onStateChange=void 0}},[i,o]);const l=n||F;return f.createElement(l.Provider,{value:i},t)}var Yn=qn;function it(e=F){return function(){return f.useContext(e)}}var $t=it();function Zt(e=F){const t=e===F?$t:it(e),n=()=>{const{store:r}=t();return r};return Object.assign(n,{withTypes:()=>n}),n}var Jn=Zt();function Qn(e=F){const t=e===F?Jn:Zt(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var Wt=Qn(),Kn=(e,t)=>e===t;function Xn(e=F){const t=e===F?$t:it(e),n=(r,a={})=>{const{equalityFn:i=Kn}=typeof a=="function"?{equalityFn:a}:a,o=t(),{store:l,subscription:s,getServerState:d}=o;f.useRef(!0);const c=f.useCallback({[r.name](p){return r(p)}}[r.name],[r]),u=Bn.useSyncExternalStoreWithSelector(s.addNestedSub,l.getState,d||l.getState,c,i);return f.useDebugValue(u),u};return Object.assign(n,{withTypes:()=>n}),n}var be=Xn();function P(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var er=typeof Symbol=="function"&&Symbol.observable||"@@observable",yt=er,Be=()=>Math.random().toString(36).substring(7).split("").join("."),tr={INIT:`@@redux/INIT${Be()}`,REPLACE:`@@redux/REPLACE${Be()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${Be()}`},we=tr;function ot(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Vt(e,t,n){if(typeof e!="function")throw new Error(P(2));if(typeof t=="function"&&typeof n=="function"||typeof n=="function"&&typeof arguments[3]=="function")throw new Error(P(0));if(typeof t=="function"&&typeof n>"u"&&(n=t,t=void 0),typeof n<"u"){if(typeof n!="function")throw new Error(P(1));return n(Vt)(e,t)}let r=e,a=t,i=new Map,o=i,l=0,s=!1;function d(){o===i&&(o=new Map,i.forEach((h,b)=>{o.set(b,h)}))}function c(){if(s)throw new Error(P(3));return a}function u(h){if(typeof h!="function")throw new Error(P(4));if(s)throw new Error(P(5));let b=!0;d();const C=l++;return o.set(C,h),function(){if(b){if(s)throw new Error(P(6));b=!1,d(),o.delete(C),i=null}}}function p(h){if(!ot(h))throw new Error(P(7));if(typeof h.type>"u")throw new Error(P(8));if(typeof h.type!="string")throw new Error(P(17));if(s)throw new Error(P(9));try{s=!0,a=r(a,h)}finally{s=!1}return(i=o).forEach(C=>{C()}),h}function m(h){if(typeof h!="function")throw new Error(P(10));r=h,p({type:we.REPLACE})}function y(){const h=u;return{subscribe(b){if(typeof b!="object"||b===null)throw new Error(P(11));function C(){const w=b;w.next&&w.next(c())}return C(),{unsubscribe:h(C)}},[yt](){return this}}}return p({type:we.INIT}),{dispatch:p,subscribe:u,getState:c,replaceReducer:m,[yt]:y}}function nr(e){Object.keys(e).forEach(t=>{const n=e[t];if(typeof n(void 0,{type:we.INIT})>"u")throw new Error(P(12));if(typeof n(void 0,{type:we.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(P(13))})}function Gt(e){const t=Object.keys(e),n={};for(let i=0;i<t.length;i++){const o=t[i];typeof e[o]=="function"&&(n[o]=e[o])}const r=Object.keys(n);let a;try{nr(n)}catch(i){a=i}return function(o={},l){if(a)throw a;let s=!1;const d={};for(let c=0;c<r.length;c++){const u=r[c],p=n[u],m=o[u],y=p(m,l);if(typeof y>"u")throw l&&l.type,new Error(P(14));d[u]=y,s=s||y!==m}return s=s||r.length!==Object.keys(o).length,s?d:o}}function xe(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,n)=>(...r)=>t(n(...r)))}function rr(...e){return t=>(n,r)=>{const a=t(n,r);let i=()=>{throw new Error(P(15))};const o={getState:a.getState,dispatch:(s,...d)=>i(s,...d)},l=e.map(s=>s(o));return i=xe(...l)(a.dispatch),{...a,dispatch:i}}}function ar(e){return ot(e)&&"type"in e&&typeof e.type=="string"}var Ht=Symbol.for("immer-nothing"),vt=Symbol.for("immer-draftable"),R=Symbol.for("immer-state");function T(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var A=Object,H=A.getPrototypeOf,Ce="constructor",Ie="prototype",qe="configurable",Se="enumerable",me="writable",re="value",j=e=>!!e&&!!e[R];function O(e){var t;return e?qt(e)||ke(e)||!!e[vt]||!!((t=e[Ce])!=null&&t[vt])||Pe(e)||Re(e):!1}var ir=A[Ie][Ce].toString(),bt=new WeakMap;function qt(e){if(!e||!st(e))return!1;const t=H(e);if(t===null||t===A[Ie])return!0;const n=A.hasOwnProperty.call(t,Ce)&&t[Ce];if(n===Object)return!0;if(!G(n))return!1;let r=bt.get(n);return r===void 0&&(r=Function.toString.call(n),bt.set(n,r)),r===ir}function ce(e,t,n=!0){ue(e)===0?(n?Reflect.ownKeys(e):A.keys(e)).forEach(a=>{t(a,e[a],e)}):e.forEach((r,a)=>t(a,r,e))}function ue(e){const t=e[R];return t?t.type_:ke(e)?1:Pe(e)?2:Re(e)?3:0}var wt=(e,t,n=ue(e))=>n===2?e.has(t):A[Ie].hasOwnProperty.call(e,t),Ye=(e,t,n=ue(e))=>n===2?e.get(t):e[t],Ee=(e,t,n,r=ue(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function or(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var ke=Array.isArray,Pe=e=>e instanceof Map,Re=e=>e instanceof Set,st=e=>typeof e=="object",G=e=>typeof e=="function",je=e=>typeof e=="boolean";function sr(e){const t=+e;return Number.isInteger(t)&&String(t)===e}var D=e=>e.copy_||e.base_,lt=e=>e.modified_?e.copy_:e.base_;function Je(e,t){if(Pe(e))return new Map(e);if(Re(e))return new Set(e);if(ke(e))return Array[Ie].slice.call(e);const n=qt(e);if(t===!0||t==="class_only"&&!n){const r=A.getOwnPropertyDescriptors(e);delete r[R];let a=Reflect.ownKeys(r);for(let i=0;i<a.length;i++){const o=a[i],l=r[o];l[me]===!1&&(l[me]=!0,l[qe]=!0),(l.get||l.set)&&(r[o]={[qe]:!0,[me]:!0,[Se]:l[Se],[re]:e[o]})}return A.create(H(e),r)}else{const r=H(e);if(r!==null&&n)return{...e};const a=A.create(r);return A.assign(a,e)}}function ct(e,t=!1){return Ae(e)||j(e)||!O(e)||(ue(e)>1&&A.defineProperties(e,{set:fe,add:fe,clear:fe,delete:fe}),A.freeze(e),t&&ce(e,(n,r)=>{ct(r,!0)},!1)),e}function lr(){T(2)}var fe={[re]:lr};function Ae(e){return e===null||!st(e)?!0:A.isFrozen(e)}var _e="MapSet",Qe="Patches",xt="ArrayMethods",Yt={};function W(e){const t=Yt[e];return t||T(0,e),t}var Ct=e=>!!Yt[e],ae,Jt=()=>ae,cr=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Ct(_e)?W(_e):void 0,arrayMethodsPlugin_:Ct(xt)?W(xt):void 0});function St(e,t){t&&(e.patchPlugin_=W(Qe),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function Ke(e){Xe(e),e.drafts_.forEach(ur),e.drafts_=null}function Xe(e){e===ae&&(ae=e.parent_)}var Et=e=>ae=cr(ae,e);function ur(e){const t=e[R];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function _t(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];if(e!==void 0&&e!==n){n[R].modified_&&(Ke(t),T(4)),O(e)&&(e=It(t,e));const{patchPlugin_:a}=t;a&&a.generateReplacementPatches_(n[R].base_,e,t)}else e=It(t,n);return dr(t,e,!0),Ke(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Ht?e:void 0}function It(e,t){if(Ae(t))return t;const n=t[R];if(!n)return ut(t,e.handledSet_,e);if(!Me(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){const{callbacks_:r}=n;if(r)for(;r.length>0;)r.pop()(e);Xt(n,e)}return n.copy_}function dr(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&ct(t,n)}function Qt(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Me=(e,t)=>e.scope_===t,fr=[];function Kt(e,t,n,r){const a=D(e),i=e.type_;if(r!==void 0&&Ye(a,r,i)===t){Ee(a,r,n,i);return}if(!e.draftLocations_){const l=e.draftLocations_=new Map;ce(a,(s,d)=>{if(j(d)){const c=l.get(d)||[];c.push(s),l.set(d,c)}})}const o=e.draftLocations_.get(t)??fr;for(const l of o)Ee(a,l,n,i)}function hr(e,t,n){e.callbacks_.push(function(a){var l;const i=t;if(!i||!Me(i,a))return;(l=a.mapSetPlugin_)==null||l.fixSetContents(i);const o=lt(i);Kt(e,i.draft_??i,o,n),Xt(i,a)})}function Xt(e,t){var r;if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(((r=e.assigned_)==null?void 0:r.size)??0)>0)){const{patchPlugin_:a}=t;if(a){const i=a.getPath(e);i&&a.generatePatches_(e,i,t)}Qt(e)}}function pr(e,t,n){const{scope_:r}=e;if(j(n)){const a=n[R];Me(a,r)&&a.callbacks_.push(function(){ge(e);const o=lt(a);Kt(e,n,o,t)})}else O(n)&&e.callbacks_.push(function(){const i=D(e);Ye(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&ut(Ye(e.copy_,t,e.type_),r.handledSet_,r)})}function ut(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||j(e)||t.has(e)||!O(e)||Ae(e)||(t.add(e),ce(e,(r,a)=>{if(j(a)){const i=a[R];if(Me(i,n)){const o=lt(i);Ee(e,r,o,e.type_),Qt(i)}}else O(a)&&ut(a,t,n)})),e}function mr(e,t){const n=ke(e),r={type_:n?1:0,scope_:t?t.scope_:Jt(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let a=r,i=dt;n&&(a=[r],i=ie);const{revoke:o,proxy:l}=Proxy.revocable(a,i);return r.draft_=l,r.revoke_=o,[l,r]}var dt={get(e,t){if(t===R)return e;let n=e.scope_.arrayMethodsPlugin_;const r=e.type_===1&&typeof t=="string";if(r&&n!=null&&n.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);const a=D(e);if(!wt(a,t,e.type_))return gr(e,a,t);const i=a[t];if(e.finalized_||!O(i)||r&&e.operationMethod&&(n!=null&&n.isMutatingArrayMethod(e.operationMethod))&&sr(t))return i;if(i===ze(e.base_,t)){ge(e);const o=e.type_===1?+t:t,l=tt(e.scope_,i,e,o);return e.copy_[o]=l}return i},has(e,t){return t in D(e)},ownKeys(e){return Reflect.ownKeys(D(e))},set(e,t,n){const r=en(D(e),t);if(r!=null&&r.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const a=ze(D(e),t),i=a==null?void 0:a[R];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(or(n,a)&&(n!==void 0||wt(e.base_,t,e.type_)))return!0;ge(e),et(e)}return e.copy_[t]===n&&(n!==void 0||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),pr(e,t,n)),!0},deleteProperty(e,t){return ge(e),ze(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),et(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const n=D(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[me]:!0,[qe]:e.type_!==1||t!=="length",[Se]:r[Se],[re]:n[t]}},defineProperty(){T(11)},getPrototypeOf(e){return H(e.base_)},setPrototypeOf(){T(12)}},ie={};ce(dt,(e,t)=>{ie[e]=function(){const n=arguments;return n[0]=n[0][0],t.apply(this,n)}});ie.deleteProperty=function(e,t){return ie.set.call(this,e,t,void 0)};ie.set=function(e,t,n){return dt.set.call(this,e[0],t,n,e[0])};function ze(e,t){const n=e[R];return(n?D(n):e)[t]}function gr(e,t,n){var a;const r=en(t,n);return r?re in r?r[re]:(a=r.get)==null?void 0:a.call(e.draft_):void 0}function en(e,t){if(!(t in e))return;let n=H(e);for(;n;){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=H(n)}}function et(e){e.modified_||(e.modified_=!0,e.parent_&&et(e.parent_))}function ge(e){e.copy_||(e.assigned_=new Map,e.copy_=Je(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var yr=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(t,n,r)=>{if(G(t)&&!G(n)){const i=n;n=t;const o=this;return function(s=i,...d){return o.produce(s,c=>n.call(this,c,...d))}}G(n)||T(6),r!==void 0&&!G(r)&&T(7);let a;if(O(t)){const i=Et(this),o=tt(i,t,void 0);let l=!0;try{a=n(o),l=!1}finally{l?Ke(i):Xe(i)}return St(i,r),_t(a,i)}else if(!t||!st(t)){if(a=n(t),a===void 0&&(a=t),a===Ht&&(a=void 0),this.autoFreeze_&&ct(a,!0),r){const i=[],o=[];W(Qe).generateReplacementPatches_(t,a,{patches_:i,inversePatches_:o}),r(i,o)}return a}else T(1,t)},this.produceWithPatches=(t,n)=>{if(G(t))return(o,...l)=>this.produceWithPatches(o,s=>t(s,...l));let r,a;return[this.produce(t,n,(o,l)=>{r=o,a=l}),r,a]},je(e==null?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),je(e==null?void 0:e.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),je(e==null?void 0:e.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){O(e)||T(8),j(e)&&(e=vr(e));const t=Et(this),n=tt(t,e,void 0);return n[R].isManual_=!0,Xe(t),n}finishDraft(e,t){const n=e&&e[R];(!n||!n.isManual_)&&T(9);const{scope_:r}=n;return St(r,t),_t(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const a=t[n];if(a.path.length===0&&a.op==="replace"){e=a.value;break}}n>-1&&(t=t.slice(n+1));const r=W(Qe).applyPatches_;return j(e)?r(e,t):this.produce(e,a=>r(a,t))}};function tt(e,t,n,r){const[a,i]=Pe(t)?W(_e).proxyMap_(t,n):Re(t)?W(_e).proxySet_(t,n):mr(t,n);return((n==null?void 0:n.scope_)??Jt()).drafts_.push(a),i.callbacks_=(n==null?void 0:n.callbacks_)??[],i.key_=r,n&&r!==void 0?hr(n,i,r):i.callbacks_.push(function(s){var c;(c=s.mapSetPlugin_)==null||c.fixSetContents(i);const{patchPlugin_:d}=s;i.modified_&&d&&d.generatePatches_(i,[],s)}),a}function vr(e){return j(e)||T(10,e),tn(e)}function tn(e){if(!O(e)||Ae(e))return e;const t=e[R];let n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Je(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Je(e,!0);return ce(n,(a,i)=>{Ee(n,a,tn(i))},r),t&&(t.finalized_=!1),n}var br=new yr,nn=br.produce;function rn(e){return({dispatch:n,getState:r})=>a=>i=>typeof i=="function"?i(n,r,e):a(i)}var wr=rn(),xr=rn,Cr=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?xe:xe.apply(null,arguments)},Sr=e=>e&&typeof e.match=="function";function ee(e,t){function n(...r){if(t){let a=t(...r);if(!a)throw new Error(B(0));return{type:e,payload:a.payload,..."meta"in a&&{meta:a.meta},..."error"in a&&{error:a.error}}}return{type:e,payload:r[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=r=>ar(r)&&r.type===e,n}var an=class Q extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,Q.prototype)}static get[Symbol.species](){return Q}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new Q(...t[0].concat(this)):new Q(...t.concat(this))}};function kt(e){return O(e)?nn(e,()=>{}):e}function he(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Er(e){return typeof e=="boolean"}var _r=()=>function(t){const{thunk:n=!0,immutableCheck:r=!0,serializableCheck:a=!0,actionCreatorCheck:i=!0}=t??{};let o=new an;return n&&(Er(n)?o.push(wr):o.push(xr(n.extraArgument))),o},Ir="RTK_autoBatch",Pt=e=>t=>{setTimeout(t,e)},kr=(e={type:"raf"})=>t=>(...n)=>{const r=t(...n);let a=!0,i=!1,o=!1;const l=new Set,s=e.type==="tick"?queueMicrotask:e.type==="raf"?typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:Pt(10):e.type==="callback"?e.queueNotification:Pt(e.timeout),d=()=>{o=!1,i&&(i=!1,l.forEach(c=>c()))};return Object.assign({},r,{subscribe(c){const u=()=>a&&c(),p=r.subscribe(u);return l.add(c),()=>{p(),l.delete(c)}},dispatch(c){var u;try{return a=!((u=c==null?void 0:c.meta)!=null&&u[Ir]),i=!a,i&&(o||(o=!0,s(d))),r.dispatch(c)}finally{a=!0}}})},Pr=e=>function(n){const{autoBatch:r=!0}=n??{};let a=new an(e);return r&&a.push(kr(typeof r=="object"?r:void 0)),a};function Rr(e){const t=_r(),{reducer:n=void 0,middleware:r,devTools:a=!0,preloadedState:i=void 0,enhancers:o=void 0}=e||{};let l;if(typeof n=="function")l=n;else if(ot(n))l=Gt(n);else throw new Error(B(1));let s;typeof r=="function"?s=r(t):s=t();let d=xe;a&&(d=Cr({trace:!1,...typeof a=="object"&&a}));const c=rr(...s),u=Pr(c);let p=typeof o=="function"?o(u):u();const m=d(...p);return Vt(l,i,m)}function on(e){const t={},n=[];let r;const a={addCase(i,o){const l=typeof i=="string"?i:i.type;if(!l)throw new Error(B(28));if(l in t)throw new Error(B(29));return t[l]=o,a},addAsyncThunk(i,o){return o.pending&&(t[i.pending.type]=o.pending),o.rejected&&(t[i.rejected.type]=o.rejected),o.fulfilled&&(t[i.fulfilled.type]=o.fulfilled),o.settled&&n.push({matcher:i.settled,reducer:o.settled}),a},addMatcher(i,o){return n.push({matcher:i,reducer:o}),a},addDefaultCase(i){return r=i,a}};return e(a),[t,n,r]}function Ar(e){return typeof e=="function"}function Mr(e,t){let[n,r,a]=on(t),i;if(Ar(e))i=()=>kt(e());else{const l=kt(e);i=()=>l}function o(l=i(),s){let d=[n[s.type],...r.filter(({matcher:c})=>c(s)).map(({reducer:c})=>c)];return d.filter(c=>!!c).length===0&&(d=[a]),d.reduce((c,u)=>{if(u)if(j(c)){const m=u(c,s);return m===void 0?c:m}else{if(O(c))return nn(c,p=>u(p,s));{const p=u(c,s);if(p===void 0){if(c===null)return c;throw Error("A case reducer on a non-draftable value must not return undefined")}return p}}return c},l)}return o.getInitialState=i,o}var Nr=(e,t)=>Sr(e)?e.match(t):e(t);function Tr(...e){return t=>e.some(n=>Nr(n,t))}var Lr="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",Or=(e=21)=>{let t="",n=e;for(;n--;)t+=Lr[Math.random()*64|0];return t},Dr=["name","message","stack","code"],Ue=class{constructor(e,t){J(this,"_type");this.payload=e,this.meta=t}},Rt=class{constructor(e,t){J(this,"_type");this.payload=e,this.meta=t}},Br=e=>{if(typeof e=="object"&&e!==null){const t={};for(const n of Dr)typeof e[n]=="string"&&(t[n]=e[n]);return t}return{message:String(e)}},At="External signal was aborted",V=(()=>{function e(t,n,r){const a=ee(t+"/fulfilled",(s,d,c,u)=>({payload:s,meta:{...u||{},arg:c,requestId:d,requestStatus:"fulfilled"}})),i=ee(t+"/pending",(s,d,c)=>({payload:void 0,meta:{...c||{},arg:d,requestId:s,requestStatus:"pending"}})),o=ee(t+"/rejected",(s,d,c,u,p)=>({payload:u,error:(r&&r.serializeError||Br)(s||"Rejected"),meta:{...p||{},arg:c,requestId:d,rejectedWithValue:!!u,requestStatus:"rejected",aborted:(s==null?void 0:s.name)==="AbortError",condition:(s==null?void 0:s.name)==="ConditionError"}}));function l(s,{signal:d}={}){return(c,u,p)=>{const m=r!=null&&r.idGenerator?r.idGenerator(s):Or(),y=new AbortController;let v,h;function b(E){h=E,y.abort()}d&&(d.aborted?b(At):d.addEventListener("abort",()=>b(At),{once:!0}));const C=async function(){var x,I;let E;try{let k=(x=r==null?void 0:r.condition)==null?void 0:x.call(r,s,{getState:u,extra:p});if(zr(k)&&(k=await k),k===!1||y.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};const M=new Promise((S,z)=>{v=()=>{z({name:"AbortError",message:h||"Aborted"})},y.signal.addEventListener("abort",v,{once:!0})});c(i(m,s,(I=r==null?void 0:r.getPendingMeta)==null?void 0:I.call(r,{requestId:m,arg:s},{getState:u,extra:p}))),E=await Promise.race([M,Promise.resolve(n(s,{dispatch:c,getState:u,extra:p,requestId:m,signal:y.signal,abort:b,rejectWithValue:(S,z)=>new Ue(S,z),fulfillWithValue:(S,z)=>new Rt(S,z)})).then(S=>{if(S instanceof Ue)throw S;return S instanceof Rt?a(S.payload,m,s,S.meta):a(S,m,s)})])}catch(k){E=k instanceof Ue?o(null,m,s,k.payload,k.meta):o(k,m,s)}finally{v&&y.signal.removeEventListener("abort",v)}return r&&!r.dispatchConditionRejection&&o.match(E)&&E.meta.condition||c(E),E}();return Object.assign(C,{abort:b,requestId:m,arg:s,unwrap(){return C.then(jr)}})}}return Object.assign(l,{pending:i,rejected:o,fulfilled:a,settled:Tr(o,a),typePrefix:t})}return e.withTypes=()=>e,e})();function jr(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}function zr(e){return e!==null&&typeof e=="object"&&typeof e.then=="function"}var Ur=Symbol.for("rtk-slice-createasyncthunk");function Fr(e,t){return`${e}/${t}`}function $r({creators:e}={}){var n;const t=(n=e==null?void 0:e.asyncThunk)==null?void 0:n[Ur];return function(a){const{name:i,reducerPath:o=i}=a;if(!i)throw new Error(B(11));const l=(typeof a.reducers=="function"?a.reducers(Wr()):a.reducers)||{},s=Object.keys(l),d={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},c={addCase(w,x){const I=typeof w=="string"?w:w.type;if(!I)throw new Error(B(12));if(I in d.sliceCaseReducersByType)throw new Error(B(13));return d.sliceCaseReducersByType[I]=x,c},addMatcher(w,x){return d.sliceMatchers.push({matcher:w,reducer:x}),c},exposeAction(w,x){return d.actionCreators[w]=x,c},exposeCaseReducer(w,x){return d.sliceCaseReducersByName[w]=x,c}};s.forEach(w=>{const x=l[w],I={reducerName:w,type:Fr(i,w),createNotation:typeof a.reducers=="function"};Gr(x)?qr(I,x,c,t):Vr(I,x,c)});function u(){const[w={},x=[],I=void 0]=typeof a.extraReducers=="function"?on(a.extraReducers):[a.extraReducers],k={...w,...d.sliceCaseReducersByType};return Mr(a.initialState,M=>{for(let S in k)M.addCase(S,k[S]);for(let S of d.sliceMatchers)M.addMatcher(S.matcher,S.reducer);for(let S of x)M.addMatcher(S.matcher,S.reducer);I&&M.addDefaultCase(I)})}const p=w=>w,m=new Map,y=new WeakMap;let v;function h(w,x){return v||(v=u()),v(w,x)}function b(){return v||(v=u()),v.getInitialState()}function C(w,x=!1){function I(M){let S=M[w];return typeof S>"u"&&x&&(S=he(y,I,b)),S}function k(M=p){const S=he(m,x,()=>new WeakMap);return he(S,M,()=>{const z={};for(const[En,_n]of Object.entries(a.selectors??{}))z[En]=Zr(_n,M,()=>he(y,M,b),x);return z})}return{reducerPath:w,getSelectors:k,get selectors(){return k(I)},selectSlice:I}}const E={name:i,reducer:h,actions:d.actionCreators,caseReducers:d.sliceCaseReducersByName,getInitialState:b,...C(o),injectInto(w,{reducerPath:x,...I}={}){const k=x??o;return w.inject({reducerPath:k,reducer:h},I),{...E,...C(k,!0)}}};return E}}function Zr(e,t,n,r){function a(i,...o){let l=t(i);return typeof l>"u"&&r&&(l=n()),e(l,...o)}return a.unwrapped=e,a}var ft=$r();function Wr(){function e(t,n){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...n}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...n){return t(...n)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,n){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:n}},asyncThunk:e}}function Vr({type:e,reducerName:t,createNotation:n},r,a){let i,o;if("reducer"in r){if(n&&!Hr(r))throw new Error(B(17));i=r.reducer,o=r.prepare}else i=r;a.addCase(e,i).exposeCaseReducer(t,i).exposeAction(t,o?ee(e,o):ee(e))}function Gr(e){return e._reducerDefinitionType==="asyncThunk"}function Hr(e){return e._reducerDefinitionType==="reducerWithPrepare"}function qr({type:e,reducerName:t},n,r,a){if(!a)throw new Error(B(18));const{payloadCreator:i,fulfilled:o,pending:l,rejected:s,settled:d,options:c}=n,u=a(e,i,c);r.exposeAction(t,u),o&&r.addCase(u.fulfilled,o),l&&r.addCase(u.pending,l),s&&r.addCase(u.rejected,s),d&&r.addMatcher(u.settled,d),r.exposeCaseReducer(t,{fulfilled:o||pe,pending:l||pe,rejected:s||pe,settled:d||pe})}function pe(){}function B(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}const Yr=window.__BYTEBANK_API_BASE__||"https://tech-challenge-2-production.up.railway.app",Fe="bytebank_token";class Jr{getToken(){return localStorage.getItem(Fe)}setToken(t){localStorage.setItem(Fe,t)}clearToken(){localStorage.removeItem(Fe)}async request(t,n={}){const r=this.getToken(),a={"Content-Type":"application/json",...n.headers};r&&(a.Authorization=`Bearer ${r}`);const i=await fetch(`${Yr}${t}`,{...n,headers:a});if(!i.ok){const o=await i.json().catch(()=>({}));throw new Error(o.message||"Erro na requisição")}return i.json()}async createUser(t){return this.request("/user",{method:"POST",body:JSON.stringify(t)})}async authenticate(t){const n=await this.request("/user/auth",{method:"POST",body:JSON.stringify(t)});return n.result.token&&this.setToken(n.result.token),n}logout(){this.clearToken()}decodeToken(t){try{const n=JSON.parse(atob(t.split(".")[1]));return{id:n.id,username:n.username,email:n.email}}catch{return null}}isTokenValid(){const t=this.getToken();if(!t)return!1;try{const n=JSON.parse(atob(t.split(".")[1]));return Date.now()<n.exp*1e3}catch{return!1}}async getAccount(){return this.request("/account")}async createTransaction(t){return this.request("/account/transaction",{method:"POST",body:JSON.stringify(t)})}async getStatement(t){return this.request(`/account/${t}/statement`)}}const L=new Jr,$=class ${constructor(){J(this,"listeners");this.listeners=new Map,window.addEventListener("bytebank-event",t=>{this.handleEvent(t.detail)})}static getInstance(){return $.instance||($.instance=new $),$.instance}handleEvent(t){const n=this.listeners.get(t.type);n==null||n.forEach(r=>{try{r(t)}catch(a){console.error(`Erro ao processar evento ${t.type}:`,a)}})}subscribe(t,n){return this.listeners.has(t)||this.listeners.set(t,new Set),this.listeners.get(t).add(n),()=>{var r;(r=this.listeners.get(t))==null||r.delete(n)}}emit(t,n,r="base"){const a={type:t,payload:n,source:r,timestamp:Date.now()};this.handleEvent(a),window.dispatchEvent(new CustomEvent("bytebank-event",{detail:a}))}emitAuthChange(t){this.emit("auth:change",{isAuthenticated:t},"base")}emitTransactionCreated(t){this.emit("transaction:created",{transactionId:t},"financeiro")}emitTransactionsUpdated(){this.emit("transactions:updated",{},"financeiro")}emitRefreshDashboard(){this.emit("dashboard:refresh",{},"dashboard")}emitNavigate(t){this.emit("navigate",{path:t},"base")}};J($,"instance");let nt=$;const te=nt.getInstance(),Qr={user:null,token:null,isAuthenticated:!1,isLoading:!1,error:null},ye=V("auth/login",async(e,{rejectWithValue:t})=>{try{const n=await L.authenticate(e),r=L.decodeToken(n.result.token);return te.emitAuthChange(!0),{user:r,token:n.result.token}}catch(n){return t(n.message)}}),ve=V("auth/register",async(e,{rejectWithValue:t})=>{try{return(await L.createUser(e)).result}catch(n){return t(n.message)}}),Kr=V("auth/logout",async()=>(L.logout(),te.emitAuthChange(!1),null)),Xr=V("auth/checkAuth",async()=>{if(!L.isTokenValid())return L.logout(),null;const e=L.getToken();if(!e)return null;const t=L.decodeToken(e);return t?{user:t,token:e}:null}),sn=ft({name:"auth",initialState:Qr,reducers:{clearError:e=>{e.error=null},setUser:(e,t)=>{e.user=t.payload}},extraReducers:e=>{e.addCase(ye.pending,t=>{t.isLoading=!0,t.error=null}).addCase(ye.fulfilled,(t,n)=>{t.isLoading=!1,t.user=n.payload.user,t.token=n.payload.token,t.isAuthenticated=!0}).addCase(ye.rejected,(t,n)=>{t.isLoading=!1,t.error=n.payload}).addCase(ve.pending,t=>{t.isLoading=!0,t.error=null}).addCase(ve.fulfilled,t=>{t.isLoading=!1}).addCase(ve.rejected,(t,n)=>{t.isLoading=!1,t.error=n.payload}).addCase(Kr.fulfilled,t=>{t.user=null,t.token=null,t.isAuthenticated=!1}).addCase(Xr.fulfilled,(t,n)=>{n.payload?(t.user=n.payload.user,t.token=n.payload.token,t.isAuthenticated=!0):(t.user=null,t.token=null,t.isAuthenticated=!1)})}}),{clearError:Ei,setUser:_i}=sn.actions,ln=e=>e.auth,cn=e=>e.auth.isAuthenticated,ea=sn.reducer,ta={accounts:[],cards:[],selectedAccount:null,balance:0,isLoading:!1,error:null},$e=V("account/fetchAccount",async(e,{rejectWithValue:t})=>{try{const n=await L.getAccount(),r=n.result.transactions.reduce((a,i)=>a+i.value,0);return{...n.result,balance:r}}catch(n){return t(n.message)}}),un=ft({name:"account",initialState:ta,reducers:{clearError:e=>{e.error=null},selectAccount:(e,t)=>{const n=e.accounts.find(r=>r.id===t.payload);n&&(e.selectedAccount=n)},updateBalance:(e,t)=>{e.balance=t.payload},clearAccount:e=>{e.accounts=[],e.cards=[],e.selectedAccount=null,e.balance=0}},extraReducers:e=>{e.addCase($e.pending,t=>{t.isLoading=!0,t.error=null}).addCase($e.fulfilled,(t,n)=>{t.isLoading=!1,t.accounts=n.payload.account,t.cards=n.payload.cards,t.balance=n.payload.balance,n.payload.account.length>0&&!t.selectedAccount&&(t.selectedAccount=n.payload.account[0])}).addCase($e.rejected,(t,n)=>{t.isLoading=!1,t.error=n.payload})}}),{clearError:Ii,selectAccount:ki,updateBalance:Pi,clearAccount:Ri}=un.actions,na=un.reducer,dn={type:"all",category:"all",startDate:null,endDate:null,searchTerm:""},ra={transactions:[],filteredTransactions:[],isLoading:!1,error:null,filters:dn,pagination:{page:1,pageSize:10,totalItems:0,totalPages:0}},Ze=(e,t)=>e.filter(n=>{var r,a,i;if(t.type!=="all"&&n.type!==t.type||t.category!=="all"&&n.category!==t.category||t.startDate&&new Date(n.date)<new Date(t.startDate)||t.endDate&&new Date(n.date)>new Date(t.endDate))return!1;if(t.searchTerm){const o=t.searchTerm.toLowerCase(),l=(r=n.description)==null?void 0:r.toLowerCase().includes(o),s=(a=n.from)==null?void 0:a.toLowerCase().includes(o),d=(i=n.to)==null?void 0:i.toLowerCase().includes(o);if(!l&&!s&&!d)return!1}return!0}),We=V("transactions/fetch",async(e,{rejectWithValue:t})=>{try{return(await L.getStatement(e)).result.transactions}catch(n){return t(n.message)}}),Ve=V("transactions/create",async(e,{rejectWithValue:t})=>{try{const n=await L.createTransaction(e);return te.emitTransactionCreated(n.id),te.emitTransactionsUpdated(),te.emitRefreshDashboard(),n}catch(n){return t(n.message)}}),fn=ft({name:"transactions",initialState:ra,reducers:{clearError:e=>{e.error=null},setFilters:(e,t)=>{e.filters={...e.filters,...t.payload},e.filteredTransactions=Ze(e.transactions,e.filters),e.pagination.totalItems=e.filteredTransactions.length,e.pagination.totalPages=Math.ceil(e.filteredTransactions.length/e.pagination.pageSize),e.pagination.page=1},clearFilters:e=>{e.filters=dn,e.filteredTransactions=e.transactions,e.pagination.totalItems=e.transactions.length,e.pagination.totalPages=Math.ceil(e.transactions.length/e.pagination.pageSize),e.pagination.page=1},setPage:(e,t)=>{e.pagination.page=t.payload}},extraReducers:e=>{e.addCase(We.pending,t=>{t.isLoading=!0,t.error=null}).addCase(We.fulfilled,(t,n)=>{t.isLoading=!1,t.transactions=n.payload,t.filteredTransactions=Ze(n.payload,t.filters),t.pagination.totalItems=t.filteredTransactions.length,t.pagination.totalPages=Math.ceil(t.filteredTransactions.length/t.pagination.pageSize)}).addCase(We.rejected,(t,n)=>{t.isLoading=!1,t.error=n.payload}).addCase(Ve.pending,t=>{t.isLoading=!0}).addCase(Ve.fulfilled,(t,n)=>{t.isLoading=!1,t.transactions.unshift(n.payload),t.filteredTransactions=Ze(t.transactions,t.filters),t.pagination.totalItems=t.filteredTransactions.length,t.pagination.totalPages=Math.ceil(t.filteredTransactions.length/t.pagination.pageSize)}).addCase(Ve.rejected,(t,n)=>{t.isLoading=!1,t.error=n.payload})}}),{clearError:Ai,setFilters:Mi,clearFilters:Ni,setPage:Ti}=fn.actions,aa=fn.reducer,ia=Gt({auth:ea,account:na,transactions:aa}),hn=Rr({reducer:ia,devTools:!0});window.__BYTEBANK_STORE__=hn;/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function oe(){return oe=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},oe.apply(this,arguments)}var U;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(U||(U={}));const Mt="popstate";function oa(e){e===void 0&&(e={});function t(r,a){let{pathname:i,search:o,hash:l}=r.location;return rt("",{pathname:i,search:o,hash:l},a.state&&a.state.usr||null,a.state&&a.state.key||"default")}function n(r,a){return typeof a=="string"?a:pn(a)}return la(t,n,null,e)}function _(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ht(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function sa(){return Math.random().toString(36).substr(2,8)}function Nt(e,t){return{usr:e.state,key:e.key,idx:t}}function rt(e,t,n,r){return n===void 0&&(n=null),oe({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?q(t):t,{state:n,key:t&&t.key||r||sa()})}function pn(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function q(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function la(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:i=!1}=r,o=a.history,l=U.Pop,s=null,d=c();d==null&&(d=0,o.replaceState(oe({},o.state,{idx:d}),""));function c(){return(o.state||{idx:null}).idx}function u(){l=U.Pop;let h=c(),b=h==null?null:h-d;d=h,s&&s({action:l,location:v.location,delta:b})}function p(h,b){l=U.Push;let C=rt(v.location,h,b);d=c()+1;let E=Nt(C,d),w=v.createHref(C);try{o.pushState(E,"",w)}catch(x){if(x instanceof DOMException&&x.name==="DataCloneError")throw x;a.location.assign(w)}i&&s&&s({action:l,location:v.location,delta:1})}function m(h,b){l=U.Replace;let C=rt(v.location,h,b);d=c();let E=Nt(C,d),w=v.createHref(C);o.replaceState(E,"",w),i&&s&&s({action:l,location:v.location,delta:0})}function y(h){let b=a.location.origin!=="null"?a.location.origin:a.location.href,C=typeof h=="string"?h:pn(h);return C=C.replace(/ $/,"%20"),_(b,"No window.location.(origin|href) available to create URL for href: "+C),new URL(C,b)}let v={get action(){return l},get location(){return e(a,o)},listen(h){if(s)throw new Error("A history only accepts one active listener");return a.addEventListener(Mt,u),s=h,()=>{a.removeEventListener(Mt,u),s=null}},createHref(h){return t(a,h)},createURL:y,encodeLocation(h){let b=y(h);return{pathname:b.pathname,search:b.search,hash:b.hash}},push:p,replace:m,go(h){return o.go(h)}};return v}var Tt;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Tt||(Tt={}));function ca(e,t,n){return n===void 0&&(n="/"),ua(e,t,n)}function ua(e,t,n,r){let a=typeof t=="string"?q(t):t,i=yn(a.pathname||"/",n);if(i==null)return null;let o=mn(e);da(o);let l=null;for(let s=0;l==null&&s<o.length;++s){let d=Sa(i);l=wa(o[s],d)}return l}function mn(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(i,o,l)=>{let s={relativePath:l===void 0?i.path||"":l,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};s.relativePath.startsWith("/")&&(_(s.relativePath.startsWith(r),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(r.length));let d=Z([r,s.relativePath]),c=n.concat(s);i.children&&i.children.length>0&&(_(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+d+'".')),mn(i.children,t,c,d)),!(i.path==null&&!i.index)&&t.push({path:d,score:va(d,i.index),routesMeta:c})};return e.forEach((i,o)=>{var l;if(i.path===""||!((l=i.path)!=null&&l.includes("?")))a(i,o);else for(let s of gn(i.path))a(i,o,s)}),t}function gn(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return a?[i,""]:[i];let o=gn(r.join("/")),l=[];return l.push(...o.map(s=>s===""?i:[i,s].join("/"))),a&&l.push(...o),l.map(s=>e.startsWith("/")&&s===""?"/":s)}function da(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ba(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const fa=/^:[\w-]+$/,ha=3,pa=2,ma=1,ga=10,ya=-2,Lt=e=>e==="*";function va(e,t){let n=e.split("/"),r=n.length;return n.some(Lt)&&(r+=ya),t&&(r+=pa),n.filter(a=>!Lt(a)).reduce((a,i)=>a+(fa.test(i)?ha:i===""?ma:ga),r)}function ba(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function wa(e,t,n){let{routesMeta:r}=e,a={},i="/",o=[];for(let l=0;l<r.length;++l){let s=r[l],d=l===r.length-1,c=i==="/"?t:t.slice(i.length)||"/",u=xa({path:s.relativePath,caseSensitive:s.caseSensitive,end:d},c),p=s.route;if(!u)return null;Object.assign(a,u.params),o.push({params:a,pathname:Z([i,u.pathname]),pathnameBase:Aa(Z([i,u.pathnameBase])),route:p}),u.pathnameBase!=="/"&&(i=Z([i,u.pathnameBase]))}return o}function xa(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=Ca(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let i=a[0],o=i.replace(/(.)\/+$/,"$1"),l=a.slice(1);return{params:r.reduce((d,c,u)=>{let{paramName:p,isOptional:m}=c;if(p==="*"){let v=l[u]||"";o=i.slice(0,i.length-v.length).replace(/(.)\/+$/,"$1")}const y=l[u];return m&&!y?d[p]=void 0:d[p]=(y||"").replace(/%2F/g,"/"),d},{}),pathname:i,pathnameBase:o,pattern:e}}function Ca(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ht(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,s)=>(r.push({paramName:l,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function Sa(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return ht(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function yn(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const Ea=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_a=e=>Ea.test(e);function Ia(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?q(e):e,i;if(n)if(_a(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),ht(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=Ot(n.substring(1),"/"):i=Ot(n,t)}else i=t;return{pathname:i,search:Ma(r),hash:Na(a)}}function Ot(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function Ge(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ka(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Pa(e,t){let n=ka(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Ra(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=q(e):(a=oe({},e),_(!a.pathname||!a.pathname.includes("?"),Ge("?","pathname","search",a)),_(!a.pathname||!a.pathname.includes("#"),Ge("#","pathname","hash",a)),_(!a.search||!a.search.includes("#"),Ge("#","search","hash",a)));let i=e===""||a.pathname==="",o=i?"/":a.pathname,l;if(o==null)l=n;else{let u=t.length-1;if(!r&&o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),u-=1;a.pathname=p.join("/")}l=u>=0?t[u]:"/"}let s=Ia(a,l),d=o&&o!=="/"&&o.endsWith("/"),c=(i||o===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(d||c)&&(s.pathname+="/"),s}const Z=e=>e.join("/").replace(/\/\/+/g,"/"),Aa=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ma=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Na=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ta(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const vn=["post","put","patch","delete"];new Set(vn);const La=["get",...vn];new Set(La);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function se(){return se=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},se.apply(this,arguments)}const pt=f.createContext(null),Oa=f.createContext(null),Ne=f.createContext(null),Te=f.createContext(null),Y=f.createContext({outlet:null,matches:[],isDataRoute:!1}),bn=f.createContext(null);function Le(){return f.useContext(Te)!=null}function mt(){return Le()||_(!1),f.useContext(Te).location}function wn(e){f.useContext(Ne).static||f.useLayoutEffect(e)}function de(){let{isDataRoute:e}=f.useContext(Y);return e?qa():Da()}function Da(){Le()||_(!1);let e=f.useContext(pt),{basename:t,future:n,navigator:r}=f.useContext(Ne),{matches:a}=f.useContext(Y),{pathname:i}=mt(),o=JSON.stringify(Pa(a,n.v7_relativeSplatPath)),l=f.useRef(!1);return wn(()=>{l.current=!0}),f.useCallback(function(d,c){if(c===void 0&&(c={}),!l.current)return;if(typeof d=="number"){r.go(d);return}let u=Ra(d,JSON.parse(o),i,c.relative==="path");e==null&&t!=="/"&&(u.pathname=u.pathname==="/"?t:Z([t,u.pathname])),(c.replace?r.replace:r.push)(u,c.state,c)},[t,r,o,i,e])}function Ba(e,t){return ja(e,t)}function ja(e,t,n,r){Le()||_(!1);let{navigator:a}=f.useContext(Ne),{matches:i}=f.useContext(Y),o=i[i.length-1],l=o?o.params:{};o&&o.pathname;let s=o?o.pathnameBase:"/";o&&o.route;let d=mt(),c;if(t){var u;let h=typeof t=="string"?q(t):t;s==="/"||(u=h.pathname)!=null&&u.startsWith(s)||_(!1),c=h}else c=d;let p=c.pathname||"/",m=p;if(s!=="/"){let h=s.replace(/^\//,"").split("/");m="/"+p.replace(/^\//,"").split("/").slice(h.length).join("/")}let y=ca(e,{pathname:m}),v=Za(y&&y.map(h=>Object.assign({},h,{params:Object.assign({},l,h.params),pathname:Z([s,a.encodeLocation?a.encodeLocation(h.pathname).pathname:h.pathname]),pathnameBase:h.pathnameBase==="/"?s:Z([s,a.encodeLocation?a.encodeLocation(h.pathnameBase).pathname:h.pathnameBase])})),i,n,r);return t&&v?f.createElement(Te.Provider,{value:{location:se({pathname:"/",search:"",hash:"",state:null,key:"default"},c),navigationType:U.Pop}},v):v}function za(){let e=Ha(),t=Ta(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return f.createElement(f.Fragment,null,f.createElement("h2",null,"Unexpected Application Error!"),f.createElement("h3",{style:{fontStyle:"italic"}},t),n?f.createElement("pre",{style:a},n):null,null)}const Ua=f.createElement(za,null);class Fa extends f.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?f.createElement(Y.Provider,{value:this.props.routeContext},f.createElement(bn.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function $a(e){let{routeContext:t,match:n,children:r}=e,a=f.useContext(pt);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),f.createElement(Y.Provider,{value:t},r)}function Za(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var i;if(!n)return null;if(n.errors)e=n.matches;else if((i=r)!=null&&i.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,l=(a=n)==null?void 0:a.errors;if(l!=null){let c=o.findIndex(u=>u.route.id&&(l==null?void 0:l[u.route.id])!==void 0);c>=0||_(!1),o=o.slice(0,Math.min(o.length,c+1))}let s=!1,d=-1;if(n&&r&&r.v7_partialHydration)for(let c=0;c<o.length;c++){let u=o[c];if((u.route.HydrateFallback||u.route.hydrateFallbackElement)&&(d=c),u.route.id){let{loaderData:p,errors:m}=n,y=u.route.loader&&p[u.route.id]===void 0&&(!m||m[u.route.id]===void 0);if(u.route.lazy||y){s=!0,d>=0?o=o.slice(0,d+1):o=[o[0]];break}}}return o.reduceRight((c,u,p)=>{let m,y=!1,v=null,h=null;n&&(m=l&&u.route.id?l[u.route.id]:void 0,v=u.route.errorElement||Ua,s&&(d<0&&p===0?(Ya("route-fallback"),y=!0,h=null):d===p&&(y=!0,h=u.route.hydrateFallbackElement||null)));let b=t.concat(o.slice(0,p+1)),C=()=>{let E;return m?E=v:y?E=h:u.route.Component?E=f.createElement(u.route.Component,null):u.route.element?E=u.route.element:E=c,f.createElement($a,{match:u,routeContext:{outlet:c,matches:b,isDataRoute:n!=null},children:E})};return n&&(u.route.ErrorBoundary||u.route.errorElement||p===0)?f.createElement(Fa,{location:n.location,revalidation:n.revalidation,component:v,error:m,children:C(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):C()},null)}var xn=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(xn||{}),Cn=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Cn||{});function Wa(e){let t=f.useContext(pt);return t||_(!1),t}function Va(e){let t=f.useContext(Oa);return t||_(!1),t}function Ga(e){let t=f.useContext(Y);return t||_(!1),t}function Sn(e){let t=Ga(),n=t.matches[t.matches.length-1];return n.route.id||_(!1),n.route.id}function Ha(){var e;let t=f.useContext(bn),n=Va(),r=Sn();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function qa(){let{router:e}=Wa(xn.UseNavigateStable),t=Sn(Cn.UseNavigateStable),n=f.useRef(!1);return wn(()=>{n.current=!0}),f.useCallback(function(a,i){i===void 0&&(i={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,se({fromRouteId:t},i)))},[e,t])}const Dt={};function Ya(e,t,n){Dt[e]||(Dt[e]=!0)}function Ja(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function K(e){_(!1)}function Qa(e){let{basename:t="/",children:n=null,location:r,navigationType:a=U.Pop,navigator:i,static:o=!1,future:l}=e;Le()&&_(!1);let s=t.replace(/^\/*/,"/"),d=f.useMemo(()=>({basename:s,navigator:i,static:o,future:se({v7_relativeSplatPath:!1},l)}),[s,l,i,o]);typeof r=="string"&&(r=q(r));let{pathname:c="/",search:u="",hash:p="",state:m=null,key:y="default"}=r,v=f.useMemo(()=>{let h=yn(c,s);return h==null?null:{location:{pathname:h,search:u,hash:p,state:m,key:y},navigationType:a}},[s,c,u,p,m,y,a]);return v==null?null:f.createElement(Ne.Provider,{value:d},f.createElement(Te.Provider,{children:n,value:v}))}function Ka(e){let{children:t,location:n}=e;return Ba(at(t),n)}new Promise(()=>{});function at(e,t){t===void 0&&(t=[]);let n=[];return f.Children.forEach(e,(r,a)=>{if(!f.isValidElement(r))return;let i=[...t,a];if(r.type===f.Fragment){n.push.apply(n,at(r.props.children,i));return}r.type!==K&&_(!1),!r.props.index||!r.props.children||_(!1);let o={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=at(r.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Xa="6";try{window.__reactRouterVersion=Xa}catch{}const ei="startTransition",Bt=f[ei];function ti(e){let{basename:t,children:n,future:r,window:a}=e,i=f.useRef();i.current==null&&(i.current=oa({window:a,v5Compat:!0}));let o=i.current,[l,s]=f.useState({action:o.action,location:o.location}),{v7_startTransition:d}=r||{},c=f.useCallback(u=>{d&&Bt?Bt(()=>s(u)):s(u)},[s,d]);return f.useLayoutEffect(()=>o.listen(c),[o,c]),f.useEffect(()=>Ja(r),[r]),f.createElement(Qa,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:o,future:r})}var jt;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(jt||(jt={}));var zt;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(zt||(zt={}));const ni=[{id:1,imagemUrl:"conta-e-cartao-gratuitos.svg",titulo:"Conta e cartão gratuitos",descricao:"Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."},{id:2,imagemUrl:"saques-sem-custo.svg",titulo:"Saques sem custo",descricao:"Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h em qualquer lugar do país."},{id:3,imagemUrl:"programa-de-pontos.svg",titulo:"Programa de pontos",descricao:"Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"},{id:4,imagemUrl:"seguro-dispositivos.svg",titulo:"Seguro dispositivos",descricao:"Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica."}],ri="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgOTAwIDQ1MCI+CiAgPHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiNlOWVjZWYiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyOCIgZmlsbD0iIzAwNEQ2MSI+QmFubmVyIFBsYWNlaG9sZGVyPC90ZXh0Pgo8L3N2Zz4=",ai="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmM2ZhZjciLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzQ3QTEzOCI+Q29udGE8L3RleHQ+PC9zdmc+",ii="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmZmY3ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iI2ZmNmI2YiI+U2FxdWVzPC90ZXh0Pjwvc3ZnPg==",oi="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmZmZhZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iI2YzOWMxMiI+UG9udG9zPC90ZXh0Pjwvc3ZnPg==",si="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmMGY5ZmYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzQ1YjdkMSI+U2VndXJvPC90ZXh0Pjwvc3ZnPg==";function li(){const e=de();return g("div",{className:"flex flex-col bg-[#FFF]",children:g("div",{className:"bg-gradient-to-b from-[#004D61] to-[#FFF] pt-10 pb-23",children:N("div",{className:"container mx-auto",children:[N("div",{className:"grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-18 gap-14 p-5",children:[g("section",{children:g("div",{className:"flex items-center h-full",children:g("div",{children:g("h1",{className:"font-bold text-[33px] leading-[1.5em] lg:text-left md:text-center text-center",children:"Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!!!"})})})}),g("section",{children:g("img",{className:"mx-auto max-w-full h-auto",src:ri,alt:"Banner",width:"900",height:"450"})})]}),g("div",{className:"sm:block md:block lg:hidden mb-18 pl-4 pr-4",children:N("div",{className:"flex gap-5 md:grid-cols-2",children:[g("button",{onClick:()=>e("/cadastro"),className:"inline-flex justify-center items-center h-14 text-center rounded-[8px] bg-[#000] hover:bg-[transparent] border-[3px] border-[#000] w-full font-semibold text-[#FFF] text-[19px] hover:text-[#000] transition duration-300","aria-label":"Abrir minha conta",children:"Abrir minha conta"}),g("button",{onClick:()=>e("/login"),className:"inline-flex justify-center items-center h-14 text-center rounded-[8px] bg-transparent hover:bg-[#000] border-[3px] border-[#000] w-full font-semibold text-[#000] hover:text-[#FFF] text-[19px] transition duration-300","aria-label":"Já tenho conta",children:"Já tenho conta"})]})}),N("div",{children:[g("h2",{className:"text-center font-bold text-[30px] mb-16",children:"Vantagens do nosso banco:"}),g("div",{className:"grid gap-14 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4",children:ni.map(t=>N("section",{className:"text-center p-4",children:[g("figure",{children:g("img",{className:"mx-auto w-20 h-auto",src:t.imagemUrl==="conta-e-cartao-gratuitos.svg"?ai:t.imagemUrl==="saques-sem-custo.svg"?ii:t.imagemUrl==="programa-de-pontos.svg"?oi:t.imagemUrl==="seguro-dispositivos.svg"?si:"",alt:t.titulo,width:"74",height:"56"})}),g("h3",{className:"font-bold text-[22px] text-[#47A138] mt-5 mb-5",children:t.titulo}),g("p",{className:"text-[#767676] text-[19px]",children:t.descricao})]},t.id))})]})]})})})}function ci(){const e=Wt(),t=be(ln),n=be(cn),r=de(),[a,i]=X(""),[o,l]=X("");return ne(()=>{n&&r("/dashboard")},[n,r]),N("div",{className:"max-w-md mx-auto p-6",children:[g("h2",{className:"text-2xl font-bold mb-4",children:"Login"}),N("form",{onSubmit:async d=>{d.preventDefault();try{await e(ye({email:a,password:o})).unwrap()}catch{}},className:"flex flex-col gap-4",children:[g("input",{value:a,onChange:d=>i(d.target.value),placeholder:"Email",type:"email",className:"p-2 border rounded"}),g("input",{value:o,onChange:d=>l(d.target.value),placeholder:"Senha",type:"password",className:"p-2 border rounded"}),g("button",{type:"submit",disabled:t.isLoading,className:"bg-green-500 text-white p-2 rounded",children:t.isLoading?"Entrando...":"Entrar"})]}),t.error&&g("p",{className:"text-red-500 mt-2",children:t.error})]})}function ui(){const e=Wt(),t=be(ln),n=be(cn),r=de(),[a,i]=X(""),[o,l]=X(""),[s,d]=X("");return ne(()=>{n&&r("/dashboard")},[n,r]),N("div",{className:"max-w-md mx-auto p-6",children:[g("h2",{className:"text-2xl font-bold mb-4",children:"Cadastro"}),N("form",{onSubmit:async u=>{u.preventDefault();try{await e(ve({username:a,email:o,password:s})).unwrap(),r("/login")}catch{}},className:"flex flex-col gap-4",children:[g("input",{value:a,onChange:u=>i(u.target.value),placeholder:"Nome",className:"p-2 border rounded"}),g("input",{value:o,onChange:u=>l(u.target.value),placeholder:"Email",type:"email",className:"p-2 border rounded"}),g("input",{value:s,onChange:u=>d(u.target.value),placeholder:"Senha",type:"password",className:"p-2 border rounded"}),g("button",{type:"submit",disabled:t.isLoading,className:"bg-green-500 text-white p-2 rounded",children:t.isLoading?"Enviando...":"Criar conta"})]}),t.error&&g("p",{className:"text-red-500 mt-2",children:t.error})]})}function di(){return null}function fi(){return N(Ka,{children:[g(K,{path:"/",element:g(li,{})}),g(K,{path:"/login",element:g(ci,{})}),g(K,{path:"/cadastro",element:g(ui,{})}),g(K,{path:"/dashboard",element:g(di,{})})]})}function hi(){const e=de(),t=mt();return ne(()=>{const n=i=>{var o;(o=i.detail)!=null&&o.href&&e(i.detail.href)},r=()=>{e("/")},a=i=>{var o;(o=i.detail)!=null&&o.href&&e(i.detail.href)};return window.addEventListener("nav-click",n),window.addEventListener("logo-click",r),window.addEventListener("auth-click",a),()=>{window.removeEventListener("nav-click",n),window.removeEventListener("logo-click",r),window.removeEventListener("auth-click",a)}},[e]),ne(()=>{const n=document.querySelector("bytebank-header");n==null||n.setActiveMenuItem(t.pathname)},[t.pathname]),null}function pi(){const e=de();return ne(()=>{const t=n=>{var r;(r=n.detail)!=null&&r.href&&e(n.detail.href)};return window.addEventListener("service-click",t),()=>{window.removeEventListener("service-click",t)}},[e]),null}class mi extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.mobileMenuOpen=!1}static get observedAttributes(){return["logo-url","logo-small-url","show-auth-buttons"]}connectedCallback(){this.render(),this.setupEventListeners()}attributeChangedCallback(){this.render(),this.setupEventListeners()}getNavItems(){const t=this.querySelector('[slot="menu"]');if(t){const n=t.querySelectorAll("[data-menu-item]");if(n.length>0)return Array.from(n).map(r=>({name:r.getAttribute("data-label"),href:r.getAttribute("data-href")||"#"}))}return[{name:"Home",href:"/"},{name:"Dashboard",href:"/dashboard"},{name:"Financeiro",href:"/financeiro"},{name:"Para você",href:"/paravoce"}]}render(){const t=this.getAttribute("logo-url")||"logo-green.svg",n=this.getAttribute("logo-small-url")||"logo-small.svg",r=this.resolveAsset?this.resolveAsset(t):t,a=this.resolveAsset?this.resolveAsset(n):n,i=this.getAttribute("show-auth-buttons")!=="false",o=this.getNavItems();this.shadowRoot.innerHTML=`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        header {
          background: #000;
          color: white;
          padding: 1.25rem 0;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .container {
          width: 100%;
          padding: 0 2.5rem;
        }

        .header-content {
          display: flex;
          width: 100%;
        }

        .main-section {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
        }

        /* NAVBAR SECTION */
        .navbar-container {
          order: 2;
          flex: 1;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: left;
        }

        /* Mobile Toggle */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger-icon {
          width: 2.25rem;
          height: 2.25rem;
          stroke: #47A138;
          stroke-width: 2;
        }

        /* Desktop Menu */
        .nav-links {
          display: flex;
          gap: 4rem;
          list-style: none;
          align-items: center;
        }

        .nav-link {
          color: #47A138;
          text-decoration: none;
          font-size: 1.1875rem;
          font-weight: 500;
          transition: all 0.3s;
          cursor: pointer;
        }

        .nav-link:hover {
          text-decoration: underline;
        }

        .nav-link.active {
          font-weight: 600;
        }

        /* Mobile Menu */
        .mobile-menu {
          display: none;
          position: fixed;
          top: 73px;
          left: 0;
          right: 0;
          background: #000;
          border-top: 1px solid rgba(71, 161, 56, 0.2);
          padding: 1rem 2.5rem;
          flex-direction: column;
          gap: 0.5rem;
          max-height: calc(100vh - 73px);
          overflow-y: auto;
          z-index: 40;
        }

        .mobile-menu.open {
          display: flex;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-menu .nav-link {
          display: block;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(71, 161, 56, 0.1);
        }

        /* LOGO SECTION */
        .logo-container {
          order: 1;
          flex-shrink: 0;
        }

        .logo-container a {
          display: inline-block;
          line-height: 0;
        }

        .logo-large {
          display: block;
          width: 170px;
          height: 38px;
          margin-right: 60px;
        }

        .logo-small {
          display: none;
          width: 45px;
          height: 45px;
        }

        /* AUTH BUTTONS SECTION */
        .auth-buttons {
          display: flex;
          gap: 1.25rem;
          flex-shrink: 0;
        }

        .btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          height: 2.75rem;
          text-align: center;
          border-radius: 8px;
          min-width: 180px;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .btn-primary {
          background: #47a138;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background: #FFF;
          color: #59b449;
        }

        .btn-secondary {
          background: transparent;
          border: 3px solid #47a138;
          color: #47a138;
        }

        .btn-secondary:hover {
          background: #47a138;
          color: white;
        }

        /* RESPONSIVE */
        @media (max-width: 1280px) {
          .auth-buttons {
            display: none;
          }

          .nav-links {
            gap: 2.5rem;
          }
        }

        @media (max-width: 1024px) {
          .logo-large {
            display: none;
          }

          .logo-small {
            display: block;
          }

          .navbar-container {
            order: 1;
          }

          .logo-container {
            order: 2;
          }

          .nav-links {
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 0 1.5rem;
          }

          .logo-large {
            display: block;
            margin-right: 0;
          }

          .logo-small {
            display: none;
          }

          .mobile-toggle {
            display: block;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu {
            padding: 1rem 1.5rem;
          }
        }

        @media (max-width: 640px) {
          header {
            padding: 1rem 0;
          }
        }
      </style>

      <header>
        <div class="container">
          <div class="header-content">
            <div class="main-section">
              
              <!-- NAVBAR -->
              <div class="navbar-container">
                <nav class="navbar">
                  <!-- Mobile Toggle -->
                  <button class="mobile-toggle" id="mobile-toggle" aria-label="Menu">
                    ${this.mobileMenuOpen?`
                      <svg class="hamburger-icon" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    `:`
                      <svg class="hamburger-icon" fill="none" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    `}
                  </button>

                  <!-- Desktop Links -->
                  <ul class="nav-links">
                    ${o.map(l=>`
                      <li>
                        <a href="${l.href}" class="nav-link" data-href="${l.href}">
                          ${l.name}
                        </a>
                      </li>
                    `).join("")}
                  </ul>
                </nav>
              </div>

              <!-- LOGO -->
              <div class="logo-container">
                <a href="/" aria-label="ByteBank - Página Inicial" id="logo-link">
                  <img src="${r}" alt="Logo ByteBank" class="logo-large" />
                  <img src="${a}" alt="Logo ByteBank - Small" class="logo-small" />
                </a>
              </div>
            </div>

            <!-- AUTH BUTTONS -->
            ${i?`
              <div class="auth-buttons">
                <a href="/cadastro" class="btn btn-primary" data-auth="signup">
                  Abrir minha conta
                </a>
                <a href="/login" class="btn btn-secondary" data-auth="login">
                  Já tenho conta
                </a>
              </div>
            `:""}
          </div>
        </div>

        <!-- MOBILE MENU -->
        <div class="mobile-menu ${this.mobileMenuOpen?"open":""}" id="mobile-menu">
          ${o.map(l=>`
            <a href="${l.href}" class="nav-link" data-href="${l.href}">
              ${l.name}
            </a>
          `).join("")}
          
          ${i?`
            <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
              <a href="/cadastro" class="btn btn-primary" style="width: 100%;" data-auth="signup">
                Abrir minha conta
              </a>
              <a href="/login" class="btn btn-secondary" style="width: 100%;" data-auth="login">
                Já tenho conta
              </a>
            </div>
          `:""}
        </div>
      </header>
    `}setupEventListeners(){const t=this.shadowRoot.getElementById("mobile-toggle");t==null||t.addEventListener("click",()=>{this.mobileMenuOpen=!this.mobileMenuOpen,this.render(),this.setupEventListeners(),this.dispatchEvent(new CustomEvent("menu-toggle",{bubbles:!0,composed:!0,detail:{isOpen:this.mobileMenuOpen}}))});const n=this.shadowRoot.getElementById("logo-link");n==null||n.addEventListener("click",i=>{i.preventDefault(),this.dispatchEvent(new CustomEvent("logo-click",{bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".nav-link").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault();const l=i.getAttribute("data-href");this.dispatchEvent(new CustomEvent("nav-click",{bubbles:!0,composed:!0,detail:{href:l,label:i.textContent.trim()}})),this.mobileMenuOpen&&(this.mobileMenuOpen=!1,this.render(),this.setupEventListeners())})}),this.shadowRoot.querySelectorAll("[data-auth]").forEach(i=>{i.addEventListener("click",o=>{o.preventDefault();const l=i.getAttribute("data-auth"),s=i.getAttribute("href");this.dispatchEvent(new CustomEvent("auth-click",{bubbles:!0,composed:!0,detail:{action:l,href:s}})),this.mobileMenuOpen&&(this.mobileMenuOpen=!1,this.render(),this.setupEventListeners())})})}setActiveMenuItem(t){this.shadowRoot.querySelectorAll(".nav-link").forEach(r=>{const a=r.getAttribute("data-href")===t;r.classList.toggle("active",a)})}closeMenu(){this.mobileMenuOpen&&(this.mobileMenuOpen=!1,this.render(),this.setupEventListeners())}}customElements.get("bytebank-header")||(customElements.define("bytebank-header",mi),console.log("✅ ByteBank Header com Navbar integrado registrado!"));class gi extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["logo-url","asset-base"]}connectedCallback(){this.render(),this.setupEventListeners()}attributeChangedCallback(){this.render(),this.setupEventListeners()}get assetBase(){return this.getAttribute("asset-base")||""}resolveAsset(t){return t?t.startsWith("http")?t:`${this.assetBase}${t.startsWith("/")?"":"/"}${t}`:""}getServices(){return[{label:"Home",href:"/"},{label:"Dashboard",href:"/dashboard"},{label:"Financeiro",href:"/financeiro"},{label:"Para você",href:"/paravoce"}]}getContacts(){return[{text:"(11) 0800-000-0000"},{text:"meajuda@bytebank.com.br"},{text:"ouvidoria@bytebank.com.br"}]}getSocialLinks(){return[{name:"Instagram",href:"https://instagram.com",icon:"instagram.svg"},{name:"WhatsApp",href:"https://whatsapp.com",icon:"whatsapp.svg"},{name:"YouTube",href:"https://youtube.com",icon:"youtube.svg"}]}render(){const t=this.resolveAsset(this.getAttribute("logo-url")||"logo-white.svg"),n=this.getServices(),r=this.getContacts(),a=this.getSocialLinks();this.shadowRoot.innerHTML=`
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        footer {
          background: #000;
          color: white;
          padding: 2.25rem 0;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .container {
          max-width: 1620px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 1rem;
        }

        section {
          display: flex;
          flex-direction: column;
        }

        h4 {
          margin-bottom: 1.25rem;
          font-size: 1.3rem;
          font-weight: 600;
          color: #47a138;
        }

        .title-footer {
          text-align: left;
        }

        .services-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.3rem;
        }

        .service-link {
          color: white;
          text-decoration: none;
          font-size: 1.13rem;
          transition: color 0.3s;
        }

        .service-link:hover {
          color: #47a138;
        }

        .contact-info {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
          line-height: 1.8;
        }

        .logo-container {
          display: flex;
          margin-top: 0.75rem;
          margin-bottom: 2rem;
        }

        .logo {
          width: 180px;
          height: 35px;
        }

        .social-list {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }

        .social-link {
          display: inline-block;
          transition: transform 0.3s;
        }

        .social-link:hover {
          transform: scale(1.1);
        }

        .social-icon {
          width: 36px;
          height: 36px;
        }

        .social-icon.youtube {
          width: 38px;
          height: 38px;
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .logo-container,
          .social-list {
            justify-content: center;
          }

          .title-footer {
            text-align: center;
          }
        }
      </style>

      <footer>
        <div class="container">
          <div class="grid">

            <section>
              <h4>Serviços</h4>
              <ul class="services-list">
                ${n.map(i=>`
                  <li>
                    <a
                      href="${i.href}"
                      class="service-link"
                      data-service-href="${i.href}"
                    >
                      ${i.label}
                    </a>
                  </li>
                `).join("")}
              </ul>
            </section>

            <section>
              <h4>Contato</h4>
              ${r.map(i=>`
                <p class="contact-info">${i.text}</p>
              `).join("")}
            </section>

            <section>
              <h4 class="title-footer">Desenvolvido por Bytebank</h4>

              <figure class="logo-container">
                <img
                  src="${t}"
                  alt="Logo Branco ByteBank"
                  class="logo"
                />
              </figure>

              <ul class="social-list">
                ${a.map(i=>`
                  <li>
                    <a
                      href="${i.href}"
                      class="social-link"
                      data-social-href="${i.href}"
                      aria-label="${i.name}"
                    >
                      <img
                        src="${this.resolveAsset(i.icon)}"
                        alt="${i.name} icon"
                        class="social-icon ${i.name.toLowerCase()}"
                      />
                    </a>
                  </li>
                `).join("")}
              </ul>
            </section>

          </div>
        </div>
      </footer>
    `}setupEventListeners(){this.shadowRoot.querySelectorAll("[data-service-href]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),this.dispatchEvent(new CustomEvent("service-click",{bubbles:!0,composed:!0,detail:{href:t.getAttribute("data-service-href"),label:t.textContent.trim()}}))})}),this.shadowRoot.querySelectorAll("[data-social-href]").forEach(t=>{t.addEventListener("click",()=>{window.open(t.getAttribute("data-social-href"),"_blank","noopener,noreferrer")})})}}customElements.get("bytebank-footer")||(customElements.define("bytebank-footer",gi),console.log("✅ ByteBank Footer agnóstico registrado!"));function yi(){return N(ti,{children:[g(hi,{}),g(pi,{}),N("div",{className:"flex flex-col min-h-screen",children:[g("bytebank-header",{id:"bytebank-header","logo-url":"logo-green.svg","logo-small-url":"logo-small.svg","show-auth-buttons":"true"}),g("main",{className:"flex-1",children:g(fi,{})}),g("bytebank-footer",{id:"bytebank-footer","logo-url":"logo-white.svg"}),g("script",{dangerouslySetInnerHTML:{__html:`
          (function(){
            try{
              const base = window.__BYTEBANK_ASSET_BASE__ || 'http://localhost:9001';
              const header = document.getElementById('bytebank-header');
              const footer = document.getElementById('bytebank-footer');
              if(header) header.setAttribute('asset-base', base);
              if(footer) footer.setAttribute('asset-base', base);
            }catch(e){console.warn('Failed to set asset-base for bytebank webcomponents', e)}
          })();
        `}})]})]})}const vi=()=>g(Yn,{store:hn,children:g(yi,{})}),bi=Rn({React:He,ReactDOM:Pn,rootComponent:vi,errorBoundary(e,t,n){return console.error("❌ @bytebank/base error:",e,t),He.createElement("div",{style:{padding:16,color:"red"}},"Erro no módulo base")}}),{bootstrap:Li,mount:Oi,unmount:Di}=bi;export{Li as bootstrap,Oi as mount,Di as unmount};
