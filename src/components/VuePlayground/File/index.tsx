import styles from './index.module.scss';
import React from 'react';
import type { File } from '../hooks/useVuePlayground';
import { FileCode, X, Plus } from 'lucide-react';
import classNames from 'classnames';
import { useState, useRef } from 'react';

interface Prop {
  files: File[];
  activeFileName: string;
  setActiveFileName: (fileName: string) => void;
  addFiles: ({ newFileName, language }: { newFileName: string; language: string }) => boolean;
  delFiles: (file: File) => void;
}

const VueFileManager: React.FC<Prop> = ({
  files,
  activeFileName,
  setActiveFileName,
  addFiles,
  delFiles
}) => {
  const [newFileName, setNewFileName] = useState<string>('');
  // 正在添加文件
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const fileContainerRef = useRef(null);
  // 展开
  const [isExpanding, setIsExpanding] = useState<boolean>(false);
  function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newFileName) return;
    const ext = newFileName.split('.').pop()?.toLowerCase();
    let language = 'text';
    if (ext === 'vue') language = 'vue';
    else if (ext === 'js') language = 'javascript';
    else {
      alert('仅支持.vue,.js文件');
      return;
    }
    if (addFiles({ newFileName, language })) {
      setNewFileName('');
      setIsAdding(false);
    }
  }
  useEffect(() => {
    if (!fileContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsExpanding(entry.contentRect.width < 310);
      }
    });
    observer.observe(fileContainerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // 图标
  const icon = (file: string) => {
    if (file === 'vue') return <FileCode style={{ color: '#e86102', width: 16, height: 16 }} />;
    if (file === 'javascript')
      return <FileCode style={{ color: '#f0db4f', width: 16, height: 16 }} />;
  };
  return (
    <>
      <div className={styles['edit-file-container']} ref={fileContainerRef}>
        <ul className={styles['edit-file-list']}>
          {files.map((item, index) => (
            <li
              key={`${item.name}-${index}`}
              className={classNames(activeFileName === item.name && styles.activeFile)}
              onClick={() => setActiveFileName(item.name)}
            >
              <span className={styles.texts}>{icon(item.language)}</span>
              {!isExpanding && <span className={styles.texts}>{item.name}</span>}
              {!isExpanding && files.length > 1 && (
                <button className={styles['file-btn']} onClick={() => delFiles(item)}>
                  <X className={styles['file-icon']} style={{ width: 14, height: 14 }} />
                </button>
              )}
            </li>
          ))}
        </ul>
        {!isAdding && (
          <button className={styles.addFile} onClick={() => setIsAdding(true)}>
            <Plus style={{ width: 16, height: 16, color: '#888f9b' }} />
          </button>
        )}
        {isAdding && (
          <form onSubmit={handleAddSubmit} className={styles['input-container']}>
            <input
              className={styles.inputFile}
              autoFocus={true}
              placeholder="filename.js"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onBlur={() => {
                if (!newFileName) setIsAdding(false);
              }}
            />
          </form>
        )}
      </div>
    </>
  );
};
export default VueFileManager;
