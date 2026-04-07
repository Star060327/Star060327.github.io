import{j as o}from"./motion-sIUUbuBk.js";import{r as g,W as $,d as Ce,l as de}from"./monaco-Giv-boXL.js";import{h as se,i as pe,c as me,d as Be,R as Ee,G as fe,j as he,e as Ie,k as we,X as ke,P as ye,l as Y,m as ve,a as xe,n as De}from"./icons-CPEsDJ2d.js";import{y as be,s as Re,V as Ne,e as Le,x as _e}from"./prettier-CfcnOTJl.js";import{c as ie}from"./index-CKR0v5KE.js";import"./md-fUmDZuW1.js";import"./framework-Dfoqj1Wf.js";const Ke="_btn_1owzi_37",Se="_icon_1owzi_50",x={"edit-content":"_edit-content_1owzi_1","edit-header":"_edit-header_1owzi_7","edit-header-title":"_edit-header-title_1owzi_22","edit-header-menu":"_edit-header-menu_1owzi_31",btn:Ke,icon:Se,"edit-file":"_edit-file_1owzi_59","active-btn":"_active-btn_1owzi_78"},Z="html",ae=({defaultLanguage:e=Z})=>e==="vue"?[{name:"main.js",content:`import { createApp } from 'vue'
import router from './router.js'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
`,language:"javascript"},{name:"App.vue",content:`<script setup>
import { ref } from 'vue'
<\/script>
<template>
  <nav>
   <router-link to="/">Index</router-link> | 
    <router-link to="/home">Home</router-link>
  </nav>
  <hr />
  <router-view></router-view>
</template>

    `,language:"vue"},{name:"Layout.vue",content:`<script setup>
import { ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useCountStore } from './store.js'
const countStore = useCountStore() 
const { sum } = storeToRefs(countStore) 
const { increament } = countStore 
<\/script>
<template>
    <div>
      <h3>当前计数：{{sum}}</h3>
      <button @click="increament(1)">点我+1</button>
    </div>
</template>`,language:"vue"},{name:"Home.vue",content:`<script setup>
import { ref } from 'vue'
const inputValue = ref('')
<\/script>
<template>
    <h1>home</h1>
    <p>当前输入值：{{inputValue}}</p>
    <input type="text" v-model="inputValue" />
</template>`,language:"vue"},{name:"router.js",content:`import {createRouter,createWebHashHistory} from 'vue-router'
import Home from './Home.vue'
import Layout from './Layout.vue'
const router = createRouter({ 
  history: createWebHashHistory(),//路由模式
  routes: [  
         //一个个的路由规则
    {
       path: '/',
       component: Layout,
       name: 'Layout'  //命名路由
    },
    {
      path: '/home',
      component: Home,
      name: 'Home'  //命名路由
    }
     ]
 })
export default router
`,language:"javascript"},{name:"store.js",content:`import { defineStore } from 'pinia'
import {ref} from 'vue'
export const useCountStore = defineStore('count', () => {
  const sum = ref(6)
  function increament(value){
    sum.value += value
  }
  return {sum,increament}
})`,language:"javascript"}]:e==="react"?[{name:"main.jsx",content:`import { createRoot } from 'react-dom/client'
import App from './App.jsx'
const root = createRoot(document.getElementById('root'))
root.render(
    <App />
)`,language:"javascript"},{name:"App.jsx",content:`import Home from './Home.jsx'
import Layout from './Layout.jsx'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App(){
  return (
    <Router initialEntries={['/']}>
    <nav>
      <Link to="/">Layout</Link> | <Link to="/home">home</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
    )
}
export default App
`,language:"javascript"},{name:"Layout.jsx",content:`import { create } from "zustand";

const useCountStore = create((set) => ({
  count: 0,
  add: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 }))
}));

export default function Layout() {
  // 正确：调用全局的 useCountStore Hooks，解构状态/方法
  const { count, add, dec } = useCountStore();

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={add}>+1</button>
      <button onClick={dec}>-1</button>
    </div>
  );
}
`,language:"javascript"},{name:"Home.jsx",content:`export default function Home() {
  return (
    <div>
      home
    </div>
  );
}`,language:"javascript"}]:[{name:"index.html",content:"<h1>hello,React!</h1>",language:"html"},{name:"index.css",content:`h1 {
      color: red;
    }`,language:"css"},{name:"index.js",content:"console.log('hello,React!')",language:"javascript"}];function Fe({defaultLanguage:e=Z,defaultFiles:i=ae({defaultLanguage:e})}){const[t,A]=g.useState(i),[a,r]=g.useState(t[0].name||"index.html"),s=t.find(Q=>Q.name===a)||t[0],u=g.useCallback(({newFileName:Q,language:p})=>t.find(E=>E.name===Q)?(alert("文件名已存在"),!1):(A([...t,{name:Q,content:"",language:p}]),r(Q),!0),[t]),C=g.useCallback(Q=>{if(t.length<1)return!1;A(t.filter(p=>p.name!==Q.name)),r(t[0].name)},[t]),l=g.useCallback((Q,p)=>{A(E=>E.map(k=>k.name===Q?{...k,content:p}:k))},[]),n=g.useCallback(()=>{A(i)},[i]),[c,d]=g.useState([]),B=g.useCallback(Q=>{d([...c,{...Q,timestamp:Date.now()}])},[c]),f=g.useCallback(()=>{d([])},[]);return{files:t,activeFileName:a,setActiveFileName:r,addFiles:u,delFiles:C,activeFile:s,resetFiles:n,updateFileContent:l,logs:c,addLog:B,clearLog:f}}const je="_iframe_3ns55_59",Je="_icon_3ns55_81",y={"preview-content":"_preview-content_3ns55_1","preview-url":"_preview-url_3ns55_10","url-btn":"_url-btn_3ns55_25","url-icon":"_url-icon_3ns55_38","url-input":"_url-input_3ns55_46","preview-iframe":"_preview-iframe_3ns55_55",iframe:je,"preview-console":"_preview-console_3ns55_65","preview-drag":"_preview-drag_3ns55_71",icon:Je,"console-drag":"_console-drag_3ns55_93"},qe="_console_w38yi_1",Me="_icon_w38yi_42",D={console:qe,"preview-console-header":"_preview-console-header_w38yi_5","header-left":"_header-left_w38yi_15","log-count":"_log-count_w38yi_21","header-right":"_header-right_w38yi_31","clear-btn":"_clear-btn_w38yi_31",icon:Me,"preview-console-main":"_preview-console-main_w38yi_52","console-no-log":"_console-no-log_w38yi_59","console-timestamp":"_console-timestamp_w38yi_65"},Ue=({logs:e,clearLog:i})=>o.jsxs("div",{className:D.console,children:[o.jsxs("header",{className:D["preview-console-header"],children:[o.jsxs("div",{className:D["header-left"],children:[o.jsx(se,{style:{color:"#fff",width:16,height:16}}),o.jsx("span",{className:D["console-title"],children:"Console"}),o.jsx("div",{className:D["log-count"],children:e.length})]}),o.jsx("div",{className:D["header-right"],children:o.jsx("button",{className:D["clear-btn"],onClick:i,children:o.jsx(pe,{className:D.icon})})})]}),o.jsxs("main",{className:D["preview-console-main"],children:[e.length===0&&o.jsx("p",{className:D["console-no-log"],children:"No logs yet..."}),e.map((t,A)=>o.jsxs("div",{children:[o.jsxs("span",{className:D["console-timestamp"],children:[" ","[",new Date(t.timestamp).toLocaleTimeString(),"]"]}),o.jsxs("span",{style:{color:t.type==="error"?"red":t.type==="warn"?"#f7b731":t.type==="info"?"#45aaf2":"#fff"},children:[" ",t.message," "]})]},`${t.type}-${A}-${t.timestamp}`))]})]}),X={axios:"https://esm.sh/axios@1.1.3",dayjs:"https://esm.sh/dayjs@1.11.7",lodash:"https://esm.sh/lodash@4.17.21"},ce={react:"https://esm.sh/react@18.3.1?dev","react-dom":"https://esm.sh/react-dom@18.3.1?dev","react-dom/client":"https://esm.sh/react-dom@18.3.1/client?dev","react/jsx-runtime":"https://esm.sh/react@18.3.1/jsx-runtime?dev","react-router-dom":"https://esm.sh/react-router-dom@6?dev&external=react,react-dom",zustand:"https://esm.sh/zustand@4.5.7?dev&external=react,react-dom,use-sync-external-store","zustand/middleware":"https://esm.sh/zustand@4.5.7/middleware?dev&external=react,react-dom,use-sync-external-store","zustand/vanilla":"https://esm.sh/zustand@4.5.7/vanilla?dev&external=react,react-dom","use-sync-external-store":"https://esm.sh/use-sync-external-store@1.2.0?dev&external=react,react-dom","use-sync-external-store/shim":"https://esm.sh/use-sync-external-store@1.2.0/shim?dev&external=react,react-dom","use-sync-external-store/shim/with-selector":"https://esm.sh/use-sync-external-store@1.2.0/shim/with-selector?dev&external=react,react-dom","use-sync-external-store/shim/with-selector.js":"https://esm.sh/use-sync-external-store@1.2.0/shim/with-selector?dev&external=react,react-dom",...X},le={vue:"https://esm.sh/vue@3.5.13","vue-router":"https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13",pinia:"https://esm.sh/pinia@2.1.7?deps=vue@3.5.13",...X};function Te(e,i,t,A){const a=`
    <script type="importmap">
      { "imports": ${JSON.stringify(X)} }
    <\/script>
  `;return`
        <!DOCTYPE html>
        <html>
          <head>
            <base target="_self" />
            <style>${i}</style>
            ${a}
            ${A}
          </head>
          <body>
            ${e}
            <script type="module">
              ${t}
            <\/script>
          </body>
        </html>
      `}var Ae;(function(e){e[e.Static=1]="Static",e[e.Dynamic=2]="Dynamic",e[e.ImportMeta=3]="ImportMeta",e[e.StaticSourcePhase=4]="StaticSourcePhase",e[e.DynamicSourcePhase=5]="DynamicSourcePhase",e[e.StaticDeferPhase=6]="StaticDeferPhase",e[e.DynamicDeferPhase=7]="DynamicDeferPhase"})(Ae||(Ae={}));const Ge=new Uint8Array(new Uint16Array([1]).buffer)[0]===1;function ee(e,i="@"){if(!m)return te.then((()=>ee(e)));const t=e.length+1,A=(m.__heap_base.value||m.__heap_base)+4*t-m.memory.buffer.byteLength;A>0&&m.memory.grow(Math.ceil(A/65536));const a=m.sa(t-1);if((Ge?Pe:He)(e,new Uint16Array(m.memory.buffer,a,t)),!m.parse())throw Object.assign(new Error(`Parse error ${i}:${e.slice(0,m.e()).split(`
`).length}:${m.e()-e.lastIndexOf(`
`,m.e()-1)}`),{idx:m.e()});const r=[],s=[];for(;m.ri();){const l=m.is(),n=m.ie(),c=m.it(),d=m.ai(),B=m.id(),f=m.ss(),Q=m.se();let p;m.ip()&&(p=u(e.slice(B===-1?l-1:l,B===-1?n+1:n)));const E=[];for(m.rsa();m.ra();){const k=m.aks(),N=m.ake(),L=m.avs(),v=m.ave();E.push([C(e.slice(k,N)),C(e.slice(L,v))])}r.push({n:p,t:c,s:l,e:n,ss:f,se:Q,d:B,a:d,at:E.length>0?E:null})}for(;m.re();){const l=m.es(),n=m.ee(),c=m.els(),d=m.ele(),B=C(e.slice(l,n)),f=c<0?void 0:C(e.slice(c,d));s.push({s:l,e:n,ls:c,le:d,n:B,ln:f})}function u(l){try{return(0,eval)(l)}catch{}}function C(l){if(!l)return l;const n=l[0];return(n==='"'||n==="'")&&u(l)||l}return[r,s,!!m.f(),!!m.ms()]}function He(e,i){const t=e.length;let A=0;for(;A<t;){const a=e.charCodeAt(A);i[A++]=(255&a)<<8|a>>>8}}function Pe(e,i){const t=e.length;let A=0;for(;A<t;)i[A]=e.charCodeAt(A++)}let m;const $e=()=>{return e="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",typeof Buffer<"u"?Buffer.from(e,"base64"):Uint8Array.from(atob(e),(i=>i.charCodeAt(0)));var e},te=WebAssembly.compile($e()).then(WebAssembly.instantiate).then((({exports:e})=>{m=e}));async function Ye(e,i){if(!e)return"";await te;try{const[t]=ee(e);let A=e;const a=new Set(i.map(r=>r.name));if(!t.length)return A;for(let r=t.length-1;r>=0;r--){const{s,e:u,n:C}=t[r];if(!C||ce[C])continue;const l=C.replace(/^\.\//,"");let n="";const c=["",".jsx",".tsx",".js",".ts",".css"];for(const d of c)if(a.has(l+d)){n=l+d;break}if(n){const d=`src/${n}`;A=A.slice(0,s)+d+A.slice(u)}else if(!C.startsWith("http")&&!C.startsWith(".")){const d=`https://esm.sh/${C}?dev&external=react,react-dom`;A=A.slice(0,s)+d+A.slice(u)}}return A}catch(t){return console.error("Transform imports failed:",t),e}}async function Oe(e,i){await te;const[t]=ee(e);let A=e;const a=new Set(i.map(r=>r.name));for(let r=t.length-1;r>=0;r--){const{s,e:u,n:C}=t[r];if(!C||le[C])continue;const l=C.replace(/^\.\//,"");let n="";if(a.has(l)?n=l:a.has(l+".vue")?n=l+".vue":a.has(l+".js")&&(n=l+".js"),n){const c=`src/${n}`;A=A.slice(0,s)+c+A.slice(u)}else if(!C.startsWith("http")&&!C.startsWith(".")){const c=`https://esm.sh/${C}`;A=A.slice(0,s)+c+A.slice(u)}}return A}function We(e){return new Worker("/assets/compiler.worker-D3IIElOt.js",{name:e?.name})}function ze(e){return new Worker("/assets/vueCompiler.worker-BmT874eT.js",{name:e?.name})}let G=null;const z=new Map;function Ve(){return G||(G=new We,G.onmessage=e=>{const{id:i,...t}=e.data,A=z.get(i);A&&(A(t),z.delete(i))}),G}function Ze(e,i){return i.endsWith(".css")?Promise.resolve({code:"",css:e}):new Promise(t=>{const A=Math.random().toString(36).slice(2),a=Ve();z.set(A,r=>{r.type==="ERROR"?t({code:"",error:r.message}):t({code:r.code,css:""})}),a.postMessage({id:A,code:e,filename:i})})}let H=null;const V=new Map;function Xe(){return H||(H=new ze,H.onmessage=e=>{const{id:i,...t}=e.data,A=V.get(i);A&&(A(t),V.delete(i))}),H}async function et(e,i){return e.endsWith(".js")?{code:i}:e.endsWith(".vue")?new Promise(t=>{const A=Math.random().toString(36).slice(2),a=Xe();V.set(A,r=>{if(r.type==="ERROR"){t({code:`console.error(${JSON.stringify(`Compilation error in ${e}: ${r.message??""}`)});
export default {};`,css:"",error:r.message});return}t({code:r.code??"export default {}",css:r.css??""})}),a.postMessage({id:A,code:i,filename:e})}):{code:i}}const tt={...le};function ot(e){let i=0;for(let t=0;t<e.length;t++)i=i*31+e.charCodeAt(t)|0;return i}function ne(e){setTimeout(()=>URL.revokeObjectURL(e),15e3)}function At(e){const i=e.some(A=>A.name==="router.js");return e.some(A=>A.name==="App.vue")?['import { createApp } from "vue";',i?'import router from "src/router.js";':"",'import App from "src/App.vue";','import { createPinia } from "pinia";',"const pinia = createPinia();","const app = createApp(App);",i?"app.use(router);":"","app.use(pinia);",'app.mount("#app");'].filter(Boolean).join(`
`):""}const j=new Map;let O=null;async function nt(e,i,t){const A=new Set(e.map(n=>n.name));for(const[n,c]of j.entries())A.has(n)||(j.delete(n),ne(c.blobUrl));const a=Array.from(A).sort().join("|"),r={...tt};if(!O){const n=`
import * as orig from 'https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13';
export * from 'https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13';

// 核心修复：强制使用 Memory 模式，完全解耦浏览器 URL
export const createWebHistory = (base) => orig.createMemoryHistory(base);
export const createWebHashHistory = (base) => orig.createMemoryHistory(base);
export const createMemoryHistory = orig.createMemoryHistory;

export const createRouter = (options) => {
  // 强制覆盖 history 模式
  options.history = orig.createMemoryHistory();
  // 移除 base 配置，防止干扰 MemoryHistory
  if (options.base) delete options.base;
  
  const router = orig.createRouter(options);
  
  // 注入全局对象以便通信
  window.v_router = router;
  if (window.initRouterSync) window.initRouterSync(router);
  
  return router;
};
`,c=new Blob([n],{type:"text/javascript"});O=URL.createObjectURL(c)}r["vue-router"]=O;const s=e.map(async n=>{const c=ot(`${n.content}
${a}`),d=j.get(n.name);if(d&&d.hash===c){r[`src/${n.name}`]=d.blobUrl;return}const B=await et(n.name,n.content),f=B.code??"",Q=B.css??"";let p=f;try{p=await Oe(f,e)}catch{p=f}const E=new Blob([p],{type:"text/javascript"}),k=URL.createObjectURL(E);d&&ne(d.blobUrl),j.set(n.name,{code:p,css:Q,blobUrl:k,hash:c}),r[`src/${n.name}`]=k});await Promise.all(s);let u="";if(j.has("main.js"))u=`<script type="module" src="${r["src/main.js"]}"><\/script>`;else if(e.find(c=>c.name==="App.vue")||e[0]){const c=At(e);if(!c)return"<h1>Error: No App.vue found</h1>";u=`<script type="module">
${c}
<\/script>`}else return"<h1>Error: No App.vue or main.js found</h1>";const C=Array.from(j.values()).map(n=>n.css||"").join(`
`),l=`
<script>
window.__PLAYGROUND_INSTANCE_ID__ = "${i}";

(function() {
  // 1. 消息处理器：使用闭包变量防止污染
  const handleParentMessage = (e) => {
    const { type, path, id } = e.data;
    if (id !== window.__PLAYGROUND_INSTANCE_ID__) return;

    if (type === 'PUSH_ROUTE' && path) {
      const tryPush = (count = 0) => {
        if (window.v_router) {
          // 性能优化：直接处理纯净路径，不再进行复杂的字符串拼接
          const target = path.startsWith('#') ? path.slice(1) : path;
          syncedFromParent = true;
          // 使用 push 而不是 replace，以支持历史记录堆栈
          const doPush = () => {
            window.v_router
              .push(target)
              .then(() => {
                notifyParent(window.v_router.currentRoute.value.fullPath);
              })
              .catch(() => {});
          };
          if (window.v_router.isReady) {
            window.v_router.isReady().then(doPush).catch(doPush);
          } else {
            doPush();
          }
        } else if (count < 10) {
          setTimeout(() => tryPush(count + 1), 100);
        }
      };
      tryPush();
    }

    if (type === 'GO_BACK') {
      if (window.v_router) window.v_router.go(-1);
      else history.back();
    }
    if (type === 'GO_FORWARD') {
      if (window.v_router) window.v_router.go(1);
      else history.forward();
    }
  };

  window.addEventListener('message', handleParentMessage);

  // 2. 核心通知函数：增加频率限制（Debounce 思想）
  let lastPath = '';
  let syncedFromParent = false;
  function notifyParent(path) {
    if (path === lastPath) return; // 性能优化：路径没变不发消息
    lastPath = path;
    
    window.parent.postMessage({
      type: 'ROUTER_CHANGE',
      path: path,
      id: window.__PLAYGROUND_INSTANCE_ID__
    }, '*');
  }


  // 3. 核心挂载钩子
  window.initRouterSync = (router) => {
    window.v_router = router;
    
    // 监听路由变化
    router.afterEach((to) => {
      if (!syncedFromParent) return;
      notifyParent(to.fullPath);
    });

    // 初始握手：等待 router 完成初始导航后再发 READY
    // 避免 router 还没 install/mount 时 push 无效
    const sendReady = () => {
      // 强制触发一次导航到当前路径，确保 router-view 渲染
      // MemoryHistory 模式下，有时初始导航不会自动触发组件渲染
      const current = router.currentRoute.value.fullPath;
      if (current === '/') {
        // 如果是根路径，显式 replace 一次以激活组件
        router.replace('/').catch(() => {});
      }
      
      window.parent.postMessage(
        {
          type: 'ROUTER_READY',
          id: window.__PLAYGROUND_INSTANCE_ID__
        },
        '*'
      );
    };
    if (router.isReady) {
      router.isReady().then(sendReady).catch(sendReady);
    } else {
      setTimeout(sendReady, 0);
    }
  };
   // 4. 全局点击拦截
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('blob:')) {
      return;
    }

    if (e.defaultPrevented) return;

    e.preventDefault();
    
    const navigate = () => {
      const router = window.v_router;
      if (router) {
        const path = href.startsWith('#') ? href.slice(1) : href;
        if (router.navigate) {
          router.navigate(path);
        } else if (router.history) {
          router.history.push(path);
        }
      } else {
        // 修复2：修正为 Vue Router 提示，移除 React 相关内容
        console.warn('Playground Router not found. Please ensure you are using vue-router.');
      }
    };

    if (!window.v_router) {
      setTimeout(navigate, 0);
    } else {
      navigate();
    }
  }); 
 // 5. 禁止任何可能导致 SecurityError 的原生 History 操作
  // 核心修复：在使用 MemoryHistory 时，禁止所有对浏览器 History 的原生操作
  // 这能彻底防止 SecurityError 和 意外的 URL 变化
  (function() {
    function noop() {}
    try {
      history.pushState = noop;
      history.replaceState = noop;
      history.go = noop;
      history.back = noop;
      history.forward = noop;
    } catch(e) {
      // ignore errors if history is frozen
    }
  })();
 
})();
<\/script>
`;return`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script type="importmap">
          ${JSON.stringify({imports:r})}
        <\/script>
          ${l}
        ${t}
        <style>
          body { margin: 0; font-family: sans-serif; }
          ${C}
        </style>
      </head>
      <body>
        <div id="app"></div>
        ${u}
      </body>
    </html>
  `}const rt={...ce};function st(e){let i=0;for(let t=0;t<e.length;t++)i=i*31+e.charCodeAt(t)|0;return i}function it(e){const i=e.find(t=>t.name==="App.jsx"||t.name==="App.tsx")||null;return i?['import React from "react";','import { createRoot } from "react-dom/client";',`import * as AppModule from "src/${i.name}";`,'const el = document.getElementById("root");','if (!el) throw new Error("Missing #root");',"const root = createRoot(el);","const App = AppModule.default ?? AppModule.App;",'const Fallback = () => React.createElement("pre", { style: { padding: 16, whiteSpace: "pre-wrap" } }, "App 入口模块缺少可用导出（期望 default 或 App）。\\n\\n请检查 App 文件是否编译成功。");','root.render(React.createElement(typeof App === "function" ? App : Fallback));'].join(`
`):""}const J=new Map;let W=null;function re(e){setTimeout(()=>URL.revokeObjectURL(e),15e3)}async function at(e,i,t){const A=new Set(e.map(n=>n.name));for(const[n,c]of J.entries())A.has(n)||(J.delete(n),re(c.blobUrl));const a={...rt};if(!W){const n=`
import React from 'react';
import * as ReactRouterDOM from 'https://esm.sh/react-router-dom@6?dev&deps=react@18.3.1,react-dom@18.3.1';

// 拦截 console.warn 以屏蔽 React Router v7 的 future flag 警告
(function() {
  const originalWarn = console.warn;
  console.warn = function(...args) {
    const msg = typeof args[0] === 'string' ? args[0] : JSON.stringify(args[0]);
    const isRoutersV7FutureWarn = msg.includes('React Router Future Flag Warning') || 
      msg.includes('v7_startTransition') ||
      msg.includes('v7_relativeSplatPath')
    if(!isRoutersV7FutureWarn) {
      originalWarn.apply(console, args);
    }
  };
})();

export * from 'https://esm.sh/react-router-dom@6?dev&deps=react@18.3.1,react-dom@18.3.1';

// 强制使用 MemoryRouter，适配 Playground 环境
export function createBrowserRouter(routes, opts) {
    
  const router = ReactRouterDOM.createMemoryRouter(routes, {...opts, future: { v7_startTransition: true } });
  if (typeof window !== 'undefined') {
    window.v_router = router;
    if (window.initRouterSync) window.initRouterSync(router);
  }
  return router;
}


// 核心修复：拦截 BrowserRouter 和 HashRouter 组件，强制使用 MemoryRouter
export function BrowserRouter({ children, ...props }) {
  const routerRef = React.useRef(null);
  if (!routerRef.current) {
     const routes = [{ path: "*", element: React.createElement(React.Fragment, null, children) }];
     routerRef.current = ReactRouterDOM.createMemoryRouter(routes, { ...props, future: { v7_startTransition: true } });
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.v_router = routerRef.current;
      if (window.initRouterSync) window.initRouterSync(routerRef.current);
    }
  }, []);

  return React.createElement(ReactRouterDOM.RouterProvider, { router: routerRef.current });
}

export function HashRouter({ children, ...props }) {
  const routerRef = React.useRef(null);
  if (!routerRef.current) {
     const routes = [{ path: "*", element: React.createElement(React.Fragment, null, children) }];
     routerRef.current = ReactRouterDOM.createMemoryRouter(routes, { ...props, future: { v7_startTransition: true } });
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.v_router = routerRef.current;
      if (window.initRouterSync) window.initRouterSync(routerRef.current);
    }
  }, []);

  return React.createElement(ReactRouterDOM.RouterProvider, { router: routerRef.current });
}
`,c=new Blob([n],{type:"text/javascript"});W=URL.createObjectURL(c)}a["react-router-dom"]=W;const r=e.map(async n=>{const c=st(n.content),d=J.get(n.name);if(d&&d.hash===c){a[`src/${n.name}`]=d.blobUrl;return}const B=await Ze(n.content,n.name),f=B.code??"",Q=B.css??"";let p=f;try{p=await Ye(f,e)}catch{p=f}const E=p.replace(/("(\\.|[^"\\])*"|'(\\.|[^'\\])*'|`(\\.|[^`\\])*`)/g,"").replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,"");(n.name.endsWith(".jsx")||n.name.endsWith(".tsx"))&&/<\s*[A-Za-z]/.test(E)&&(p=['import React from "react";',`console.error("Playground 编译失败：${n.name}");`,"export default function __PlaygroundCompileError() {",`  return React.createElement("pre", { style: { padding: 16, whiteSpace: "pre-wrap" } }, "编译失败：${n.name}\\n\\n请检查 JSX/语法是否正确。");`,"}"].join(`
`));const N=new Blob([p],{type:"text/javascript"}),L=URL.createObjectURL(N);d&&re(d.blobUrl),J.set(n.name,{code:p,css:Q,blobUrl:L,hash:c}),a[`src/${n.name}`]=L});await Promise.all(r);let s="";const u=e.find(n=>n.name==="main.jsx"||n.name==="main.tsx");if(u&&J.has(u.name))s=`<script type="module" src="${a[`src/${u.name}`]}"><\/script>`;else if(e.find(c=>c.name==="App.jsx"||c.name==="App.tsx")||e[0]){const c=it(e);if(!c)return"<h1>Error: No App.jsx or App.tsx found</h1>";s=`<script type="module">
${c}
<\/script>`}else return"<h1>Error: No App.jsx or main.jsx found</h1>";const C=Array.from(J.values()).map(n=>n.css||"").join(`
`),l=`
<script>
window.__PLAYGROUND_INSTANCE_ID__ = "${i}";

(function() {
  // 1. 消息处理器
  const handleParentMessage = (e) => {
    const { type, path, id } = e.data;
    if (id !== window.__PLAYGROUND_INSTANCE_ID__) return;

    if (type === 'PUSH_ROUTE' && path) {
      const tryPush = (count = 0) => {
        if (window.v_router) {
          const router = window.v_router;
          window.__syncedFromParent = true;
          
          const doPush = () => {
            if (router.navigate) {
              router.navigate(path).catch(console.error);
            } else if (router.history) {
              router.history.push(path);
            }
          };
          
          if (router.state && router.state.initialized === false) {
             setTimeout(doPush, 50);
          } else {
             doPush();
          }
        } else if (count < 10) {
          setTimeout(() => tryPush(count + 1), 100);
        }
      };
      tryPush();
    }

    if (type === 'GO_BACK') {
       if (window.v_router?.navigate) window.v_router.navigate(-1);
       else if (window.v_router?.history) window.v_router.history.back();
       else history.back();
    }

    if (type === 'GO_FORWARD') {
       if (window.v_router?.navigate) window.v_router.navigate(1);
       else if (window.v_router?.history) window.v_router.history.forward();
       else history.forward();
    }
  };

  window.addEventListener('message', handleParentMessage);

  // 2. 路由同步逻辑
  let lastPath = '';
  // 3. 发送消息给父窗口
  function notifyParent(location) {
    const path = (location.pathname || '/') + (location.search || '') + (location.hash || '');
    if (path === lastPath) return; 
    lastPath = path;
    window.parent.postMessage({
      type: 'ROUTER_CHANGE',
      path: path,
      id: window.__PLAYGROUND_INSTANCE_ID__
    }, '*');
  }

  window.initRouterSync = (router) => {
    window.v_router = router;
    
    // 立即同步初始路径
    if (router.state?.location) {
      notifyParent(router.state.location);
    }

    if (router.subscribe) {
      router.subscribe((state) => {
         
        //  如果这次变化是由父窗口指令触发的，我们不应该再通知父窗口
         if (window.__syncedFromParent) {
            window.__syncedFromParent = false;
            return
         }
        notifyParent(state.location);
      });
    }

    setTimeout(() => {
      window.parent.postMessage({ type: 'ROUTER_READY', id: window.__PLAYGROUND_INSTANCE_ID__ }, '*');
    }, 100);
  };

  // 3. 全局点击拦截
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('blob:')) {
      return;
    }

    if (e.defaultPrevented) return;

    e.preventDefault();
    
    const navigate = () => {
      const router = window.v_router;
      if (router) {
        const path = href.startsWith('#') ? href.slice(1) : href;
        if (router.navigate) {
          router.navigate(path);
        } else if (router.history) {
          router.history.push(path);
        }
      } else {
        console.warn('Playground Router not found. Please ensure you are using BrowserRouter or createBrowserRouter from react-router-dom.');
      }
    };

    // 给 React 一点时间处理可能的并发渲染
    if (!window.v_router) {
      setTimeout(navigate, 0);
    } else {
      navigate();
    }
  }, false);
})();
<\/script>
`;return`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <script type="importmap">
          ${JSON.stringify({imports:a})}
        <\/script>
          ${t}
          ${l}
        <style>
          body { margin: 0;padding: 0; font-family: sans-serif; }
          ${C}
        </style>
      </head>
      <body>
        <div id="root"></div>
        ${s}
      </body>
    </html>
  `}const ct=({files:e,logs:i,addLog:t,clearLog:A,showLog:a,defaultLanguage:r})=>{const[s,u]=g.useState(!1),C=g.useRef(null),l=g.useRef(null),[n,c]=g.useState(""),d=$.useId(),B=$.useId(),f=$.useId(),Q=g.useRef(0),[p,E]=g.useState(192),k=g.useRef(0),[N,L]=g.useState(0),[v,b]=g.useState("/"),q=g.useRef(v),[P,ge]=g.useState(!0),U=g.useRef(!1),T=(h,w={})=>{if(C.current){let I;if(r==="html")return;r==="vue"?I=B:r==="react"&&(I=f),C.current.contentWindow?.postMessage({type:h,id:I,...w},"*")}},ue=()=>{L(h=>h+1)},Qe=h=>{h.preventDefault();const w=v.startsWith("/")?v:`/${v}`;T("PUSH_ROUTE",{path:w}),U.current&&q.current!==v&&b(w),console.log(v)};return g.useEffect(()=>{const h=new ResizeObserver(w=>{for(const I of w)ge(I.contentRect.width>270)});return h.observe(l.current),()=>{h.disconnect()}},[]),g.useEffect(()=>{q.current=v},[v]),g.useEffect(()=>{U.current=!1},[N]),g.useEffect(()=>{const h=I=>{if(!s)return;const S=I.clientY-k.current,_=Math.max(122,Math.min(Q.current-S,400));E(_)},w=()=>{u(!1),document.body.style.cursor="default"};return window.addEventListener("mousemove",h),window.addEventListener("mouseup",w),()=>{window.removeEventListener("mousemove",h),window.removeEventListener("mouseup",w)}},[s]),g.useEffect(()=>{const h=w=>{if(w.data?.type==="console"&&w.data?.id===d&&w.data?.log){const F=w.data.log;t(F)}const{type:I,path:S,id:_}=w.data||{};if(I==="ROUTER_READY"&&(_===B||_===f)){U.current=!0,T("PUSH_ROUTE",{path:q.current});return}if(I==="ROUTER_CHANGE"&&(_===B||_===f)&&typeof S=="string"){if(!U.current)return;b(F=>F===S?F:S)}};return window.addEventListener("message",h),()=>window.removeEventListener("message",h)},[t,d,B,f]),g.useEffect(()=>{const h=setTimeout(async()=>{const w=`
        <script>
          (function() {
            const instanceId = "${d}";
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            const originalInfo = console.info;

            function sendLog(type, args) {
              try {
                const message = args.map(arg => {
                  if (typeof arg === 'object') {
                    try {
                      return JSON.stringify(arg);
                    } catch(e) {
                      return String(arg);
                    }
                  }
                  return String(arg);
                }).join(' ');
                window.parent.postMessage({ type: 'console', id: instanceId, log: { type, message } }, '*');
              } catch (e) {
                // ignore
              }
            }

            console.log = function(...args) {
              originalLog.apply(console, args);
              sendLog('log', args);
            };
            console.error = function(...args) {
              originalError.apply(console, args);
              sendLog('error', args);
            };
            console.warn = function(...args) {
              originalWarn.apply(console, args);
              sendLog('warn', args);
            };
            console.info = function(...args) {
              originalInfo.apply(console, args);
              sendLog('info', args);
            };

            window.onerror = function(msg, url, line, col, error) {
              let detailedMsg = String(msg);
              if (url) {
                const cleanUrl = url.startsWith('blob:') ? 'script.js' : url;
                detailedMsg += '\\nAt: ' + cleanUrl + ':' + line + ':' + col;
              }
              if (error && error.stack) {
                detailedMsg += '\\n\\nStack Trace:\\n' + error.stack;
              }
              sendLog('error', [detailedMsg]);
              return false;
            };

            // 拦截表单提交
            document.addEventListener('submit', function(e) {
              e.preventDefault();
              const form = e.target;
              const action = form.getAttribute('action');
              console.warn('预览模式下禁止表单提交: ' + (action || '无动作'));
            }, true);
          })();
        <\/script>
      `;if(r==="html"){const I=e.find(M=>M.name.endsWith(".html"))?.content||"",S=e.find(M=>M.name.endsWith(".css"))?.content||"",_=e.find(M=>M.name.endsWith(".js"))?.content||"",F=Te(I,S,_,w);c(F)}else if(r==="vue")try{const I=await nt(e,B,w);c(I)}catch(I){console.error("Vue代码拼接错误:",I)}else if(r==="react")try{const I=await at(e,f,w);c(I)}catch(I){console.error("React代码拼接错误:",I)}},1e3);return()=>clearTimeout(h)},[e,r,B,f]),o.jsxs("div",{className:y["preview-content"],ref:l,children:[r!=="html"&&o.jsxs("div",{className:y["preview-url"],children:[o.jsx("button",{className:y["url-btn"],onClick:()=>T("GO_BACK"),children:o.jsx(me,{className:y["url-icon"]})}),o.jsx("button",{className:y["url-btn"],onClick:()=>T("GO_FORWARD"),children:o.jsx(Be,{className:y["url-icon"]})}),o.jsx("button",{className:y["url-btn"],onClick:ue,children:o.jsx(Ee,{className:y["url-icon"]})}),P&&o.jsx("form",{onSubmit:Qe,children:o.jsx("input",{type:"text",className:y["url-input"],value:v,onChange:h=>b(h.target.value)})})]}),o.jsx("div",{className:y["preview-iframe"],children:o.jsx("iframe",{title:"preview",ref:C,srcDoc:n,sandbox:"allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox ",className:y.iframe,style:{pointerEvents:s?"none":"auto"}},N)}),a&&o.jsxs("div",{className:y["preview-console"],children:[o.jsx("div",{className:y["preview-drag"],onMouseDown:h=>{h.preventDefault(),u(!0),k.current=h.clientY,Q.current=p},children:o.jsx(fe,{className:y.icon})}),o.jsx("div",{style:{height:p+"px"},children:o.jsx(Ue,{logs:i,clearLog:A})})]}),s&&o.jsx("div",{className:y["console-drag"]})]})},lt={"edit-editor":"_edit-editor_sfq3v_1"},gt="playground-dark";function oe(e){e.editor.defineTheme(gt,{base:"vs-dark",inherit:!0,rules:[{token:"",foreground:"#D4D4D4"},{token:"comment",foreground:"#6A9955",fontStyle:"italic"},{token:"keyword",foreground:"#569CD6"},{token:"keyword.control",foreground:"#C586C0"},{token:"storage",foreground:"#569CD6"},{token:"storage.type",foreground:"#569CD6"},{token:"operator",foreground:"#D4D4D4"},{token:"string",foreground:"#CE9178"},{token:"number",foreground:"#B5CEA8"},{token:"regexp",foreground:"#D16969"},{token:"delimiter",foreground:"#D4D4D4"},{token:"identifier",foreground:"#9CDCFE"},{token:"variable",foreground:"#9CDCFE"},{token:"variable.parameter",foreground:"#9CDCFE"},{token:"variable.predefined",foreground:"#4FC1FF"},{token:"function",foreground:"#DCDCAA"},{token:"type",foreground:"#4EC9B0"},{token:"class",foreground:"#4EC9B0"},{token:"interface",foreground:"#4EC9B0"},{token:"member",foreground:"#DCDCAA"},{token:"property",foreground:"#9CDCFE"},{token:"attribute.name",foreground:"#9CDCFE"},{token:"tag",foreground:"#569CD6"},{token:"tag.tag-main",foreground:"#569CD6"},{token:"tag.id",foreground:"#DCDCAA"},{token:"tag.class",foreground:"#DCDCAA"},{token:"attribute.value",foreground:"#CE9178"},{token:"attribute.value.number",foreground:"#B5CEA8"},{token:"attribute.value.unit",foreground:"#B5CEA8"},{token:"attribute.value.html",foreground:"#CE9178"},{token:"attribute.value.xml",foreground:"#CE9178"},{token:"metatag",foreground:"#808080"},{token:"metatag.content.html",foreground:"#D4D4D4"},{token:"keyword.scss",foreground:"#C586C0"},{token:"selector.css",foreground:"#ffd70b"},{token:"variable.scss",foreground:"#9CDCFE"},{token:"variable.variable.scss",foreground:"#9CDCFE"},{token:"property.scss",foreground:"#9CDCFE"},{token:"selector.scss",foreground:"#DCDCAA"},{token:"tag.scss",foreground:"#DCDCAA"},{token:"attribute.value.scss",foreground:"#CE9178"},{token:"keyword.css",foreground:"#C586C0"},{token:"variable.css",foreground:"#9CDCFE"},{token:"property.css",foreground:"#9CDCFE"},{token:"tag.css",foreground:"#ffd70b"},{token:"string.key.json",foreground:"#9CDCFE"},{token:"string.value.json",foreground:"#CE9178"},{token:"number.json",foreground:"#B5CEA8"},{token:"keyword.json",foreground:"#569CD6"},{token:"vue.directive",foreground:"#C586C0"},{token:"jsx.tag",foreground:"#569CD6"},{token:"jsx.tag.component",foreground:"#4EC9B0"},{token:"jsx.bracket",foreground:"#808080"}],colors:{"editor.background":"#1E1E1E","editor.foreground":"#D4D4D4","editorCursor.foreground":"#AEAFAD","editor.lineHighlightBackground":"#2F3337","editorLineNumber.foreground":"#858585","editorLineNumber.activeForeground":"#C6C6C6","editorIndentGuide.background":"#404040","editorIndentGuide.activeBackground":"#707070","editorWhitespace.foreground":"#333333","editor.selectionBackground":"#264F78","editor.inactiveSelectionBackground":"#3A3D41","editorWidget.background":"#252526","editorWidget.border":"#454545","editorSuggestWidget.background":"#252526","editorSuggestWidget.border":"#454545","editorSuggestWidget.selectedBackground":"#063B49","peekViewResult.background":"#252526","peekViewEditor.background":"#001F33","peekViewTitle.background":"#001F33","list.hoverBackground":"#2A2D2E","list.activeSelectionBackground":"#094771","list.activeSelectionForeground":"#FFFFFF"}})}const ut=["div","span","p","button","h1","h2","h3","ul","li","form","a","main","footer","header","nav","section"],Qt=["img","input","br","hr"],Ct=[{label:"log",insertText:"console.log(${1:message})",documentation:"插入 console.log 代码片段，光标定位到参数位置"},{label:"error",insertText:"console.error(${1:error})",documentation:"插入 console.error 代码片段，用于输出错误信息"},{label:"warn",insertText:"console.warn(${1:warn})",documentation:"插入 console.warn 代码片段，用于输出警告信息"},{label:"for",insertText:["for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {","  ${3:// code}","}"].join(`
`),documentation:"插入标准 for 循环代码片段"},{label:"if",insertText:["if (${1:condition}) {","  ${2:// code}","}"].join(`
`),documentation:"插入 if 条件判断代码片段"}];function dt(e){oe(e),e.languages.registerCompletionItemProvider("javascript",{provideCompletionItems:(i,t)=>{const A=i.getWordUntilPosition(t),a={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:A.startColumn,endColumn:A.endColumn};return{suggestions:Ct.map(s=>({...s,kind:e.languages.CompletionItemKind.Snippet,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a}))}}}),e.languages.registerCompletionItemProvider("html",{provideCompletionItems:(i,t)=>{const A=i.getWordUntilPosition(t),a={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:A.startColumn,endColumn:A.endColumn},r=[];return ut.forEach(s=>{r.push({label:s,kind:e.languages.CompletionItemKind.Tag,insertText:`<${s}>$0</${s}>`,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),Qt.forEach(s=>{r.push({label:s+" (self-closing)",kind:e.languages.CompletionItemKind.Tag,insertText:`<${s} />`,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),{suggestions:r}}})}const pt=["useState","useEffect","useContext","useReducer","useCallback","useMemo","useRef","useImperativeHandle","useLayoutEffect","useDebugValue","useSyncExternalStore","useTransition","useDeferredValue","useId","useInsertionEffect"],mt=[{label:"onClick",text:"onClick={${1:handler}}"},{label:"onChange",text:"onChange={${1:handler}}"},{label:"className",text:'className="${1:class}"'},{label:"style",text:"style={{ $1 }}"},{label:"ref",text:"ref={${1:ref}}"},{label:"key",text:"key={${1:key}}"}],Bt=["div","span","p","button","h1","h2","h3","ul","li","form","a","section","article","nav","header","footer"],Et=["img","input","br","hr","meta","link"];function ft(e){oe(e),e.languages.getLanguages().some(i=>i.id==="jsx")||e.languages.register({id:"jsx"}),e.languages.setMonarchTokensProvider("jsx",{defaultToken:"",tokenPostfix:".jsx",keywords:["break","case","catch","class","continue","const","constructor","debugger","default","delete","do","else","export","extends","false","finally","for","from","function","get","if","import","in","instanceof","let","new","null","return","set","super","switch","symbol","this","throw","true","try","typeof","undefined","var","void","while","with","yield","async","await","of"],operators:["<=",">=","==","!==","===","!=","=>","+","-","**","*","/","%","++","--","<<","<<<",">>",">>>","&","|","^","!","~","&&","||","?",":","=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","&=","|=","^="],symbols:/[=><!~?:&|+\-*/^%]+/,escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,tokenizer:{root:[[/{\/\*/,"comment","@jsxComment"],[/(<)([a-zA-Z0-9-]+)/,[{token:"delimiter"},{token:"tag",next:"@jsxAttributes"}]],[/\{/,{token:"delimiter.bracket",next:"@jsExpression"}],[/[a-zA-Z_$][\w$]*/,{cases:{"@keywords":"keyword","@default":"identifier"}}],{include:"@whitespace"},[/[{}()[\]]/,"@brackets"],[/[<>](?!@symbols)/,"@brackets"],[/@symbols/,{cases:{"@operators":"operator","@default":""}}],[/\d*\.\d+([eE][-+]?\d+)?/,"number.float"],[/\d+/,"number"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/"/,{token:"string.quote",bracket:"@open",next:"@stringDouble"}],[/'/,{token:"string.quote",bracket:"@open",next:"@stringSingle"}],[/`/,{token:"string.quote",bracket:"@open",next:"@stringBacktick"}]],jsxAttributes:[[/[a-zA-Z0-9-]+/,"attribute.name"],[/"/,{token:"attribute.value",next:"@attrValueDouble"}],[/'/,{token:"attribute.value",next:"@attrValueSingle"}],[/{/,{token:"delimiter",next:"@jsExpression"}],[/>/,{token:"delimiter",next:"@jsxBody"}],[/\/>/,{token:"delimiter",next:"@pop"}],[/(<\/)([a-zA-Z0-9-]+)(>)/,[{token:"delimiter"},{token:"tag"},{token:"delimiter",next:"@pop"}]],[/[ \t\r\n]+/,""]],jsxBody:[[/(?=<\/\s*[a-zA-Z0-9-]+\s*>)/,{token:"",next:"@pop"}],[/(<)([a-zA-Z0-9-]+)/,[{token:"delimiter"},{token:"tag",next:"@jsxAttributes"}]],[/{/,{token:"delimiter",next:"@jsExpression"}],[/[^<{]+/,""]],jsExpression:[[/\/\/.*$/,"comment"],[/\/\*/,"comment","@blockComment"],[/}/,{token:"delimiter.bracket",next:"@pop"}],{include:"@root"}],attrValueDouble:[[/"/,{token:"attribute.value",next:"@pop"}],[/[^"]+/,"attribute.value"]],attrValueSingle:[[/'/,{token:"attribute.value",next:"@pop"}],[/[^']+/,"attribute.value"]],stringDouble:[[/[^\\"]+/,"string"],[/\\./,"string.escape"],[/"/,{token:"string.quote",bracket:"@close",next:"@pop"}]],stringSingle:[[/[^\\']+/,"string"],[/\\./,"string.escape"],[/'/,{token:"string.quote",bracket:"@close",next:"@pop"}]],stringBacktick:[[/[^\\`$]+/,"string"],[/\\./,"string.escape"],[/`/,{token:"string.quote",bracket:"@close",next:"@pop"}]],jsxComment:[[/\*\/}/,"comment","@pop"],[/[^*]+/,"comment"],[/[*]/,"comment"]],blockComment:[[/\*\//,"comment","@pop"],[/[^*]+/,"comment"],[/[*]/,"comment"]],whitespace:[[/[ \t\r\n]+/,"white"],[/\/\*/,"comment","@blockComment"],[/\/\/.*$/,"comment"]]}}),e.languages.registerCompletionItemProvider("jsx",{provideCompletionItems:(i,t)=>{const A=i.getWordUntilPosition(t),a={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:A.startColumn,endColumn:A.endColumn},r=[];return pt.forEach(s=>{r.push({label:s,kind:e.languages.CompletionItemKind.Function,insertText:s,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),r.push({label:"import react",kind:e.languages.CompletionItemKind.Snippet,documentation:"导入 React 核心 API",insertText:"import { $1 } from 'react'",insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a},{label:"const useState",kind:e.languages.CompletionItemKind.Snippet,insertText:"const [${1:state}, ${2:setState}] = useState(${3:initialValue})",insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a},{label:"const useEffect",kind:e.languages.CompletionItemKind.Snippet,insertText:`useEffect(() => {
  $1
}, [$2])`,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a},{label:"const useContext",kind:e.languages.CompletionItemKind.Snippet,insertText:"const ${1:contextValue} = useContext(${2:context})",insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a},{label:"log",kind:e.languages.CompletionItemKind.Snippet,insertText:"console.log(${1:message})",insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a}),mt.forEach(s=>{r.push({label:s.label,kind:e.languages.CompletionItemKind.Property,insertText:s.text,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),Bt.forEach(s=>{r.push({label:s,kind:e.languages.CompletionItemKind.Tag,insertText:`<${s}>$0</${s}>`,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),Et.forEach(s=>{r.push({label:s+" (self-closing)",kind:e.languages.CompletionItemKind.Tag,insertText:`<${s} />`,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),{suggestions:r}}}),e.languages.setLanguageConfiguration("jsx",{comments:{blockComment:["{/*","*/}"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"},{open:"`",close:"`"},{open:"<",close:">",notIn:["string"]},{open:"{/*",close:"*/}"}]})}const ht=[{label:"vueInit",documentation:"初始化 Vue SFC 结构",insertText:["<script setup>","import { ref } from 'vue'","","<\/script>","","<template>","  <div>","    $0","  </div>","</template>","","<style scoped>","","</style>",""].join(`
`)},{label:"template",insertText:`<template>
  $0
</template>`},{label:"script setup",insertText:`<script setup>
  $0
<\/script>`},{label:"style",insertText:`<style>
  $0
</style>`}],It=["ref","reactive","computed","watch","watchEffect","onMounted","onUnmounted","nextTick","defineProps","defineEmits","onBeforeMount","onBeforeUpdate","onUpdated","onBeforeUnmount","onErrorCaptured","provide","inject"],wt=[{label:"import vue",insertText:"import { $1 } from 'vue'"},{label:"const ref",insertText:"const ${1:name} = ref(${2:value})"},{label:"const reactive",insertText:`const \${1:state} = reactive({
  $2
})`},{label:"watch",insertText:`watch(\${1:source}, (newVal, oldVal) => {
  $2
})`},{label:"log",insertText:"console.log(${1:message})"}],kt=[{label:"v-if",text:'v-if="${1:condition}"'},{label:"v-else",text:"v-else"},{label:"v-else-if",text:'v-else-if="${1:condition}"'},{label:"v-for",text:'v-for="(item, index) in ${1:list}" :key="${2:index}"'},{label:"v-model",text:'v-model="${1:value}"'},{label:"v-bind",text:':${1:prop}="${2:value}"'},{label:"v-on",text:'@${1:event}="${2:handler}"'},{label:"v-show",text:'v-show="${1:condition}"'},{label:":class",text:':class="{ ${1:className}: ${2:condition} }"'},{label:":style",text:':style="{ ${1:prop}: ${2:value} }"'},{label:"@click",text:'@click="${1:handler}"'}],yt=["div","span","p","button","h1","h2","h3","h4","h5","h6","ul","ol","li","form","a","section","article","nav","header","footer","table","thead","tbody","tr","td","th","select","option","label","textarea"],vt=["img","input","br","hr","meta","link"];function xt(e){oe(e),e.languages.getLanguages().some(i=>i.id==="vue")||e.languages.register({id:"vue"}),e.languages.setMonarchTokensProvider("vue",{defaultToken:"",tokenPostfix:".vue",keywords:["abstract","any","as","async","await","boolean","break","case","catch","class","const","constructor","continue","debugger","declare","default","delete","do","else","enum","export","extends","false","finally","for","from","function","get","if","implements","import","in","infer","instanceof","interface","is","keyof","let","module","namespace","never","new","null","number","object","package","private","protected","public","readonly","require","return","set","static","string","super","switch","symbol","this","throw","true","try","type","typeof","undefined","unique","unknown","var","void","while","with","yield"],operators:["<=",">=","==","!=","===","!==","=>","+","-","**","*","/","%","++","--","<<","<<<",">>",">>>","&","|","^","!","~","&&","||","?",":","=","+=","-=","*=","/=","%=","<<=",">>=",">>>=","&=","|=","^=","@"],tagNames:["html","body","head","div","span","h1","h2","h3","h4","h5","h6","p","a","ul","ol","li","img","button","form","input","textarea","label","select","option","table","thead","tbody","tr","td","th","template","script","style","router-link","router-view"],symbols:/[=><!~?:&|+\-*/^%]+/,tokenizer:{root:[[/<script\s*lang="ts"\s*>/,{token:"tag",next:"@scriptEmbedded.ts"}],[/<script(\s+(setup|lang="ts"))*>/,{token:"tag",next:"@scriptEmbedded.js"}],[/<style(\s+scoped)?>/,{token:"tag",next:"@styleEmbedded"}],[/<template>/,{token:"tag",next:"@templateEmbedded"}],[/<!--/,"comment","@commentHTML"],[/<([a-zA-Z0-9-]+)/,{token:"tag",next:"@tag"}],[/<\/\s*([a-zA-Z0-9-]+)\s*>/,{token:"tag"}],[/[^<]+/,""]],"scriptEmbedded.js":[[/<\/script>/,{token:"tag",next:"@pop"}],{include:"@jsContent"}],"scriptEmbedded.ts":[[/<\/script>/,{token:"tag",next:"@pop"}],{include:"@jsContent"}],jsContent:[[/[a-zA-Z_$][\w$]*/,{cases:{"@keywords":"keyword","@default":"identifier"}}],[/[{}]/,"delimiter.bracket"],[/[[\]]/,"delimiter.array"],[/[()]/,"delimiter.parenthesis"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/"/,{token:"string.quote",bracket:"@open",next:"@stringDouble"}],[/'/,{token:"string.quote",bracket:"@open",next:"@stringSingle"}],[/`/,{token:"string.quote",bracket:"@open",next:"@stringBacktick"}],[/\/\/.*$/,"comment"],[/\/\*/,"comment","@commentJS"],[/\d+/,"number"]],styleEmbedded:[[/<\/style>/,{token:"tag",next:"@pop"}],[/\/\*/,"comment","@commentJS"],[/\/\/.*/,"comment"],[/@[a-zA-Z-]+/,"keyword.css"],[/[a-zA-Z0-9_-]+\s*\{/,"selector.css"],[/#[a-zA-Z0-9_-]+/,"selector.css"],[/\.[a-zA-Z0-9_-]+/,"selector.css"],[/:[a-zA-Z-]+/,"selector.css"],[/[a-zA-Z0-9_-]+\s*>/,"tag.css"],[/[a-zA-Z0-9_-]+\s*\+/,"tag.css"],[/[a-zA-Z0-9_-]+\s*~/,"tag.css"],[/[a-zA-Z-]+\s*:/,"property.css"],[/[-+]?\d+(\.\d+)?(px|em|rem|%|vw|vh|deg)/,"number"],[/[-+]?\d+(\.\d+)?/,"number"],[/".*?"/,"string"],[/'.*?'/,"string"],[/[{}]/,"delimiter.bracket"],[/[()]/,"delimiter.parenthesis"],[/[*+~>]/,"operator"],[/;/,"delimiter.semicolon"],[/:/,"delimiter.colon"],[/[a-zA-Z0-9_-]+/,"attribute.value"],[/[^\s]+/,""]],templateEmbedded:[[/<\/template>/,{token:"tag",next:"@pop"}],[/<!--/,"comment","@commentHTML"],[/<([a-zA-Z0-9-]+)/,{token:"tag",next:"@tag"}],[/<\/\s*([a-zA-Z0-9-]+)\s*>/,{token:"tag"}],[/{{/,{token:"delimiter",next:"@interpolation"}],[/[^<]+/,""]],interpolation:[[/}}/,{token:"delimiter",next:"@pop"}],{include:"@jsContent"}],tag:[[/[ \t\r\n]+/,""],[/[a-zA-Z0-9-@:]+/,{cases:{"@default":"attribute.name"}}],[/"/,{token:"attribute.value",bracket:"@open",next:"@attrValue"}],[/>/,{token:"tag",next:"@pop"}],[/\/>/,{token:"tag",next:"@pop"}]],attrValue:[[/"/,{token:"attribute.value",bracket:"@close",next:"@pop"}],[/[^"]+/,"attribute.value"]],stringDouble:[[/[^\\"]+/,"string"],[/\\./,"string.escape"],[/"/,{token:"string.quote",bracket:"@close",next:"@pop"}]],stringSingle:[[/[^\\']+/,"string"],[/\\./,"string.escape"],[/'/,{token:"string.quote",bracket:"@close",next:"@pop"}]],stringBacktick:[[/[^\\`$]+/,"string"],[/\\./,"string.escape"],[/`/,{token:"string.quote",bracket:"@close",next:"@pop"}]],commentJS:[[/\*\//,"comment","@pop"],[/[^*]+/,"comment"],[/[*]/,"comment"]],commentHTML:[[/-->/,"comment","@pop"],[/[^-]+/,"comment"],[/-/,"comment"]]}}),e.languages.registerCompletionItemProvider("vue",{provideCompletionItems:(i,t)=>{const A=i.getWordUntilPosition(t),a={startLineNumber:t.lineNumber,endLineNumber:t.lineNumber,startColumn:A.startColumn,endColumn:A.endColumn},r=[];return ht.forEach(s=>{r.push({label:s.label,kind:e.languages.CompletionItemKind.Snippet,documentation:s.documentation,insertText:s.insertText,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),It.forEach(s=>{r.push({label:s,kind:e.languages.CompletionItemKind.Function,insertText:s,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),wt.forEach(s=>{r.push({label:s.label,kind:e.languages.CompletionItemKind.Snippet,insertText:s.insertText,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),kt.forEach(s=>{r.push({label:s.label,kind:e.languages.CompletionItemKind.Property,insertText:s.text,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),yt.forEach(s=>{r.push({label:s,kind:e.languages.CompletionItemKind.Tag,insertText:`<${s}>$0</${s}>`,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),vt.forEach(s=>{r.push({label:s,kind:e.languages.CompletionItemKind.Tag,insertText:`<${s} />`,insertTextRules:e.languages.CompletionItemInsertTextRule.InsertAsSnippet,range:a})}),{suggestions:r}}}),e.languages.setLanguageConfiguration("vue",{comments:{lineComment:"",blockComment:["",""]},brackets:[["{","}"],["[","]"],["(",")"],["<",">"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"},{open:"`",close:"`"},{open:"<",close:">",notIn:["string"]},{open:"<!--",close:"-->"}]})}de.config({paths:{vs:"https://cdn.staticfile.net/monaco-editor/0.45.0/min/vs"}});const Dt=async(e,i)=>{try{let t="html",A=[be];return i==="css"?(t="css",A=[Re]):i==="javascript"&&(t="babel",A=[Ne,Le]),await _e.format(e,{parser:t,plugins:A,printWidth:80,tabWidth:2})}catch(t){return console.error("Formatting failed:",t),e}},bt=({activeFile:e,onChange:i,defaultLanguage:t})=>{const A=g.useRef(null),a=g.useRef(null);function r(u){t==="html"?dt(u):t==="vue"?xt(u):t==="react"&&ft(u)}function s(u,C){A.current=u,a.current=C,C.languages.typescript.javascriptDefaults.setDiagnosticsOptions({noSemanticValidation:!0,noSyntaxValidation:!1});const l=n=>{C.languages.registerDocumentFormattingEditProvider(n,{async provideDocumentFormattingEdits(c){const d=c.getValue(),B=await Dt(d,n);return[{range:c.getFullModelRange(),text:B}]}})};l("html"),l("css"),l("javascript")}return g.useEffect(()=>{if(a.current&&A.current){const u=A.current.getModel();u&&a.current.editor.setModelLanguage(u,e.language)}},[e.language]),o.jsx(o.Fragment,{children:o.jsx("div",{className:lt["edit-editor"],children:o.jsx(Ce,{height:"100%",language:e.language,value:e.content,theme:"playground-dark",onChange:u=>i(u||""),beforeMount:r,onMount:s,options:{minimap:{enabled:!1},fontSize:14,padding:{top:16},scrollBeyondLastLine:!1,automaticLayout:!0,formatOnPaste:!0,formatOnType:!0,scrollbar:{vertical:"auto",horizontal:"auto",alwaysConsumeMouseWheel:!1},suggestOnTriggerCharacters:!0,parameterHints:{enabled:!0},snippetSuggestions:"top",wordBasedSuggestions:"off",lineNumbers:"on",tabSize:2,wordWrap:"on",folding:!0,quickSuggestions:{other:!0,comments:!0,strings:!0},renderWhitespace:"none",tabCompletion:"on",fixedOverflowWidgets:!1}})})})},Rt="_main_3i7zc_16",Nt="_edit_3i7zc_27",Lt="_preview_3i7zc_58",K={"playground-outer":"_playground-outer_3i7zc_1","playground-layout":"_playground-layout_3i7zc_6",main:Rt,edit:Nt,"edit-drag":"_edit-drag_3i7zc_39",preview:Lt,"show-more":"_show-more_3i7zc_62","preview-drag":"_preview-drag_3i7zc_80"},_t=({maxHeight:e="800px",editComponent:i,previewComponent:t})=>{const[A,a]=g.useState(.5),[r,s]=g.useState(!1),u=g.useRef(null),[C,l]=g.useState(!1);return g.useEffect(()=>{if(!r||!u.current)return;const n=d=>{const B=u.current?.getBoundingClientRect().left||0,f=u.current?.offsetWidth||0;a(Math.max(.2,Math.min((d?.clientX-B)/f||.5,.8)))},c=()=>{s(!1),document.body.style.cursor="default"};return window.addEventListener("mousemove",n),window.addEventListener("mouseup",c),()=>{removeEventListener("mousemove",n),removeEventListener("mouseup",c)}},[r]),g.useEffect(()=>{}),o.jsx("div",{className:K["playground-outer"],children:o.jsxs("div",{className:K["playground-layout"],ref:u,style:{height:C?e:"580px"},children:[o.jsxs("main",{className:K.main,children:[o.jsx("div",{className:K.edit,style:{width:`${A*100}%`},children:i}),o.jsx("div",{className:K["edit-drag"],onMouseDown:()=>s(!0),onMouseUp:()=>s(!1),children:o.jsx(he,{})}),o.jsxs("div",{className:K.preview,children:[r&&o.jsx("div",{className:K["preview-drag"],onMouseDown:n=>n.preventDefault()}),t]})]}),o.jsx("div",{className:K["show-more"],onClick:()=>l(!C),children:C?o.jsxs(o.Fragment,{children:[o.jsx(we,{style:{width:"1rem",height:"1rem"}})," ",o.jsx("span",{children:"收起"})]}):o.jsxs(o.Fragment,{children:[o.jsx(Ie,{style:{width:"1rem",height:"1rem"}})," ",o.jsx("span",{children:"展开更多"})]})})]})})},Kt="_addFile_1ldr0_49",St="_inputFile_1ldr0_69",Ft="_activeFile_1ldr0_81",R={"edit-file-container":"_edit-file-container_1ldr0_1","edit-file-list":"_edit-file-list_1ldr0_7","file-btn":"_file-btn_1ldr0_27","file-icon":"_file-icon_1ldr0_42",addFile:Kt,"input-container":"_input-container_1ldr0_61",inputFile:St,activeFile:Ft},jt=({files:e,activeFileName:i,setActiveFileName:t,addFiles:A,delFiles:a,defaultLanguage:r})=>{const[s,u]=g.useState(""),[C,l]=g.useState(!1),n=g.useRef(null),[c,d]=g.useState(!1);function B(Q){if(Q.preventDefault(),!s)return;const p=s.split(".").pop()?.toLowerCase();let E="text";if(r==="vue")if(p==="vue")E="vue";else if(p==="js")E="javascript";else{alert("仅支持.vue,.js文件");return}else if(r==="react")if(p==="jsx")E="javascript";else if(p==="css")E="css";else if(p==="js")E="javascript";else{alert("仅支持.jsx,.css,.js文件");return}else if(p==="html")E="html";else if(p==="css")E="css";else if(p==="js")E="javascript";else{alert("仅支持.html,.css,.js文件");return}A({newFileName:s,language:E})?(u(""),l(!1)):alert("File already exists")}g.useEffect(()=>{if(!n.current)return;const Q=new ResizeObserver(p=>{for(const E of p)d(E.contentRect.width<310)});return Q.observe(n.current),()=>{Q.disconnect()}},[]);const f=Q=>{if(Q==="html"||Q==="vue")return o.jsx(Y,{style:{color:"#e86102",width:16,height:16}});if(Q==="css")return o.jsx(Y,{style:{color:"#2b7dfb",width:16,height:16}});if(Q==="javascript")return o.jsx(Y,{style:{color:"#f0db4f",width:16,height:16}})};return o.jsx(o.Fragment,{children:o.jsxs("div",{className:R["edit-file-container"],ref:n,children:[o.jsx("ul",{className:R["edit-file-list"],children:e.map((Q,p)=>o.jsxs("li",{className:ie(i===Q.name&&R.activeFile),onClick:()=>t(Q.name),children:[o.jsx("span",{className:R.texts,children:f(Q.language)}),!c&&o.jsx("span",{className:R.texts,children:Q.name}),!c&&e.length>1&&o.jsx("button",{className:R["file-btn"],onClick:()=>a(Q),children:o.jsx(ke,{className:R["file-icon"],style:{width:14,height:14}})})]},`${Q.name}-${p}`))}),!C&&o.jsx("button",{className:R.addFile,onClick:()=>l(!0),children:o.jsx(ye,{style:{width:16,height:16,color:"#888f9b"}})}),C&&o.jsx("form",{onSubmit:B,className:R["input-container"],children:o.jsx("input",{className:R.inputFile,autoFocus:!0,placeholder:"filename.js",value:s,onChange:Q=>u(Q.target.value),onBlur:()=>{s||l(!1)}})})]})})},Pt=({maxHeight:e="800px",defaultShowConsole:i=!1,defaultLanguage:t=Z,initialFiles:A=ae({defaultLanguage:t})})=>{const{files:a,activeFileName:r,setActiveFileName:s,activeFile:u,addFiles:C,delFiles:l,resetFiles:n,updateFileContent:c,logs:d,addLog:B,clearLog:f}=Fe({defaultLanguage:t,defaultFiles:A}),Q=g.useRef(null),[p,E]=g.useState(!0),[k,N]=g.useState(i);g.useEffect(()=>{if(!Q.current)return;const b=new ResizeObserver(q=>{for(const P of q)E(P.contentRect.width<310)});return b.observe(Q.current),()=>{b.disconnect()}},[]);function L(){const b=u.content;navigator.clipboard.writeText(b)}const v=o.jsxs("div",{className:x["edit-content"],ref:Q,children:[o.jsxs("header",{className:x["edit-header"],children:[o.jsxs("div",{className:x["edit-header-title"],children:[o.jsx(ve,{style:{color:"#2b7dfb",width:20,height:20}})," ",!p&&o.jsx("h4",{style:{color:"#fff"},children:"Playground"})]}),o.jsxs("div",{className:x["edit-header-menu"],children:[o.jsx("button",{className:x.btn,onClick:L,children:o.jsx(xe,{className:x.icon})}),o.jsx("button",{className:ie(x.btn,k&&x["active-btn"]),onClick:()=>N(!k),children:o.jsx(se,{className:x.icon})}),o.jsx("button",{className:x.btn,onClick:()=>n(),children:o.jsx(De,{className:x.icon})})]})]}),o.jsx("div",{className:x["edit-file"],children:o.jsx(jt,{defaultLanguage:t,files:a,activeFileName:r,addFiles:C,setActiveFileName:s,delFiles:l})}),o.jsx(bt,{defaultLanguage:t,activeFile:u,onChange:b=>{c(u.name,b)}})]});return o.jsx(_t,{maxHeight:e,editComponent:v,previewComponent:o.jsx(ct,{files:a,logs:d,addLog:B,clearLog:f,showLog:k,defaultLanguage:t})})};export{Pt as default};
