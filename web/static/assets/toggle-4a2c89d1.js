const f=o=>{document.body.addEventListener("click",t=>{u(o)}),addEventListener("keydown",t=>{t.code==="Escape"&&u(o)}),Array.from(o).forEach(t=>{const e=d(t),s=t.dataset.toggleClass?t.dataset.toggleClass:"is-active";e.addEventListener("click",a=>a.stopPropagation()),t.setAttribute("aria-expanded","false"),n(e,!0),t.addEventListener("click",a=>{const i=document.querySelectorAll(`[data-toggle="${t.dataset.toggle}"]`),g=t.dataset.toggleLockScroll!==void 0;let l=parseInt(t.dataset.toggleDuration??"");l||(l=parseFloat(window.getComputedStyle(e).transitionDuration)*1e3),Array.from(o).forEach(r=>{const c=d(r);!c.isSameNode(e)&&(!t.dataset.toggleGroup||r.dataset.toggleGroup!==t.dataset.toggleGroup)&&(c.classList.remove(s),r.setAttribute("aria-expanded","false"),setTimeout(()=>n(c,!0),l))}),e.classList.contains(s)?(Array.from(i).forEach(r=>r.setAttribute("aria-expanded","false")),g&&(document.body.style.overflow="auto"),setTimeout(()=>n(e,!0),l)):(setTimeout(()=>n(e,!1),l),g&&(document.body.style.overflow="hidden"),Array.from(i).forEach(r=>r.setAttribute("aria-expanded","true"))),setTimeout(()=>e.classList.toggle(s),50),a.stopPropagation()})})};function d(o){const t=document.querySelector(o.dataset.toggle??""),e=o.parentElement;return t??e}function u(o){Array.from(o).forEach(t=>{const e=d(t),s=t.dataset.toggleLockScroll!==void 0,a=t.dataset.toggleClass?t.dataset.toggleClass:"is-active";let i=parseInt(t.dataset.toggleDuration??"");i||(i=parseFloat(window.getComputedStyle(e).transitionDuration)*1e3),e.classList.remove(a),t.setAttribute("aria-expanded","false"),s&&(document.body.style.overflow="auto"),setTimeout(()=>{n(e,!0)},i)})}function n(o,t){const e=o.querySelectorAll(".toggle\\:invisible"),s=o.querySelectorAll(".toggle\\:visible");t?(Array.from(e).forEach(a=>a.classList.remove("invisible")),Array.from(s).forEach(a=>a.classList.add("invisible"))):(Array.from(e).forEach(a=>a.classList.add("invisible")),Array.from(s).forEach(a=>a.classList.remove("invisible")))}export{f as default};
