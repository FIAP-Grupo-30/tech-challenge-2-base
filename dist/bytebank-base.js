import*as d from"react";import T,{useEffect as j}from"react";import*as de from"react-dom";import ue from"single-spa-react";import{jsx as p,jsxs as E}from"react/jsx-runtime";/**
 * @remix-run/router v1.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},R.apply(this,arguments)}var C;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(C||(C={}));const F="popstate";function he(e){e===void 0&&(e={});function t(a,i){let{pathname:r,search:o,hash:l}=a.location;return z("",{pathname:r,search:o,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(a,i){return typeof i=="string"?i:K(i)}return pe(t,n,null,e)}function v(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function G(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function me(){return Math.random().toString(36).substr(2,8)}function V(e,t){return{usr:e.state,key:e.key,idx:t}}function z(e,t,n,a){return n===void 0&&(n=null),R({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?S(t):t,{state:n,key:t&&t.key||a||me()})}function K(e){let{pathname:t="/",search:n="",hash:a=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),a&&a!=="#"&&(t+=a.charAt(0)==="#"?a:"#"+a),t}function S(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let a=e.indexOf("?");a>=0&&(t.search=e.substr(a),e=e.substr(0,a)),e&&(t.pathname=e)}return t}function pe(e,t,n,a){a===void 0&&(a={});let{window:i=document.defaultView,v5Compat:r=!1}=a,o=i.history,l=C.Pop,s=null,h=u();h==null&&(h=0,o.replaceState(R({},o.state,{idx:h}),""));function u(){return(o.state||{idx:null}).idx}function c(){l=C.Pop;let m=u(),y=m==null?null:m-h;h=m,s&&s({action:l,location:g.location,delta:y})}function f(m,y){l=C.Push;let I=z(g.location,m,y);h=u()+1;let w=V(I,h),B=g.createHref(I);try{o.pushState(w,"",B)}catch(Z){if(Z instanceof DOMException&&Z.name==="DataCloneError")throw Z;i.location.assign(B)}r&&s&&s({action:l,location:g.location,delta:1})}function x(m,y){l=C.Replace;let I=z(g.location,m,y);h=u();let w=V(I,h),B=g.createHref(I);o.replaceState(w,"",B),r&&s&&s({action:l,location:g.location,delta:0})}function b(m){let y=i.location.origin!=="null"?i.location.origin:i.location.href,I=typeof m=="string"?m:K(m);return I=I.replace(/ $/,"%20"),v(y,"No window.location.(origin|href) available to create URL for href: "+I),new URL(I,y)}let g={get action(){return l},get location(){return e(i,o)},listen(m){if(s)throw new Error("A history only accepts one active listener");return i.addEventListener(F,c),s=m,()=>{i.removeEventListener(F,c),s=null}},createHref(m){return t(i,m)},createURL:b,encodeLocation(m){let y=b(m);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:f,replace:x,go(m){return o.go(m)}};return g}var H;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(H||(H={}));function fe(e,t,n){return n===void 0&&(n="/"),ge(e,t,n)}function ge(e,t,n,a){let i=typeof t=="string"?S(t):t,r=ne(i.pathname||"/",n);if(r==null)return null;let o=ee(e);ve(o);let l=null;for(let s=0;l==null&&s<o.length;++s){let h=Ne(r);l=Se(o[s],h)}return l}function ee(e,t,n,a){t===void 0&&(t=[]),n===void 0&&(n=[]),a===void 0&&(a="");let i=(r,o,l)=>{let s={relativePath:l===void 0?r.path||"":l,caseSensitive:r.caseSensitive===!0,childrenIndex:o,route:r};s.relativePath.startsWith("/")&&(v(s.relativePath.startsWith(a),'Absolute route path "'+s.relativePath+'" nested under path '+('"'+a+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),s.relativePath=s.relativePath.slice(a.length));let h=k([a,s.relativePath]),u=n.concat(s);r.children&&r.children.length>0&&(v(r.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),ee(r.children,t,u,h)),!(r.path==null&&!r.index)&&t.push({path:h,score:Ee(h,r.index),routesMeta:u})};return e.forEach((r,o)=>{var l;if(r.path===""||!((l=r.path)!=null&&l.includes("?")))i(r,o);else for(let s of te(r.path))i(r,o,s)}),t}function te(e){let t=e.split("/");if(t.length===0)return[];let[n,...a]=t,i=n.endsWith("?"),r=n.replace(/\?$/,"");if(a.length===0)return i?[r,""]:[r];let o=te(a.join("/")),l=[];return l.push(...o.map(s=>s===""?r:[r,s].join("/"))),i&&l.push(...o),l.map(s=>e.startsWith("/")&&s===""?"/":s)}function ve(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:ke(t.routesMeta.map(a=>a.childrenIndex),n.routesMeta.map(a=>a.childrenIndex)))}const be=/^:[\w-]+$/,xe=3,ye=2,Ie=1,we=10,Ce=-2,_=e=>e==="*";function Ee(e,t){let n=e.split("/"),a=n.length;return n.some(_)&&(a+=Ce),t&&(a+=ye),n.filter(i=>!_(i)).reduce((i,r)=>i+(be.test(r)?xe:r===""?Ie:we),a)}function ke(e,t){return e.length===t.length&&e.slice(0,-1).every((a,i)=>a===t[i])?e[e.length-1]-t[t.length-1]:0}function Se(e,t,n){let{routesMeta:a}=e,i={},r="/",o=[];for(let l=0;l<a.length;++l){let s=a[l],h=l===a.length-1,u=r==="/"?t:t.slice(r.length)||"/",c=Pe({path:s.relativePath,caseSensitive:s.caseSensitive,end:h},u),f=s.route;if(!c)return null;Object.assign(i,c.params),o.push({params:i,pathname:k([r,c.pathname]),pathnameBase:je(k([r,c.pathnameBase])),route:f}),c.pathnameBase!=="/"&&(r=k([r,c.pathnameBase]))}return o}function Pe(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=Re(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let r=i[0],o=r.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:a.reduce((h,u,c)=>{let{paramName:f,isOptional:x}=u;if(f==="*"){let g=l[c]||"";o=r.slice(0,r.length-g.length).replace(/(.)\/+$/,"$1")}const b=l[c];return x&&!b?h[f]=void 0:h[f]=(b||"").replace(/%2F/g,"/"),h},{}),pathname:r,pathnameBase:o,pattern:e}}function Re(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),G(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let a=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,s)=>(a.push({paramName:l,isOptional:s!=null}),s?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(a.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),a]}function Ne(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return G(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function ne(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,a=e.charAt(n);return a&&a!=="/"?null:e.slice(n)||"/"}const Be=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Le=e=>Be.test(e);function Me(e,t){t===void 0&&(t="/");let{pathname:n,search:a="",hash:i=""}=typeof e=="string"?S(e):e,r;if(n)if(Le(n))r=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),G(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?r=Y(n.substring(1),"/"):r=Y(n,t)}else r=t;return{pathname:r,search:ze(a),hash:Oe(i)}}function Y(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function U(e,t,n,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Ae(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function Ze(e,t){let n=Ae(e);return t?n.map((a,i)=>i===n.length-1?a.pathname:a.pathnameBase):n.map(a=>a.pathnameBase)}function Ue(e,t,n,a){a===void 0&&(a=!1);let i;typeof e=="string"?i=S(e):(i=R({},e),v(!i.pathname||!i.pathname.includes("?"),U("?","pathname","search",i)),v(!i.pathname||!i.pathname.includes("#"),U("#","pathname","hash",i)),v(!i.search||!i.search.includes("#"),U("#","search","hash",i)));let r=e===""||i.pathname==="",o=r?"/":i.pathname,l;if(o==null)l=n;else{let c=t.length-1;if(!a&&o.startsWith("..")){let f=o.split("/");for(;f[0]==="..";)f.shift(),c-=1;i.pathname=f.join("/")}l=c>=0?t[c]:"/"}let s=Me(i,l),h=o&&o!=="/"&&o.endsWith("/"),u=(r||o===".")&&n.endsWith("/");return!s.pathname.endsWith("/")&&(h||u)&&(s.pathname+="/"),s}const k=e=>e.join("/").replace(/\/\/+/g,"/"),je=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),ze=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Oe=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ge(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const ae=["post","put","patch","delete"];new Set(ae);const De=["get",...ae];new Set(De);/**
 * React Router v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function N(){return N=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},N.apply(this,arguments)}const D=d.createContext(null),$e=d.createContext(null),L=d.createContext(null),M=d.createContext(null),P=d.createContext({outlet:null,matches:[],isDataRoute:!1}),re=d.createContext(null);function A(){return d.useContext(M)!=null}function $(){return A()||v(!1),d.useContext(M).location}function ie(e){d.useContext(L).static||d.useLayoutEffect(e)}function W(){let{isDataRoute:e}=d.useContext(P);return e?et():We()}function We(){A()||v(!1);let e=d.useContext(D),{basename:t,future:n,navigator:a}=d.useContext(L),{matches:i}=d.useContext(P),{pathname:r}=$(),o=JSON.stringify(Ze(i,n.v7_relativeSplatPath)),l=d.useRef(!1);return ie(()=>{l.current=!0}),d.useCallback(function(h,u){if(u===void 0&&(u={}),!l.current)return;if(typeof h=="number"){a.go(h);return}let c=Ue(h,JSON.parse(o),r,u.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:k([t,c.pathname])),(u.replace?a.replace:a.push)(c,u.state,u)},[t,a,o,r,e])}function Te(e,t){return Fe(e,t)}function Fe(e,t,n,a){A()||v(!1);let{navigator:i}=d.useContext(L),{matches:r}=d.useContext(P),o=r[r.length-1],l=o?o.params:{};o&&o.pathname;let s=o?o.pathnameBase:"/";o&&o.route;let h=$(),u;if(t){var c;let m=typeof t=="string"?S(t):t;s==="/"||(c=m.pathname)!=null&&c.startsWith(s)||v(!1),u=m}else u=h;let f=u.pathname||"/",x=f;if(s!=="/"){let m=s.replace(/^\//,"").split("/");x="/"+f.replace(/^\//,"").split("/").slice(m.length).join("/")}let b=fe(e,{pathname:x}),g=Je(b&&b.map(m=>Object.assign({},m,{params:Object.assign({},l,m.params),pathname:k([s,i.encodeLocation?i.encodeLocation(m.pathname).pathname:m.pathname]),pathnameBase:m.pathnameBase==="/"?s:k([s,i.encodeLocation?i.encodeLocation(m.pathnameBase).pathname:m.pathnameBase])})),r,n,a);return t&&g?d.createElement(M.Provider,{value:{location:N({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:C.Pop}},g):g}function Ve(){let e=Ke(),t=Ge(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return d.createElement(d.Fragment,null,d.createElement("h2",null,"Unexpected Application Error!"),d.createElement("h3",{style:{fontStyle:"italic"}},t),n?d.createElement("pre",{style:i},n):null,null)}const He=d.createElement(Ve,null);class _e extends d.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?d.createElement(P.Provider,{value:this.props.routeContext},d.createElement(re.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Ye(e){let{routeContext:t,match:n,children:a}=e,i=d.useContext(D);return i&&i.static&&i.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=n.route.id),d.createElement(P.Provider,{value:t},a)}function Je(e,t,n,a){var i;if(t===void 0&&(t=[]),n===void 0&&(n=null),a===void 0&&(a=null),e==null){var r;if(!n)return null;if(n.errors)e=n.matches;else if((r=a)!=null&&r.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let o=e,l=(i=n)==null?void 0:i.errors;if(l!=null){let u=o.findIndex(c=>c.route.id&&(l==null?void 0:l[c.route.id])!==void 0);u>=0||v(!1),o=o.slice(0,Math.min(o.length,u+1))}let s=!1,h=-1;if(n&&a&&a.v7_partialHydration)for(let u=0;u<o.length;u++){let c=o[u];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(h=u),c.route.id){let{loaderData:f,errors:x}=n,b=c.route.loader&&f[c.route.id]===void 0&&(!x||x[c.route.id]===void 0);if(c.route.lazy||b){s=!0,h>=0?o=o.slice(0,h+1):o=[o[0]];break}}}return o.reduceRight((u,c,f)=>{let x,b=!1,g=null,m=null;n&&(x=l&&c.route.id?l[c.route.id]:void 0,g=c.route.errorElement||He,s&&(h<0&&f===0?(tt("route-fallback"),b=!0,m=null):h===f&&(b=!0,m=c.route.hydrateFallbackElement||null)));let y=t.concat(o.slice(0,f+1)),I=()=>{let w;return x?w=g:b?w=m:c.route.Component?w=d.createElement(c.route.Component,null):c.route.element?w=c.route.element:w=u,d.createElement(Ye,{match:c,routeContext:{outlet:u,matches:y,isDataRoute:n!=null},children:w})};return n&&(c.route.ErrorBoundary||c.route.errorElement||f===0)?d.createElement(_e,{location:n.location,revalidation:n.revalidation,component:g,error:x,children:I(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):I()},null)}var oe=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(oe||{}),le=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(le||{});function qe(e){let t=d.useContext(D);return t||v(!1),t}function Qe(e){let t=d.useContext($e);return t||v(!1),t}function Xe(e){let t=d.useContext(P);return t||v(!1),t}function se(e){let t=Xe(),n=t.matches[t.matches.length-1];return n.route.id||v(!1),n.route.id}function Ke(){var e;let t=d.useContext(re),n=Qe(),a=se();return t!==void 0?t:(e=n.errors)==null?void 0:e[a]}function et(){let{router:e}=qe(oe.UseNavigateStable),t=se(le.UseNavigateStable),n=d.useRef(!1);return ie(()=>{n.current=!0}),d.useCallback(function(i,r){r===void 0&&(r={}),n.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,N({fromRouteId:t},r)))},[e,t])}const J={};function tt(e,t,n){J[e]||(J[e]=!0)}function nt(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function ce(e){v(!1)}function at(e){let{basename:t="/",children:n=null,location:a,navigationType:i=C.Pop,navigator:r,static:o=!1,future:l}=e;A()&&v(!1);let s=t.replace(/^\/*/,"/"),h=d.useMemo(()=>({basename:s,navigator:r,static:o,future:N({v7_relativeSplatPath:!1},l)}),[s,l,r,o]);typeof a=="string"&&(a=S(a));let{pathname:u="/",search:c="",hash:f="",state:x=null,key:b="default"}=a,g=d.useMemo(()=>{let m=ne(u,s);return m==null?null:{location:{pathname:m,search:c,hash:f,state:x,key:b},navigationType:i}},[s,u,c,f,x,b,i]);return g==null?null:d.createElement(L.Provider,{value:h},d.createElement(M.Provider,{children:n,value:g}))}function rt(e){let{children:t,location:n}=e;return Te(O(t),n)}new Promise(()=>{});function O(e,t){t===void 0&&(t=[]);let n=[];return d.Children.forEach(e,(a,i)=>{if(!d.isValidElement(a))return;let r=[...t,i];if(a.type===d.Fragment){n.push.apply(n,O(a.props.children,r));return}a.type!==ce&&v(!1),!a.props.index||!a.props.children||v(!1);let o={id:a.props.id||r.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(o.children=O(a.props.children,r)),n.push(o)}),n}/**
 * React Router DOM v6.30.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const it="6";try{window.__reactRouterVersion=it}catch{}const ot="startTransition",q=d[ot];function lt(e){let{basename:t,children:n,future:a,window:i}=e,r=d.useRef();r.current==null&&(r.current=he({window:i,v5Compat:!0}));let o=r.current,[l,s]=d.useState({action:o.action,location:o.location}),{v7_startTransition:h}=a||{},u=d.useCallback(c=>{h&&q?q(()=>s(c)):s(c)},[s,h]);return d.useLayoutEffect(()=>o.listen(u),[o,u]),d.useEffect(()=>nt(a),[a]),d.createElement(at,{basename:t,children:n,location:l.location,navigationType:l.action,navigator:o,future:a})}var Q;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Q||(Q={}));var X;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(X||(X={}));const st=[{id:1,imagemUrl:"conta-e-cartao-gratuitos.svg",titulo:"Conta e cartão gratuitos",descricao:"Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."},{id:2,imagemUrl:"saques-sem-custo.svg",titulo:"Saques sem custo",descricao:"Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h em qualquer lugar do país."},{id:3,imagemUrl:"programa-de-pontos.svg",titulo:"Programa de pontos",descricao:"Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"},{id:4,imagemUrl:"seguro-dispositivos.svg",titulo:"Seguro dispositivos",descricao:"Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica."}],ct="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgOTAwIDQ1MCI+CiAgPHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiNlOWVjZWYiLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyOCIgZmlsbD0iIzAwNEQ2MSI+QmFubmVyIFBsYWNlaG9sZGVyPC90ZXh0Pgo8L3N2Zz4=",dt="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmM2ZhZjciLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzQ3QTEzOCI+Q29udGE8L3RleHQ+PC9zdmc+",ut="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmZmY3ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iI2ZmNmI2YiI+U2FxdWVzPC90ZXh0Pjwvc3ZnPg==",ht="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmZmZhZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iI2YzOWMxMiI+UG9udG9zPC90ZXh0Pjwvc3ZnPg==",mt="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NCIgaGVpZ2h0PSI1NiIgdmlld0JveD0iMCAwIDc0IDU2Ij48cmVjdCB3aWR0aD0iNzQiIGhlaWdodD0iNTYiIGZpbGw9IiNmMGY5ZmYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzQ1YjdkMSI+U2VndXJvPC90ZXh0Pjwvc3ZnPg==";function pt(){const e=W();return p("div",{className:"flex flex-col bg-[#FFF]",children:p("div",{className:"bg-gradient-to-b from-[#004D61] to-[#FFF] pt-10 pb-23",children:E("div",{className:"container mx-auto",children:[E("div",{className:"grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 mb-18 gap-14 p-5",children:[p("section",{children:p("div",{className:"flex items-center h-full",children:p("div",{children:p("h1",{className:"font-bold text-[33px] leading-[1.5em] lg:text-left md:text-center text-center",children:"Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!"})})})}),p("section",{children:p("img",{className:"mx-auto max-w-full h-auto",src:ct,alt:"Banner",width:"900",height:"450"})})]}),p("div",{className:"sm:block md:block lg:hidden mb-18 pl-4 pr-4",children:E("div",{className:"flex gap-5 md:grid-cols-2",children:[p("button",{onClick:()=>e("/cadastro"),className:"inline-flex justify-center items-center h-14 text-center rounded-[8px] bg-[#000] hover:bg-[transparent] border-[3px] border-[#000] w-full font-semibold text-[#FFF] text-[19px] hover:text-[#000] transition duration-300","aria-label":"Abrir minha conta",children:"Abrir minha conta"}),p("button",{onClick:()=>e("/login"),className:"inline-flex justify-center items-center h-14 text-center rounded-[8px] bg-transparent hover:bg-[#000] border-[3px] border-[#000] w-full font-semibold text-[#000] hover:text-[#FFF] text-[19px] transition duration-300","aria-label":"Já tenho conta",children:"Já tenho conta"})]})}),E("div",{children:[p("h2",{className:"text-center font-bold text-[30px] mb-16",children:"Vantagens do nosso banco:"}),p("div",{className:"grid gap-14 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4",children:st.map(t=>E("section",{className:"text-center p-4",children:[p("figure",{children:p("img",{className:"mx-auto w-20 h-auto",src:t.imagemUrl==="conta-e-cartao-gratuitos.svg"?dt:t.imagemUrl==="saques-sem-custo.svg"?ut:t.imagemUrl==="programa-de-pontos.svg"?ht:t.imagemUrl==="seguro-dispositivos.svg"?mt:"",alt:t.titulo,width:"74",height:"56"})}),p("h3",{className:"font-bold text-[22px] text-[#47A138] mt-5 mb-5",children:t.titulo}),p("p",{className:"text-[#767676] text-[19px]",children:t.descricao})]},t.id))})]})]})})})}function ft(){return p(rt,{children:p(ce,{path:"/",element:p(pt,{})})})}function gt(){const e=W(),t=$();return j(()=>{const n=r=>{var o;(o=r.detail)!=null&&o.href&&e(r.detail.href)},a=()=>{e("/")},i=r=>{var o;(o=r.detail)!=null&&o.href&&e(r.detail.href)};return window.addEventListener("nav-click",n),window.addEventListener("logo-click",a),window.addEventListener("auth-click",i),()=>{window.removeEventListener("nav-click",n),window.removeEventListener("logo-click",a),window.removeEventListener("auth-click",i)}},[e]),j(()=>{const n=document.querySelector("bytebank-header");n==null||n.setActiveMenuItem(t.pathname)},[t.pathname]),null}function vt(){const e=W();return j(()=>{const t=n=>{var a;(a=n.detail)!=null&&a.href&&e(n.detail.href)};return window.addEventListener("service-click",t),()=>{window.removeEventListener("service-click",t)}},[e]),null}class bt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.mobileMenuOpen=!1}static get observedAttributes(){return["logo-url","logo-small-url","show-auth-buttons"]}connectedCallback(){this.render(),this.setupEventListeners()}attributeChangedCallback(){this.render(),this.setupEventListeners()}getNavItems(){const t=this.querySelector('[slot="menu"]');if(t){const n=t.querySelectorAll("[data-menu-item]");if(n.length>0)return Array.from(n).map(a=>({name:a.getAttribute("data-label"),href:a.getAttribute("data-href")||"#"}))}return[{name:"Home",href:"/"},{name:"Dashboard",href:"/dashboard"},{name:"Financeiro",href:"/financeiro"},{name:"Para você",href:"/paravoce"}]}render(){const t=this.getAttribute("logo-url")||"logo-green.svg",n=this.getAttribute("logo-small-url")||"logo-small.svg",a=this.resolveAsset?this.resolveAsset(t):t,i=this.resolveAsset?this.resolveAsset(n):n,r=this.getAttribute("show-auth-buttons")!=="false",o=this.getNavItems();this.shadowRoot.innerHTML=`
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
                  <img src="${a}" alt="Logo ByteBank" class="logo-large" />
                  <img src="${i}" alt="Logo ByteBank - Small" class="logo-small" />
                </a>
              </div>
            </div>

            <!-- AUTH BUTTONS -->
            ${r?`
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
          
          ${r?`
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
    `}setupEventListeners(){const t=this.shadowRoot.getElementById("mobile-toggle");t==null||t.addEventListener("click",()=>{this.mobileMenuOpen=!this.mobileMenuOpen,this.render(),this.setupEventListeners(),this.dispatchEvent(new CustomEvent("menu-toggle",{bubbles:!0,composed:!0,detail:{isOpen:this.mobileMenuOpen}}))});const n=this.shadowRoot.getElementById("logo-link");n==null||n.addEventListener("click",r=>{r.preventDefault(),this.dispatchEvent(new CustomEvent("logo-click",{bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".nav-link").forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();const l=r.getAttribute("data-href");this.dispatchEvent(new CustomEvent("nav-click",{bubbles:!0,composed:!0,detail:{href:l,label:r.textContent.trim()}})),this.mobileMenuOpen&&(this.mobileMenuOpen=!1,this.render(),this.setupEventListeners())})}),this.shadowRoot.querySelectorAll("[data-auth]").forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();const l=r.getAttribute("data-auth"),s=r.getAttribute("href");this.dispatchEvent(new CustomEvent("auth-click",{bubbles:!0,composed:!0,detail:{action:l,href:s}})),this.mobileMenuOpen&&(this.mobileMenuOpen=!1,this.render(),this.setupEventListeners())})})}setActiveMenuItem(t){this.shadowRoot.querySelectorAll(".nav-link").forEach(a=>{const i=a.getAttribute("data-href")===t;a.classList.toggle("active",i)})}closeMenu(){this.mobileMenuOpen&&(this.mobileMenuOpen=!1,this.render(),this.setupEventListeners())}}customElements.get("bytebank-header")||(customElements.define("bytebank-header",bt),console.log("✅ ByteBank Header com Navbar integrado registrado!"));class xt extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return["logo-url","asset-base"]}connectedCallback(){this.render(),this.setupEventListeners()}attributeChangedCallback(){this.render(),this.setupEventListeners()}get assetBase(){return this.getAttribute("asset-base")||""}resolveAsset(t){return t?t.startsWith("http")?t:`${this.assetBase}${t.startsWith("/")?"":"/"}${t}`:""}getServices(){return[{label:"Home",href:"/"},{label:"Dashboard",href:"/dashboard"},{label:"Financeiro",href:"/financeiro"},{label:"Para você",href:"/paravoce"}]}getContacts(){return[{text:"(11) 0800-000-0000"},{text:"meajuda@bytebank.com.br"},{text:"ouvidoria@bytebank.com.br"}]}getSocialLinks(){return[{name:"Instagram",href:"https://instagram.com",icon:"instagram.svg"},{name:"WhatsApp",href:"https://whatsapp.com",icon:"whatsapp.svg"},{name:"YouTube",href:"https://youtube.com",icon:"youtube.svg"}]}render(){const t=this.resolveAsset(this.getAttribute("logo-url")||"logo-white.svg"),n=this.getServices(),a=this.getContacts(),i=this.getSocialLinks();this.shadowRoot.innerHTML=`
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
                ${n.map(r=>`
                  <li>
                    <a
                      href="${r.href}"
                      class="service-link"
                      data-service-href="${r.href}"
                    >
                      ${r.label}
                    </a>
                  </li>
                `).join("")}
              </ul>
            </section>

            <section>
              <h4>Contato</h4>
              ${a.map(r=>`
                <p class="contact-info">${r.text}</p>
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
                ${i.map(r=>`
                  <li>
                    <a
                      href="${r.href}"
                      class="social-link"
                      data-social-href="${r.href}"
                      aria-label="${r.name}"
                    >
                      <img
                        src="${this.resolveAsset(r.icon)}"
                        alt="${r.name} icon"
                        class="social-icon ${r.name.toLowerCase()}"
                      />
                    </a>
                  </li>
                `).join("")}
              </ul>
            </section>

          </div>
        </div>
      </footer>
    `}setupEventListeners(){this.shadowRoot.querySelectorAll("[data-service-href]").forEach(t=>{t.addEventListener("click",n=>{n.preventDefault(),this.dispatchEvent(new CustomEvent("service-click",{bubbles:!0,composed:!0,detail:{href:t.getAttribute("data-service-href"),label:t.textContent.trim()}}))})}),this.shadowRoot.querySelectorAll("[data-social-href]").forEach(t=>{t.addEventListener("click",()=>{window.open(t.getAttribute("data-social-href"),"_blank","noopener,noreferrer")})})}}customElements.get("bytebank-footer")||(customElements.define("bytebank-footer",xt),console.log("✅ ByteBank Footer agnóstico registrado!"));function yt(){return E(lt,{children:[p(gt,{}),p(vt,{}),E("div",{className:"flex flex-col min-h-screen",children:[p("bytebank-header",{id:"bytebank-header","logo-url":"logo-green.svg","logo-small-url":"logo-small.svg","show-auth-buttons":"true"}),p("main",{className:"flex-1",children:p(ft,{})}),p("bytebank-footer",{id:"bytebank-footer","logo-url":"logo-white.svg"}),p("script",{dangerouslySetInnerHTML:{__html:`
          (function(){
            try{
              const base = window.__BYTEBANK_ASSET_BASE__ || 'http://localhost:9001';
              const header = document.getElementById('bytebank-header');
              const footer = document.getElementById('bytebank-footer');
              if(header) header.setAttribute('asset-base', base);
              if(footer) footer.setAttribute('asset-base', base);
            }catch(e){console.warn('Failed to set asset-base for bytebank webcomponents', e)}
          })();
        `}})]})]})}const It=ue({React:T,ReactDOM:de,rootComponent:yt,errorBoundary(e,t,n){return console.error("❌ @bytebank/base error:",e,t),T.createElement("div",{style:{padding:16,color:"red"}},"Erro no módulo base")}}),{bootstrap:kt,mount:St,unmount:Pt}=It;export{kt as bootstrap,St as mount,Pt as unmount};
