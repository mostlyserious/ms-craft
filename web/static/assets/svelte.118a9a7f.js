import{_ as a}from"./main.6bb66536.js";function u(){}function E(o,t){return o!=o?t==t:o!==t||o&&typeof o=="object"||typeof o=="function"}function p(o,t,n){o.insertBefore(t,n||null)}function d(o){o.parentNode.removeChild(o)}Promise.resolve();const _=()=>a(()=>import("./store.c3a24f54.js"),["assets/store.c3a24f54.js","assets/main.6bb66536.js","assets/main.8b044219.css"]),m={},y=o=>{o.forEach(t=>{const n=t.getAttribute("component"),e=m[n];e&&Promise.all([e(),_()]).then(([{default:s},{default:r}])=>{const c=t.querySelectorAll(":scope > template"),l={};c.forEach(f=>{const i=f.getAttribute("slot");l[i||"default"]=f.content}),t.innerHTML="",new s({target:t,store:r,props:{...t.dataset,$$slots:h(l),$$scope:{}}})})})};function h(o){const t={};for(const e in o)Object.prototype.hasOwnProperty.call(o,e)&&(t[e]=[n(o[e])]);function n(e){const s=[...e.childNodes];return function(){return{c:u,l:u,m:(r,c)=>{Array.prototype.forEach.call(s,l=>{p(r,l,c)})},d:r=>{r&&Array.prototype.forEach.call(s,c=>{d(c)})}}}}return t}const A=Object.freeze(Object.defineProperty({__proto__:null,default:y},Symbol.toStringTag,{value:"Module"}));export{A as a,u as n,E as s};