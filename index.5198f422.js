!function(){function e(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=n.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){r[e]=n},n.parcelRequired7c6=o),o.register("gMHel",(function(n,t){function r(){document.querySelector(".gallery").innerHTML=""}function o(e){var n=e.webformatURL,t=e.largeImageURL,r=e.tags,o=e.likes,i=e.views,d=e.comments,l=e.downloads,c=document.createElement("div");c.classList.add("photo-card");var u=document.createElement("a");u.href=t;var s=document.createElement("img");s.src=n,s.alt=r,s.loading="lazy",u.appendChild(s);var f=document.createElement("div");f.classList.add("info");var p=a("Likes",o),m=a("Views",i),g=a("Comments",d),v=a("Downloads",l);return f.append(p,m,g,v),c.append(u,f),c}function a(e,n){var t=document.createElement("p");t.classList.add("info-item");var r=document.createElement("b");return r.textContent=e,t.append(r,": ".concat(n)),t}e(n.exports,"clearGallery",(function(){return r})),e(n.exports,"renderPhotoCard",(function(){return o}))})),o("gMHel")}();
//# sourceMappingURL=index.5198f422.js.map