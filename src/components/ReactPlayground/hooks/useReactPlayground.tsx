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
    name: 'index.html',
    content: `<h1>hello,React!</h1>`,
    language: 'html'
  },
  {
    name: 'index.css',
    content: `h1 {
      color: red;
    }`,
    language: 'css'
  },
  {
    name: 'index.js',
    content: `console.log('hello,React!')`,
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
  const updateFileContent=useCallback((fileName:string,content:string) => {
    setFiles(prev => prev.map(f => f.name === fileName ? {...f, content} : f));
  },[])
  // 重置文件列表
  const resetFiles = useCallback(() => {
    setFiles(defaultFiles);
  }, [defaultFiles]);
  // 日志部分
  const [logs,setLogs]=useState<Log[]>([]);
  // 添加日志
  const addLog = useCallback((log: Log) => {
    setLogs([...logs, {...log, timestamp: Date.now()}]);
  }, [logs]);
  // 删除
  const clearLog= useCallback(() => {
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
