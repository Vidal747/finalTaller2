if(!self.define){let s,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(n,r)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let t={};const c=s=>a(s,i),u={module:{uri:i},exports:t,require:c};e[i]=Promise.all(n.map((s=>u[s]||c(s)))).then((s=>(r(...s),t)))}}define(["./workbox-c06b064f"],(function(s){"use strict";importScripts("/fallback-8e5b7798448a30a7.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/6LPswguArPrs4G3bzvHIk/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/6LPswguArPrs4G3bzvHIk/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/081ca426-453510d2330d0dc6.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/1747-4e00985696e789d5.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/2102-f45b7b0b3b568858.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/231-af709d0b8e21e526.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/2356-8254e97cf69674bc.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/2787-924482831394ff87.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/3999-f08dde094f0ad4fb.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/4049-45fc2682682823f5.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/4265-df09482f807a54cd.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/4371-6849d818255ac192.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/5190-588aecfeeba1488c.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/52ab8b6c-2b088965f49b7614.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/53c13509-aa820bcf51a506fd.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/5815-4faccabc57fc6bfa.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/626-79b380d4fd973d2f.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/66ec4792-0809df8d458c50ad.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/7927-b549c9f60e772cde.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/795d4814-6fcc7449e05605e4.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/8e1d74a4-b43e0d8840be9139.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/9064-6823af88cd6d1f1e.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/9678-258e7657ce8f4e2c.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/998-9848068dbfb65693.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/9c4e2130-6ae4f9a13975e60b.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/auth/layout-28b840eef9addb49.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/auth/recovery/page-a9409f161257bbe7.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/auth/signin/page-9477639682d8f4db.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/articles/create/page-d90decb74b2eca07.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/articles/edit/%5BId%5D/page-a2c2976bd7c5ffc0.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/articles/page-2b8ace2f20fdd16e.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/frequentQuestions/create/page-49fce7c195185997.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/frequentQuestions/edit/%5BId%5D/page-f9c1340a07114b9f.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/frequentQuestions/page-786f9f88e4038e52.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/layout-02fb6d2b939bf65f.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/logs/page-9bd4f738d7e05231.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/page-61b22e64d011b86c.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/products/create/page-02ddabf3130906ea.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/products/edit/%5BId%5D/page-da78e90f504949fe.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/products/page-715e7ddba57bc72e.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/users/create/page-e3fbc964323e6722.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/users/edit/%5BId%5D/page-129455f35fbcd14a.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/admin/users/page-73cc654b6c237b17.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/layout-54ab2865d5fcee65.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(admin)/dashboard/page-131bc2f33720a3f3.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/aboutUs/layout-e7d560c31ba253c5.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/aboutUs/page-16191ec43f152db3.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/blog/layout-4b232f76fb3a3217.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/blog/page-29930df73044ce28.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/frequentQuestions/layout-06cf2ed090c50a56.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/frequentQuestions/page-28696bd426cbf8e1.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/page-e5f322012bc53f67.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/plans/%5Bslug%5D/page-fae007fc0f8c8d6f.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/plans/layout-ad13683f1a76abe1.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/plans/page-e28a1a168da1be8d.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/termsAndConditions/layout-1a40949b39354b45.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/(landing)/termsAndConditions/page-cdc7f7ab3d7ced34.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/_not-found/page-14ee409feaaa4ce9.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/layout-8893d4d5ce369e8e.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/not-found-8d2ead861d185cb9.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/app/~offline/page-8cc857ba30ef3ccd.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/f8025e75-c68e620bc4bee52a.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/f97e080b-1ed390796e2c3dd9.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/fc2f6fa8-37dd54aa83623506.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/fd9d1056-0374a804afbdca42.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/main-app-9d7f55b5c21e1fa9.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/main-c472605c636da8b7.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-0b942221512175e8.js",revision:"6LPswguArPrs4G3bzvHIk"},{url:"/_next/static/css/0c328f517414fbb3.css",revision:"0c328f517414fbb3"},{url:"/_next/static/css/daa5f96f004222d0.css",revision:"daa5f96f004222d0"},{url:"/_next/static/css/eafa50d8f97b2705.css",revision:"eafa50d8f97b2705"},{url:"/_next/static/css/fb9a9af3f6f81ba5.css",revision:"fb9a9af3f6f81ba5"},{url:"/_next/static/media/01af0fc7b4278e65-s.p.woff2",revision:"6fa778aa9ee280df9ff563f3a08b0350"},{url:"/_next/static/media/8cdee4d3ed444abc-s.woff2",revision:"420e1e96628860fae605e46bd196926d"},{url:"/assets/group.jpg",revision:"2a1d38c7af22f16559d468b5ee70b8d2"},{url:"/assets/languages/english.svg",revision:"6155021908070f77dbcf4c5a4969e02a"},{url:"/assets/languages/french.svg",revision:"e12f10fd171528184f0ef2d3673e0ad8"},{url:"/assets/languages/spanish.svg",revision:"619763f88a499bc061f865ebfe1a1456"},{url:"/assets/logo.webp",revision:"fd4aeb21e5435be70fbd775b0b62afbb"},{url:"/assets/manchas/mancha-2.png",revision:"a3c189d75a57e015a538b1cd1cd8e10d"},{url:"/assets/manchas/mancha-3.png",revision:"887aebe4a648a54bed2df263ce12fef8"},{url:"/assets/manchas/mancha.png",revision:"d445753b574b72639b18115a5d165571"},{url:"/assets/noImage.svg",revision:"4cbf000dbc488ecf7005b42b8bd6d529"},{url:"/assets/page404.svg",revision:"85f78a7b439a08b82134083e91ed1f76"},{url:"/fallback-8e5b7798448a30a7.js",revision:"9ce9e8fe1a0baf80515b990b51ddc4df"},{url:"/icon-180.png",revision:"f0a6476452890db7329bed896036f3f0"},{url:"/icon-192.png",revision:"dd819e0ed09424dfab00b518e3327f75"},{url:"/icon-512.png",revision:"2d364a700b30160955d7970901403203"},{url:"/manifest.json",revision:"a6b47469edb413150f6f270ea8d61634"},{url:"/robots.txt",revision:"76307890a688ed7cae5fa866804f9566"},{url:"/sitemap.xml",revision:"637282a49997eca4a5b2e827b0c2c2ea"},{url:"/splash-screen1.webp",revision:"5a19ff5f6b6a244bdf1179a373df4a25"},{url:"/splash-screen2.webp",revision:"8078c0560d8d97a55da346229536ea2a"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/~offline",revision:"6LPswguArPrs4G3bzvHIk"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:s})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\/_next\/static.+\.js$/i,new s.CacheFirst({cacheName:"next-static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:mp4|webm)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({sameOrigin:s,url:{pathname:e}})=>!(!s||e.startsWith("/api/auth/callback")||!e.startsWith("/api/"))),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({url:{pathname:s},sameOrigin:e})=>e&&!s.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({sameOrigin:s})=>!s),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
