!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("regenerator-runtime"),require("jszip")):"function"==typeof define&&define.amd?define(["regenerator-runtime","jszip"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).regeneratorRuntime,t.JSZip)}(this,(function(t,e){"use strict";function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var o=n(t),r=n(e);const i=Symbol("season-tip-private"),s=Symbol("season-tip-resolve"),a=Symbol("season-tip-options"),c=Symbol("season-tip-timerid"),u=Symbol("season-tip-result"),l={center:"center",left:"flex-start",right:"flex-end",top:"flex-start",bottom:"flex-end",start:"flex-start",end:"flex-end"};function d(t){let e=[...document.body.querySelectorAll("*")].reduce(((t,e)=>Math.max(t,Number(window.getComputedStyle(e).zIndex)||0)),0)+1;Number(t.style.zIndex)===e-1&&1!==e||(t.style.zIndex=e)}const p={transition:"transitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd",OTransition:"oTransitionEnd otransitionend"};let f;for(let t in p)if(void 0!==document.body.style[t]){f=p[t];break}function h(t){this[u]=t;const e=this[i],n=this[a],o=()=>{"function"==typeof e.remove&&setTimeout((()=>e.remove()),0),this[c]&&(clearTimeout(this[c]),this[c]=void 0);const o=n&&n.onclose;"function"==typeof o&&o(this,t),"function"==typeof this[s]&&(this[s](t),delete this[s])};e instanceof Element&&e.isConnected&&(f&&0!==n.fadeOutTime?(isNaN(n.fadeOutTime)||e.setAttribute("style",`--fadeout-time:${n.fadeOutTime}s;${e.getAttribute("style")}`),e.className=`${e.className} -season-tip-fadeout`,e.addEventListener(f,o,{once:!0})):o())}const m='season-tip-type="tip"',g=`<div class="-season-tip-container" ${m} />`;function b(t,e){if("object"!=typeof(e=e||{type:"normal"})&&(e={type:String(e)}),!(this instanceof b)){const n=new b(t,e);return n&&n.show(),n}{const n=document.createElement("div");if(n&&(this[i]=n,this[a]=e,n.setAttribute("class","-season-tip-box"),n.setAttribute("d-season-tip-type",e.type||"normal"),e.customTag&&n.setAttribute(e.customTag,e.customTag),n.insertAdjacentHTML("beforeend",`<div class="-season-tip-icon"></div><div class="-season-tip-text">${String(t||"").replace("\n","<br />")}</div>`),e.closable)){n.insertAdjacentHTML("beforeend",'<div class="-season-tip-close-button" />');const t=n.querySelector(".-season-tip-close-button");t&&t.addEventListener("click",h.bind(this))}}}b.prototype={close:h,show(t){const e=this[i];if(this instanceof b&&e&&!e.isConnected){t instanceof HTMLElement||(t=document.body);let n=t.querySelector(`[${m}]`);if(n||(t.insertAdjacentHTML("afterbegin",g),n=t.querySelector(`[${m}]`)),n){d(n),n.insertAdjacentElement("afterbegin",e),setTimeout((()=>e.className="-season-tip-box -season-tip-fadein"),0);const t=Number(this[a].timeout)||(this[a].closable?0:3e3);t&&(this[c]=setTimeout(h.bind(this),t))}}}};const v={info:'<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#40a9ff" stroke-width="4"><g><path d="M47.979 10C27.0038 10 10 27.0038 10 47.979 10 68.9542 27.0038 85.958 47.979 85.958 68.9542 85.958 85.958 68.9542 85.958 47.979 85.9674 27.0132 68.9788 10.0094 48.013 10 48.0017 10 47.9903 10 47.979 10ZM47.979 83.958C28.1083 83.958 12 67.8497 12 47.979 12 28.1083 28.1083 12 47.979 12 67.8497 12 83.958 28.1083 83.958 47.979 83.9354 67.8403 67.8403 83.9354 47.979 83.958Z"/><path d="M49 35 41 35 41 37 47 37 47 67 40 67 40 69 56 69 56 67 49 67 49 35Z"/><circle cx="46.814" cy="26.5" r="2.25"/></g></svg>',ok:'<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#0b0" stroke-width="4"><g><path d="M48 10C27.0071 9.99393 9.98408 27.0071 9.978 48 9.97193 68.9929 26.9851 86.0159 47.978 86.022 68.9709 86.0281 85.9939 69.0149 86 48.022 86 48.018 86 48.014 86 48.01 86.011 27.0287 69.0113 10.011 48.03 10 48.02 10 48.01 10 48 10ZM48 84.021C28.1117 84.0271 11.9841 67.9093 11.978 48.021 11.9719 28.1327 28.0897 12.0051 47.978 11.999 67.8663 11.9929 83.9939 28.1107 84 47.999 84 48.0037 84 48.0083 84 48.013 83.9802 67.8888 67.8758 83.9981 48 84.024Z"/><path d="M41.5 60.086 29 47.586 27.586 49 41.5 62.914 70.914 33.5 69.5 32.086 41.5 60.086Z"/></g></svg>',error:'<svg width="26" height="26" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" stroke="red" stroke-width="4"><g><path d="M48 10C27.0071 9.99393 9.98408 27.0071 9.978 48 9.97193 68.9929 26.9851 86.0159 47.978 86.022 68.9709 86.0281 85.9939 69.0149 86 48.022 86 48.018 86 48.014 86 48.01 86.011 27.0287 69.0113 10.011 48.03 10 48.02 10 48.01 10 48 10ZM48 84.021C28.1117 84.0271 11.9841 67.9093 11.978 48.021 11.9719 28.1327 28.0897 12.0051 47.978 11.999 67.8663 11.9929 83.9939 28.1107 84 47.999 84 48.0037 84 48.0083 84 48.013 83.9802 67.8888 67.8758 83.9981 48 84.024Z"/><path d="M62.041 32.557 47.998 46.6 33.955 32.557 32.541 33.971 46.584 48.014 32.541 62.057 33.955 63.471 47.998 49.428 62.041 63.471 63.455 62.057 49.412 48.014 63.455 33.971 62.041 32.557Z"/></g></svg>',question:'<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="green" stroke-width="4"><g><path d="M47.979 10C27.0038 10 10 27.0038 10 47.979 10 68.9542 27.0038 85.958 47.979 85.958 68.9542 85.958 85.958 68.9542 85.958 47.979 85.9674 27.0132 68.9788 10.0094 48.013 10 48.0017 10 47.9903 10 47.979 10ZM47.979 83.958C28.1083 83.958 12 67.8497 12 47.979 12 28.1083 28.1083 12 47.979 12 67.8497 12 83.958 28.1083 83.958 47.979 83.9354 67.8403 67.8403 83.9354 47.979 83.958Z"/><path d="M49.345 27.079C42.7414 26.3273 36.7789 31.0712 36.0272 37.6748 35.9759 38.1257 35.9501 38.5792 35.95 39.033L37.95 39.033C37.9522 33.4936 42.4446 29.0048 47.984 29.007 53.5235 29.0093 58.0122 33.5017 58.01 39.0411 58.0086 42.4915 56.2337 45.6991 53.311 47.533 49.4115 49.9087 47.0166 54.131 46.979 58.697L48.979 58.697C49.0205 54.819 51.0627 51.2376 54.379 49.227 60.0072 45.6952 61.7066 38.2696 58.1748 32.6414 56.2307 29.5434 52.9829 27.4979 49.349 27.083Z"/><circle cx="48" cy="67" r="2"/></g></svg>',warn:'<svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" width="26" height="26" stroke="#faad14" stroke-width="4"><g><path d="M90.6 80 51.5 12C50.4365 10.0946 48.0298 9.41212 46.1244 10.4756 45.4848 10.8326 44.957 11.3604 44.6 12L5.4 80C4.30371 81.9275 4.9775 84.3787 6.90497 85.475 7.5129 85.8208 8.20061 86.0017 8.9 86L87.1 86C89.3174 86.0055 91.1195 84.2124 91.125 81.995 91.1268 81.2956 90.9458 80.6079 90.6 80ZM88.839 83.019C88.4799 83.637 87.8146 84.0123 87.1 84L8.9 84C8.18507 84.0125 7.5195 83.6367 7.161 83.018 6.78807 82.3997 6.77737 81.6284 7.133 81L46.348 12.971C46.8768 12.0316 48.0671 11.6987 49.0065 12.2276 49.3275 12.4082 49.5908 12.676 49.766 13L88.852 80.971C89.2186 81.6057 89.2137 82.389 88.839 83.019Z"/><path d="M48 73.98C47.3953 73.9976 46.8116 73.7577 46.394 73.32 45.9625 72.8895 45.7274 72.3003 45.744 71.691 45.7194 71.0835 45.953 70.4939 46.387 70.068 46.8156 69.6456 47.3985 69.4172 48 69.436 48.6136 69.4208 49.208 69.6503 49.652 70.074 50.1 70.4898 50.3446 71.0802 50.322 71.691 50.3367 72.3033 50.0911 72.8932 49.646 73.314 49.212 73.7526 48.6168 73.9934 48 73.98Z"/><path d="M46.901 62.6 46.578 30.787 49.289 30.787 48.966 62.6 46.901 62.6Z"/></g></svg>'};function y(t,e){if("object"!=typeof(e=e||{})&&(e=e instanceof Array?{buttons:e}:{icon:String(e)}),void 0!==arguments[2]&&(e.buttons=arguments[2]),e.buttons?e.buttons instanceof Array||(e.buttons=[String(e.buttons)]):e.buttons=["Close"],Number(e.default)||(e.default=0),!(this instanceof y)){return new y(t,e).show()}{Object.defineProperty(this,"result",{get:()=>this[$result]});const n=document.createElement("div");n&&(this[i]=n,this[a]=e,n.setAttribute("class","-season-tip-mask-container"),e.customTag&&n.setAttribute(e.customTag,e.customTag),n.insertAdjacentHTML("beforeend",`<div class="-season-tip-dialog -season-confirm-box">\n                    <div class="-season-confirm-info-line">\n                        ${v[e.icon]||""}<div class="-season-confirm-info">${String(t).replace("\n","<br />")}</div>\n                    </div>\n                    <div class="-season-tip-button-bar" ${e.buttonAlign?`style="justify-content:${l[e.buttonAlign]||e.buttonAlign};"`:""}>\n                        ${e.buttons?e.buttons.map(((t,n)=>`<div class="-season-tip-button ${n===e.default?"-season-tip-button-default":""}" d-index="${n}">${t}</div>`)).join(""):""}\n                    </div>\n                </div>`))}}function w(t,e,n,o){e.textContent=`${n} (${o})`,o?this[c]=setTimeout(w,1e3,t,e,n,o-1):(this[c]=void 0,t.close(Number(e.getAttribute("d-index"))))}function x(t,e,n){let o={};if("string"==typeof t?o.title=t:1===arguments.length&&Object.assign(o,t),"string"==typeof e?o.tip=e:2===arguments.length&&Object.assign(o,e),n&&Object.assign(o,n),!(this instanceof x)){return new x(o).show(o.position)}{Object.defineProperty(this,"result",{get:()=>this[u]});const t=document.createElement("div");t&&(this[i]=t,this[a]=o,t.setAttribute("class","-season-tip-mask-container"),o.customTag&&t.setAttribute(o.customTag,o.customTag),isNaN(o.fadeOutTime)&&(o.fadeOutTime=.3),t.insertAdjacentHTML("beforeend",`<div class="-season-tip-dialog">\n                    ${o.title?`<h4 style="margin-top:0">${o.title}</h4>`:""}\n                    <input class="-season-tip-input" type="${o.inputType||"text"}" placeholder="${o.tip||""}" />\n                    <div class="-season-tip-button-bar" ${o.buttonAlign?`style="justify-content:${l[o.buttonAlign]||o.buttonAlign};"`:""}>\n                        <div class="-season-tip-button -season-tip-button-default" d-button-submit="1">${o.submitText||"Submit"}</div>\n                        ${o.hideCancel||o.forbitCancel?"":`<div class="-season-tip-button" d-button-cancel="1">${o.cancelText||"Cancel"}</div>`}\n                    </div>\n                </div>`))}}y.prototype={close:h,show(t){return new Promise(((e,n)=>{const o=this[i];if(this instanceof y&&o&&!o.isConnected){this[s]=e,t instanceof HTMLElement||(t=document.body),d(o),t.insertAdjacentElement("afterbegin",o),setTimeout((()=>o.className="-season-tip-mask-container -season-tip-fadein"),0),[...o.querySelectorAll(".-season-tip-button")].forEach((t=>{t.addEventListener("click",(t=>{this.close(Number(t.target.getAttribute("d-index")))}),{once:!0})}));const n=Number(this[a].timeout),r=o.querySelector(".-season-tip-button-default");if(n&&r){const t=r.textContent;r.textContent=`${t} (${n})`,this[c]=setTimeout(w,1e3,this,r,t,n-1)}}else n(new Error("Reactive"))}))}},x.prototype={close:h,show(t){return new Promise(((e,n)=>{const o=this[i];if(this instanceof x&&o&&!o.isConnected){const n=this[a];if(this[s]=e,this[u]=void 0,n.hideMask&&o.setAttribute("style","background: none !important;"),t||(t=n.position),t){let e=o.querySelector(".-season-tip-dialog");e&&e.setAttribute("style",`\n                        position: absolute;\n                        left: ${isNaN(t.x)?"auto":t.x+"px"};\n                        top: ${isNaN(t.y)?"auto":t.y+"px"};\n                        right: ${isNaN(t.rx)?"auto":t.rx+"px"};\n                        bottom: ${isNaN(t.ry)?"auto":t.ry+"px"};\n                    `)}d(o),document.body.insertAdjacentElement("beforeend",o),setTimeout((()=>o.className="-season-tip-mask-container -season-tip-fadein"),0);let r=o.querySelector("[d-button-submit]");const i=()=>{let t=o.querySelector("input");this.close(t?String(t.value):void 0)};r&&r.addEventListener("click",i,{once:!0}),r=o.querySelector("[d-button-cancel]"),r&&!n.forbitCancel&&r.addEventListener("click",(t=>{this.close(void 0)}),{once:!0}),n.forbitCancel||o.addEventListener("click",(t=>{t.target===o&&this.close(void 0)}),{once:!0});let c=o.querySelector("input");if(c){const t=e=>{13===e.keyCode&&(i(),e.target.removeEventListener("keydown",t))};c.addEventListener("keydown",t),c.value=n.default||"",c.select(),c.focus()}}else n(new Error("Reactive"))}))}};const k=Symbol("season.tip.popup.hasimage");function $(t,e,n){t instanceof Array||(t=[String(t)]);let o={};if(e instanceof Element?o.refElement=e:2===arguments.length&&Object.assign(o,e),n&&Object.assign(o,n),!(this instanceof $)){return new $(t,o).show(o.refElement)}{Object.defineProperties(this,{result:{get:()=>this[u]},count:{value:t.length,writable:!1}});const e=document.createElement("div");e&&(this[i]=e,this[a]=o,e.setAttribute("class","-season-tip-dialog -season-tip-popup-box"),e.setAttribute("tabIndex","0"),o.customTag&&e.setAttribute(o.customTag,o.customTag),isNaN(o.fadeOutTime)&&(o.fadeOutTime=.1),o.style&&e.setAttribute("style",o.style),this[k]=[!1,...t].reduce(((t,e)=>t||e&&e.image)),e.insertAdjacentHTML("beforeend",t.map(((t,e)=>null!=t?`<a d-select-index="${e}">\n                                ${"string"!=typeof t&&t.image?`<img src="${t.image}" ${t.imageInvert?'d-image-invert="1"':""} />`:""}<span>${t.text||String(t)}</span>\n                               </a>`:'<div d-separate-horizontal="1"></div>')).join("")))}}$.prototype={close:h,show(t){return new Promise(((e,n)=>{const o=this[i];if(this instanceof $&&o&&!o.isConnected){const n=this[a];this[s]=e,this[u]=void 0,document.body.insertAdjacentElement("beforeend",o),setTimeout((()=>o.className="-season-tip-dialog -season-tip-popup-box -season-tip-fadein"),0),o.addEventListener("blur",(t=>{this.close(void 0)}),{once:!0}),[...o.querySelectorAll("[d-select-index]")].forEach((t=>{t.addEventListener("click",(e=>{this.close(Number(t.getAttribute("d-select-index")))}))}));let r=o.querySelector("[d-select-index] span");if(r=this[k]&&r?`${parseInt(r.getBoundingClientRect().height)}px`:"0px",o.style.setProperty("--image-size",r),t||(t=n.refElement),t instanceof Element){const{width:e,height:i}=o.getBoundingClientRect(),{left:s,right:a,top:c,bottom:u}=t.getBoundingClientRect(),{innerWidth:l,innerHeight:d}=window,p=String(n.position).toLowerCase().split("&");let f="auto",h="auto",m="auto",g="auto";p.includes("top")?g=c:p.includes("top-align")?m=c:p.includes("bottom-align")?g=u:m=u,Number(g)&&(g-i<0?(g="auto",m=0):g=d-g+"px"),Number(m)&&(m+i>d&&(m=Math.max(0,d-i)),m=`${m}px`),p.includes("left")?h=s:p.includes("right")?f=a:p.includes("right-align")?h=a:f=s,Number(h)&&(h-e<0?(h="auto",f=0):h=l-h+"px"),Number(f)&&(f+e>l&&(f=Math.max(0,l-e)),f=`${f}px`),o.setAttribute("style",`left:${f};right:${h};top:${m};bottom:${g};--image-size:${r};${n.style||""}`)}d(o),o.focus()}else n(new Error("Reactive"))}))}},$.bindElement=function(t,e,n,o,r){t instanceof Element&&t.addEventListener(e||"click",(()=>{$(o,t,r).then("function"==typeof n?n:console.log)}))};var E={install(t,e){t&&(t.prototype.$tip=b,t.prototype.$confirm=y,t.prototype.$input=x,t.prototype.$popup=$)},tip:b,confirm:y,input:x,popup:$};function A(t,e,n,o,r,i,s){try{var a=t[i](s),c=a.value}catch(t){return void n(t)}a.done?e(c):Promise.resolve(c).then(o,r)}function S(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var i=t.apply(e,n);function s(t){A(i,o,r,s,a,"next",t)}function a(t){A(i,o,r,s,a,"throw",t)}s(void 0)}))}}var T=o.default,L=void 0;function M(){return L}function C(){L=void 0}function j(t){t||(t=3e3);var e=Date.now();return new Promise((function n(o){navigator.serviceWorker.controller?o(navigator.serviceWorker.controller):Date.now()-e<t?setTimeout(n,10,o):o(void 0)}))}var N=Object.create("serviceWorker"in navigator?{getLastError:M,clearLastError:C,addMessenger:function(t){if("function"==typeof t){var e=function(e){t(e?e.data:void 0)};return navigator.serviceWorker.addEventListener("message",e),e}},removeMessenger:function(t){navigator.serviceWorker.removeEventListener("message",t)},getMessage:function(){return new Promise((function(t){navigator.serviceWorker.addEventListener("message",(function(e){t(e?e.data:void 0)}),{once:!0})}))},postMessage:function(t,e,n){return S(T.mark((function o(){var r;return T.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,C(),o.next=4,j(n);case 4:if(!(r=o.sent)){o.next=8;break}return r.postMessage({msg:t,param:e}),o.abrupt("return",r);case 8:o.next=13;break;case 10:o.prev=10,o.t0=o.catch(0),L=o.t0;case 13:case"end":return o.stop()}}),o,null,[[0,10]])})))()},sendMessage:function(t,e,n){return S(T.mark((function o(){var r;return T.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,C(),o.next=4,j(n);case 4:if(!(r=o.sent)){o.next=9;break}return o.next=8,new Promise((function(o,i){var s=new MessageChannel,a=setTimeout(i,n||3e3,void 0);s.port1.onmessage=function(t){a&&clearTimeout(a),o(t.data)},r.postMessage({msg:t,param:e},[s.port2])}));case 8:return o.abrupt("return",o.sent);case 9:o.next=14;break;case 11:o.prev=11,o.t0=o.catch(0),L=o.t0;case 14:case"end":return o.stop()}}),o,null,[[0,11]])})))()},start:function(t,e,n,o){return S(T.mark((function r(){var i;return T.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,C(),r.next=4,navigator.serviceWorker.register(t,e||{});case 4:return i=r.sent,"function"==typeof n&&n(i),r.abrupt("return",i);case 9:if(r.prev=9,r.t0=r.catch(0),L=r.t0,"function"!=typeof o){r.next=16;break}o(r.t0),r.next=17;break;case 16:throw r.t0;case 17:case"end":return r.stop()}}),r,null,[[0,9]])})))()}}:{getLastError:M,clearLastError:C,addMessenger:function(t){},removeMessenger:function(t){},getMessage:function(){return new Promise((function(t,e){L=new Error("ServiceWorker is not supported"),e()}))},postMessage:function(t,e,n){return S(T.mark((function t(){return T.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},sendMessage:function(t,e,n){return S(T.mark((function t(){return T.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},start:function(t,e,n,o){return S(T.mark((function t(){return T.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()}});const O=Symbol("class.definder.instance");function P(t,e){if(e){arguments.length<2&&(e=t,t=void 0);const n={constructor:e.$constructor,[t]:function(){if(!(this instanceof n[t]))return n[O]||new n[t](...arguments);if(n[O])throw new Error(`${t||"This"} is a singleton class`);"function"==typeof n.constructor&&n.constructor.apply(this,[...arguments]),n[O]=this}},o=n[t].prototype;for(let t in e){let n=e[t];n&&("function"==typeof n?o[t]=n:(void 0===n.enumerable&&(n.enumerable=!0),Object.defineProperty(o,t,n)))}return n[t]}}function q(){this.download?function(t,e){if(t){const n=document.createElement("a");if(n){if(n.href=t,n.rel="noopener",e)for(const t in e)n[t]=e[t];n.click()}}}(this.download,{download:this.download.substr(this.download.lastIndexOf("/")+1)}):this.href&&window.open(this.href,"blank")}var _=P("WelcomeApp",{$constructor:function(){this.$rootElement=document.getElementById("welcome-app")},refresh:function(){var t=this;return S(T.mark((function e(){var n,o;return T.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(n=t.$rootElement.querySelector(".welcome-app-content-box")).innerHTML="",e.next=5,fetch("./home-content.json");case 5:return o=e.sent,e.next=8,o.json();case 8:(o=e.sent).forEach((function(t){var e=document.createElement("div");e.setAttribute("class","welcome-app-content"),e.setAttribute("d-content-desc",t.desc||""),e.insertAdjacentHTML("afterbegin",'<img src="'.concat(t.image,'" /><div>').concat(t.title,"</div>")),e.addEventListener("click",q.bind(t)),n.appendChild(e)})),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),b("Fail in fresh home contents",{type:"error",timeout:1700,closable:!0}),console.error("Fail in fresh home contents",e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))()},hide:function(){this.$rootElement&&this.$rootElement.remove()},show:function(){var t=document.querySelector(".--app-container");this.$rootElement&&t&&(t.innerHTML="",t.appendChild(this.$rootElement))}});function I(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function W(t){return function(t){if(Array.isArray(t))return I(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return I(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}const H=Symbol("season.urlparams.private");const Z="URLSearchParams"in window?window.URLSearchParams:class{constructor(t){const e=this[H]={};String(t).split("&").forEach((t=>{let{0:n,1:o}=t.split("=");e[n]=void 0===o||decodeURIComponent(o)}))}get(t){return this[H][t]}getAll(t){return this[H][t]}has(t){return Object.hasOwnProperty.call(this[H],t)}keys(){return Object.keys(this[H])}*entries(){const t=this[H];for(let e in t)yield[e,t[e]]}forEach(t,e){if("function"==typeof t){const n=this[H];for(let o in n)t.call(e,n[o],o,this)}}};var B=P("WaitTip",{$constructor:function(){this.$rootElement=document.getElementById("waiting-box"),this.close(),this.$rootElement.style.display=""},show:function(t){return this.$rootElement.querySelector("#waiting-text").textContent=t||"",!this.$rootElement.isConnected&&document.body.appendChild(this.$rootElement),this},close:function(){return this.$rootElement.remove(),this},wait:function(){for(var t=this,e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];Promise.all(n).then((function(){t.close()}))}}),R=Symbol("package.manager.private.record"),z={text:"Reload App",action:"reload"},F={image:"./assets/icon-cube.svg",imageInvert:!0,text:"Load Package",action:"package"},D={image:"./assets/icon-home.svg",imageInvert:!0,text:"Home Page"},J=P("PackageManager",{$constructor:function(){this.$menuList=[];var t=document.querySelector(".--app-home-button");t&&$.bindElement(t,"click",this.onMenuInvoke.bind(this),this.$menuList,{position:"right-align",customTag:"d-app-menu-button"}),(t=document.querySelector(".--app-return-button"))&&t.addEventListener("click",(function(){history.back()})),this.$menuBar=document.querySelector(".--app-menu-bar"),this.$ob=new MutationObserver(this.onDomChanged.bind(this)),this.$ob.observe(document.body,{childList:!0,attributes:!0,subtree:!0}),this.freshList(),this._$_default_()},current:{get:function(){return this[R]}},currentPath:{get:function(){return this[R]?"/.pwa.vir/".concat(this[R]):"."}},onDomChanged:function(){this.$menuBar.isConnected||document.body.insertAdjacentElement("afterbegin",this.$menuBar)},freshList:function(){var t=this;return S(T.mark((function e(){var n,o,r;return T.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=t.$menuList).splice(0,n.length),e.prev=2,e.next=5,fetch("./pkgs/context.json");case 5:return o=e.sent,e.next=8,o.json();case 8:if(!((r=e.sent)instanceof Array)){e.next=13;break}n.splice.apply(n,[0,0].concat(W(r))),e.next=14;break;case 13:throw new Error("Package context must be an array");case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(2),console.error("$[PackageManager] Fail in load package list",e.t0);case 19:n.length>0&&n.push(null),n.splice(n.length,0,F,D,null,z);case 21:case"end":return e.stop()}}),e,null,[[2,16]])})))()},onMenuInvoke:function(t){var e=this.$menuList[t];if(e)if(void 0===e.action)this._$_default_();else{var n="_$_".concat(e.action,"_");"function"==typeof this[n]?B().show("Loading...").wait(new Promise((function(t){return setTimeout(t,1e3)})),this[n](e)):b('"'.concat(e.text||String(e),'" unknown!'),{type:"error",closable:!0,timeout:1700})}},_$_default_:function(){var t=new Z(location.search.substr(1));if(t.has("pkg"))B().show("Loading...").wait(new Promise((function(t){return setTimeout(t,1e3)})),this._$_package_({package:t.get("pkg")}));else{var e=localStorage.getItem("pkg-log");e?B().show("Loading...").wait(new Promise((function(t){return setTimeout(t,1e3)})),this._$_package_({package:e})):_().show()}},_$_reload_:function(t){return S(T.mark((function t(){var e;return T.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,N.sendMessage("reload-application");case 2:(e=t.sent)&&(0===e.ret?location.reload():b("Fail in reloading application(".concat(e.ret,")!"),{type:"error",closable:!0,timeout:1700}));case 4:case"end":return t.stop()}}),t)})))()},_$_package_:function(t){var e=this;return S(T.mark((function n(){var o,i,s,a,c,u,l,d,p,f,h,m,g;return T.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(o=void 0,i=void 0,s=t.package){n.next=10;break}return n.next=6,x("Input package code",{hideCancel:!0,buttonAlign:"center"});case 6:if(s=n.sent){n.next=10;break}return localStorage.removeItem("pkg-log"),n.abrupt("return");case 10:if(localStorage.setItem("pkg-log",s),i){n.next=24;break}return n.prev=12,n.next=15,fetch("/.pwa.vir/".concat(s,"/context.json"));case 15:return i=n.sent,n.next=18,i.json();case 18:i=n.sent,n.next=24;break;case 21:n.prev=21,n.t0=n.catch(12),i=void 0;case 24:if(i){n.next=90;break}return n.prev=25,n.next=28,fetch("./pkgs/".concat(s,".zip"));case 28:return i=n.sent,n.next=31,i.blob();case 31:return i=n.sent,n.next=34,(new r.default).loadAsync(i);case 34:return a=n.sent,n.t1=JSON,n.next=38,a.file("context.json").async("string");case 38:if(n.t2=n.sent,i=n.t1.parse.call(n.t1,n.t2),new Z(location.search.substr(1)).get("pkg")===s&&(i.keepAlive=!0),c=void 0,!i.crypt){n.next=52;break}u=void 0;case 44:return n.next=46,x("Input the access code:","",{buttonAlign:"center",inputType:"password"});case 46:c=n.sent,u=CryptoJS.MD5(c).toString(),c&&u!==i.crypt&&(b("The access key is incorrect!",{type:"error",closable:!0,timeout:1e3}),u=void 0);case 49:if(c&&!u){n.next=44;break}case 50:if(c){n.next=52;break}throw new Error("Need an access code");case 52:l={},a.forEach((function(t,e){e.dir||(l["".concat(i.keepAlive?":":"").concat(s,"/").concat(t)]=String(t))})),n.t3=T.keys(l);case 55:if((n.t4=n.t3()).done){n.next=75;break}if(d=n.t4.value,!((p=l[d]).endsWith(".html")||p.endsWith(".htm")||p.endsWith(".js")||p.endsWith(".css"))){n.next=70;break}return n.t5=Blob,n.t6=CryptoJS.AES,n.next=63,a.file(l[d]).async("string");case 63:n.t7=n.sent,n.t8=c,n.t9=n.t6.decrypt.call(n.t6,n.t7,n.t8).toString(CryptoJS.enc.Utf8),n.t10=[n.t9],l[d]=new n.t5(n.t10),n.next=73;break;case 70:return n.next=72,a.file(l[d]).async("blob");case 72:l[d]=n.sent;case 73:n.next=55;break;case 75:if(n.t11=i.keepAlive,n.t11){n.next=79;break}return n.next=79,N.sendMessage("clear-virtual-response",{keepAlive:!1});case 79:return n.next=81,N.sendMessage("map-virtual-response",l);case 81:if(0===(f=n.sent).ret){n.next=84;break}throw new Error("Fail in mapping virtual response(".concat(f.ret,")"));case 84:n.next=90;break;case 86:n.prev=86,n.t12=n.catch(25),i=void 0,o=n.t12;case 90:if(!i){n.next=112;break}return n.prev=91,n.next=94,fetch("/.pwa.vir/".concat(s,"/").concat(i.entry));case 94:return h=n.sent,n.next=97,h.text();case 97:h=n.sent,m=document.querySelector(".--app-container"),_().hide(),m.innerHTML="",m.insertAdjacentHTML("beforeend",h),g=String(i.entry).substr(0,String(i.entry).lastIndexOf("/"))||".",W(m.querySelectorAll("meta,link,style")).map((function(t){try{t.remove();var e=document.createElement(t.tagName);t.getAttributeNames().forEach((function(n){return e.setAttribute(n,t.getAttribute(n))}));var n=String(e.getAttribute("href")||"");return n&&n.indexOf("://")<0&&!n.startsWith("/")&&e.setAttribute("href","/.pwa.vir/".concat(s,"/").concat(g,"/").concat(n)),e.innerHTML=t.innerHTML,e}catch(t){o=t}})).reverse().forEach((function(t){try{t&&m.insertAdjacentElement("afterbegin",t)}catch(t){o=t}})),W(m.querySelectorAll("script")).map((function(t){try{t.remove();var e=document.createElement("script");t.getAttributeNames().forEach((function(n){return e.setAttribute(n,t.getAttribute(n))}));var n=String(e.getAttribute("src"));return n&&n.indexOf("://")<0&&!n.startsWith("/")&&e.setAttribute("src","/.pwa.vir/".concat(s,"/").concat(g,"/").concat(n)),e.innerHTML=t.innerHTML,e}catch(t){o=t}})).forEach((function(t){try{t&&m.append(t)}catch(t){o=t}})),e[R]=s,n.next=112;break;case 108:n.prev=108,n.t13=n.catch(91),o=n.t13,i=void 0;case 112:i?o?console.warn('Load "'.concat(s,'" finished with exception'),o):console.log('Load "'.concat(s,'" success')):(b("Fail in loading package! ".concat(o?"\n".concat(o.message):""),{type:"error",closable:!0,timeout:1e3}),console.error('Load "'.concat(s,'" failed'),o));case 113:case"end":return n.stop()}}),n,null,[[12,21],[25,86],[91,108]])})))()}});N.start("./sw.js").then((function(){window.$aw=N,window.$wa=_,console.log("$[PWA Start]"),window.$tip=E,window.$tip.WaitTip=B,B(),_().refresh(),window.$package=J()})).catch((function(t){console.error("$[Service worker registration failed]",t)}))}));
//# sourceMappingURL=app.js.map