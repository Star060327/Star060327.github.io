import { useState, useCallback } from 'react';

export interface File {
  name: string;
  content: string;
  language: string;
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
  // 激活文件
  const [activeFile, setActiveFile] = useState<File | null>(null);

  // 增
  const addFiles = useCallback(
    (newFiles: File[]) => {
      setFiles([...files, ...newFiles]);
    },
    [files]
  );
  // 删
  const delFiles = useCallback(
    (file: File) => {
      if (files.length < 1) return;

      setFiles(files.filter((item) => item.language !== file.language));
    },
    [files]
  );

  // 重置文件列表
  const resetFiles = useCallback(() => {
    setFiles(defaultFiles);
  }, [defaultFiles]);
  return {
    files,
    addFiles,
    delFiles,
    activeFile,
    resetFiles
  };
}
