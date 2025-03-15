import{x as y,_ as x,m as B,r as p,q as I,o as m,c as v,d,a as e,w as U,v as C,t as c,b as h,l as k,i as N,p as S,h as $}from"./index-e051bd43.js";/**
 * @license lucide-vue-next v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-vue-next v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=({size:a,strokeWidth:o=2,absoluteStrokeWidth:t,color:s,iconNode:i,name:u,class:g,...l},{slots:r})=>y("svg",{..._,width:a||_.width,height:a||_.height,stroke:s||_.stroke,"stroke-width":t?Number(o)*24/Number(a):o,class:["lucide",`lucide-${z(u??"icon")}`],...l},[...i.map(n=>y(...n)),...r.default?[r.default()]:[]]);/**
 * @license lucide-vue-next v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=(a,o)=>(t,{slots:s})=>y(A,{...t,iconNode:o,name:a},s);/**
 * @license lucide-vue-next v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=f("BadgeCheckIcon",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-vue-next v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=f("ShieldIcon",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-vue-next v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=f("UserIcon",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);const b=a=>(S("data-v-05a4de9a"),a=a(),$(),a),M={class:"container"},D={class:"card"},L=b(()=>e("h2",{class:"titulo"},"Buscar Usuario",-1)),Z={class:"search-bar"},j=["disabled"],q={key:0,class:"user-card"},H={class:"avatar"},K={class:"user-info"},O={class:"nombre"},R={class:"info-item"},F=b(()=>e("strong",null,"Usuario:",-1)),G={class:"info-item"},J=b(()=>e("strong",null,"Rol:",-1)),P={key:1,class:"info-text"},Q={__name:"UsuariosBuscar",setup(a){const o=B(),t=p(""),s=p(null),i=p(!1),u=localStorage.getItem("access_token"),g=async()=>{var l,r;if(!t.value.trim()){o.add({severity:"warn",summary:"Atención",detail:"Ingresa un nombre de usuario.",life:3e3});return}if(!u){o.add({severity:"error",summary:"Error",detail:"No tienes permisos para buscar usuarios.",life:3e3});return}i.value=!0;try{const n=await N.get(`http://127.0.0.1:8000/usuarios/buscar/${t.value.trim()}`,{headers:{Authorization:`Bearer ${u}`}});s.value=n.data,o.add({severity:"success",summary:"Usuario encontrado",detail:`Usuario: ${s.value.username}`,life:4e3})}catch(n){s.value=null,((l=n.response)==null?void 0:l.status)===404?o.add({severity:"warn",summary:"No encontrado",detail:"El usuario no existe.",life:4e3}):((r=n.response)==null?void 0:r.status)===403?o.add({severity:"error",summary:"Acceso denegado",detail:"No tienes permisos.",life:4e3}):o.add({severity:"error",summary:"Error",detail:"Ocurrió un problema al buscar el usuario.",life:4e3})}finally{i.value=!1}};return(l,r)=>{const n=I("Toast");return m(),v("div",M,[d(n),e("div",D,[L,e("div",Z,[U(e("input",{type:"text","onUpdate:modelValue":r[0]||(r[0]=w=>t.value=w),placeholder:"Ingrese el nombre de usuario"},null,512),[[C,t.value]]),e("button",{onClick:g,disabled:i.value},c(i.value?"Buscando...":"Buscar"),9,j)]),s.value?(m(),v("div",q,[e("div",H,[d(h(E),{size:"50"})]),e("div",K,[e("h3",O,c(s.value.nombre)+" "+c(s.value.apellido_paterno)+" "+c(s.value.apellido_materno),1),e("div",R,[d(h(T),{size:"20"}),e("span",null,[F,k(" "+c(s.value.username),1)])]),e("div",G,[d(h(V),{size:"20"}),e("span",null,[J,k(" "+c(s.value.role),1)])])])])):(m(),v("p",P,"Ingresa un nombre de usuario para buscar."))])])}}},Y=x(Q,[["__scopeId","data-v-05a4de9a"]]);export{Y as default};
