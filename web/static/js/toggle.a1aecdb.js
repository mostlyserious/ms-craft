(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{82:function(e,t,a){"use strict";function o(e){return e.dataset.toggle?document.querySelector(e.dataset.toggle):e.parentNode}function s(e){Array.prototype.forEach.call(e,e=>{o(e).classList.remove("is-active"),e.setAttribute("aria-expanded","false")})}a.r(t),t.default=e=>{document.body.addEventListener("click",t=>{s(e)}),addEventListener("keydown",t=>{"Escape"===t.code&&s(e)}),Array.prototype.forEach.call(e,t=>{o(t).addEventListener("click",e=>e.stopPropagation()),o(t).setAttribute("aria-expanded","false"),t.addEventListener("click",a=>{var s=a.target,d=o(s);a.stopPropagation(),Array.prototype.forEach.call(e,e=>{o(e).isSameNode(o(s))||s.dataset.toggleGroup&&s.dataset.toggleGroup===e.dataset.toggleGroup||(o(e).classList.remove("is-active"),e.setAttribute("aria-expanded","false"))}),d.classList.toggle("is-active"),d.classList.contains("is-active")?(s.setAttribute("aria-expanded","true"),void 0!==t.dataset.toggleTakeover&&(document.documentElement.classList.add("overflow-hidden"),document.documentElement.classList.add("lg:overflow-auto"))):(s.setAttribute("aria-expanded","false"),void 0!==t.dataset.toggleTakeover&&(document.documentElement.classList.remove("overflow-hidden"),document.documentElement.classList.remove("lg:overflow-auto")))})})}}}]);