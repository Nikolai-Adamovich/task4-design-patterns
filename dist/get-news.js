(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{281:function(r,n,t){},283:function(r,n,t){"use strict";t.r(n);t(281);var e=t(16);function a(r,n,t,e,a,o,u){try{var i=r[o](u),c=i.value}catch(r){return void t(r)}i.done?n(c):Promise.resolve(c).then(e,a)}function o(r){return function(){var n=this,t=arguments;return new Promise(function(e,o){var u=r.apply(n,t);function i(r){a(u,e,o,i,c,"next",r)}function c(r){a(u,e,o,i,c,"throw",r)}i(void 0)})}}var u={apply:function(r,n,t){return console.log("URL: ".concat(t[0])),console.log("Search Params: ".concat(t[1])),r.apply(n,t)}},i=function(r){var n;switch(r){case"get":n=function(){var r=o(regeneratorRuntime.mark(function r(n,t){var e,a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return e="".concat(n,"?").concat(t.toString()),r.next=3,fetch(e);case 3:return a=r.sent,r.abrupt("return",a.json());case 5:case"end":return r.stop()}},r,this)}));return function(n,t){return r.apply(this,arguments)}}();break;case"post":n=function(){var r=o(regeneratorRuntime.mark(function r(n,t){var e,a;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return e=new Headers({"x-api-key":t.get("apiKey")}),r.next=3,fetch(n,{method:"POST",body:t,headers:e});case 3:return a=r.sent,r.abrupt("return",a.json());case 5:case"end":return r.stop()}},r,this)}));return function(n,t){return r.apply(this,arguments)}}()}return new Proxy(n,u)};function c(r,n,t,e,a,o,u){try{var i=r[o](u),c=i.value}catch(r){return void t(r)}i.done?n(c):Promise.resolve(c).then(e,a)}var s,f=i("get"),v=(i("post"),function(){s="https://newsapi.org/v2/";var r=0,n=new URLSearchParams;/[а-яё\w\d]{3,}/i.test(e.a.get("q"))?s+="everything":s+="top-headlines";var t=!0,a=!1,o=void 0;try{for(var u,i=e.a[Symbol.iterator]();!(t=(u=i.next()).done);t=!0){var c=u.value;c[1]&&(n.set(c[0],c[1]),r++)}}catch(r){a=!0,o=r}finally{try{t||null==i.return||i.return()}finally{if(a)throw o}}0===r&&n.set("language","en");var f=!0,v=!1,p=void 0;try{for(var l,h=e.b[Symbol.iterator]();!(f=(l=h.next()).done);f=!0){var d=l.value;d[1]&&n.set(d[0],d[1])}}catch(r){v=!0,p=r}finally{try{f||null==h.return||h.return()}finally{if(v)throw p}}return n.set("apiKey","d72c9d0925a44fb8a00c4f2ed855167c"),n}),p=function(){var r=function(r){return function(){var n=this,t=arguments;return new Promise(function(e,a){var o=r.apply(n,t);function u(r){c(o,e,a,u,i,"next",r)}function i(r){c(o,e,a,u,i,"throw",r)}u(void 0)})}}(regeneratorRuntime.mark(function r(){var n;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return n=v(),r.next=3,f(s,n);case 3:return r.abrupt("return",r.sent);case 4:case"end":return r.stop()}},r,this)}));return function(){return r.apply(this,arguments)}}();n.default=p}}]);