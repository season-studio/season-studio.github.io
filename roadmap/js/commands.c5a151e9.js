(function(e){function t(t){for(var o,i,u=t[0],a=t[1],f=t[2],s=0,p=[];s<u.length;s++)i=u[s],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&p.push(r[i][0]),r[i]=0;for(o in a)Object.prototype.hasOwnProperty.call(a,o)&&(e[o]=a[o]);l&&l(t);while(p.length)p.shift()();return c.push.apply(c,f||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],o=!0,u=1;u<n.length;u++){var a=n[u];0!==r[a]&&(o=!1)}o&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={commands:0},c=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],a=u.push.bind(u);u.push=t,u=u.slice();for(var f=0;f<u.length;f++)t(u[f]);var l=a;c.push([1,"chunk-vendors"]),n()})({1:function(e,t,n){e.exports=n("16c0")},"16c0":function(e,t,n){(function(e){n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("99af"),Office.initialize=function(e){console.log(e)},Office.onReady((function(){})),Object.assign(self||window||e,{openOnlineWeb:function(e){Office.context.document.setSelectedDataAsync("ExecuteFunction works. Button ID=".concat(e.source.id,". ").concat((new Date).toLocaleString()),(function(e){var t=e.error;e.status===Office.AsyncResultStatus.Failed&&console.error(t)})),Office.context.ui.openBrowserWindow("https://season-studio.github.io/"),e.completed()}})}).call(this,n("c8ba"))}});
//# sourceMappingURL=commands.c5a151e9.js.map