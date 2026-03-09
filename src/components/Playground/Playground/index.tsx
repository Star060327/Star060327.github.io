import styles from './index.module.scss';
import React from 'react';
import { usePlayground, type File, getDefaultFile, DEFAULT_LANGUAGE } from '../hooks/usePlayground';
import Preview from '../Preview';
import Edit from '../Edit';
import PlaygroundLayout from '../Layout';
import { CodeXml, Copy, ChevronLast, RotateCcw } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import FileManager from '../File';
import classNames from 'classnames';
interface PlaygroundProps {
  initialFiles?: File[];
  maxHeight?: string;
  defaultShowConsole?: boolean;
  defaultLanguage?: string;
}

const Playground: React.FC<PlaygroundProps> = ({
  maxHeight = '800px',
  defaultShowConsole = false,
  defaultLanguage = DEFAULT_LANGUAGE,
  initialFiles = getDefaultFile({ defaultLanguage })
}) => {
  const {
    files,
    activeFileName,
    setActiveFileName,
    activeFile,
    addFiles,
    delFiles,
    resetFiles,
    updateFileContent,
    logs,
    addLog,
    clearLog
  } = usePlayground({ defaultLanguage, defaultFiles: initialFiles });
  // 编辑组件
  const editContainerRef = useRef(null);
  const [isExpanding, setIsExpanding] = useState<boolean>(true);

  const [showLog, setShowLog] = useState<boolean>(defaultShowConsole);

  useEffect(() => {
    if (!editContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsExpanding(entry.contentRect.width < 310);
      }
    });
    observer.observe(editContainerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  function handleCopy() {
    const code = activeFile.content;
    navigator.clipboard.writeText(code);
  }
  const editComponent = (
    <div className={styles['edit-content']} ref={editContainerRef}>
      {/* 头部 */}
      <header className={styles['edit-header']}>
        <div className={styles['edit-header-title']}>
          <CodeXml style={{ color: '#2b7dfb', width: 20, height: 20 }} />{' '}
          {!isExpanding && <h4 style={{ color: '#fff' }}>Playground</h4>}
        </div>
        <div className={styles['edit-header-menu']}>
          <button className={styles.btn} onClick={handleCopy}>
            <Copy className={styles.icon} />
          </button>
          <button
            className={classNames(styles.btn, showLog && styles['active-btn'])}
            onClick={() => setShowLog(!showLog)}
          >
            <ChevronLast className={styles.icon} />
          </button>
          <button className={styles.btn} onClick={() => resetFiles()}>
            <RotateCcw className={styles.icon} />
          </button>
        </div>
      </header>
      {/* 文件区 */}
      <div className={styles['edit-file']}>
        <FileManager
          defaultLanguage={defaultLanguage}
          files={files}
          activeFileName={activeFileName}
          addFiles={addFiles}
          setActiveFileName={setActiveFileName}
          delFiles={delFiles}
        />
      </div>
      <Edit
        defaultLanguage={defaultLanguage}
        activeFile={activeFile}
        onChange={(content: string) => {
          updateFileContent(activeFile.name, content);
        }}
      ></Edit>
    </div>
  );
  return (
    <PlaygroundLayout
      maxHeight={maxHeight}
      editComponent={editComponent}
      previewComponent={
        <Preview
          files={files}
          logs={logs}
          addLog={addLog}
          clearLog={clearLog}
          showLog={showLog}
          defaultLanguage={defaultLanguage}
        ></Preview>
      }
    />
  );
};

export default Playground;
