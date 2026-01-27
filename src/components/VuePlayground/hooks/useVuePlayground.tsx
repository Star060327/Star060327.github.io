import { useState, useCallback } from 'react';

export interface File {
  name: string;
  content: string;
  language: string;
}
// 日志部分
export interface Log {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: number;
}

// 默认文件
export const DEFAULT_FILES: File[] = [
  {
    name: 'main.js',
    content: `import { createApp } from 'vue'
import router from './router.js'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
`,
    language: 'javascript'
  },
  {
    name: 'App.vue',
    content: `<script setup>
import { ref } from 'vue'
</script>
<template>
  <nav>
   <router-link to="/">Index</router-link> | 
    <router-link to="/home">Home</router-link>
  </nav>
  <hr />
  <router-view></router-view>
</template>

    `,
    language: 'vue'
  },
  {
    name: 'Layout.vue',
    content: `<script setup>
import { ref} from 'vue'
import { storeToRefs } from 'pinia'
import { useCountStore } from './store.js'
const countStore = useCountStore() 
const { sum } = storeToRefs(countStore) 
const { increament } = countStore 
</script>
<template>
    <div>
      <h3>当前计数：{{sum}}</h3>
      <button @click="increament(1)">点我+1</button>
    </div>
</template>`,
    language: 'vue'
  },
  {
    name: 'Home.vue',
    content: `<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
    <h1>home</h1>
    <p>当前输入值：{{inputValue}}</p>
    <input type="text" v-model="inputValue" />
</template>`,
    language: 'vue'
  },

  {
    name: 'router.js',
    content: `import {createRouter,createWebHashHistory} from 'vue-router'
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
`,
    language: 'javascript'
  },
  {
    name: 'store.js',
    content: `import { defineStore } from 'pinia'
import {ref} from 'vue'
export const useCountStore = defineStore('count', () => {
  const sum = ref(6)
  function increament(value){
    sum.value += value
  }
  return {sum,increament}
})`,
    language: 'javascript'
  }
];

export function usePlayground({ defaultFiles = DEFAULT_FILES }: { defaultFiles?: File[] }) {
  // 状态：文件列表
  const [files, setFiles] = useState<File[]>(defaultFiles);
  const [activeFileName, setActiveFileName] = useState<string>(files[0].name || 'index.html');
  // 激活文件
  const activeFile = files.find((item) => item.name === activeFileName) || files[0];

  // 增
  const addFiles = useCallback(
    ({ newFileName, language }: { newFileName: string; language: string }) => {
      if (files.find((item) => item.name === newFileName)) {
        alert('文件名已存在');
        return false;
      }
      setFiles([
        ...files,
        {
          name: newFileName,
          content: '',
          language
        }
      ]);
      // 新增文件默认激活
      setActiveFileName(newFileName);
      return true;
    },
    [files]
  );
  // 删
  const delFiles = useCallback(
    (file: File) => {
      if (files.length < 1) return false;
      setFiles(files.filter((item) => item.name !== file.name));
      setActiveFileName(files[0].name);
    },
    [files, activeFileName]
  );
  // 更新文件内容
  const updateFileContent = useCallback((fileName: string, content: string) => {
    setFiles((prev) => prev.map((f) => (f.name === fileName ? { ...f, content } : f)));
  }, []);
  // 重置文件列表
  const resetFiles = useCallback(() => {
    setFiles(defaultFiles);
  }, [defaultFiles]);
  // 日志部分
  const [logs, setLogs] = useState<Log[]>([]);
  // 添加日志
  const addLog = useCallback(
    (log: Log) => {
      setLogs([...logs, { ...log, timestamp: Date.now() }]);
    },
    [logs]
  );
  // 删除
  const clearLog = useCallback(() => {
    setLogs([]);
  }, []);
  return {
    files,
    activeFileName,
    setActiveFileName,
    addFiles,
    delFiles,
    activeFile,
    resetFiles,
    updateFileContent,
    logs,
    addLog,
    clearLog
  };
}
