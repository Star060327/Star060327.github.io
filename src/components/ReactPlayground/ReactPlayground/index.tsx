import styles from './index.module.scss';
import React from 'react';
import { usePlayground, type File, DEFAULT_FILES } from '../hooks/useReactPlayground';
import ReactPreview from '../Preview';
import ReactEdit from '../Edit';
import ReactPlaygroundLayout from '../Layout';
import { CodeXml, Copy, ChevronLast, RotateCcw } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import ReactFileManager from '../File';
import classNames from 'classnames';
interface PlaygroundProps {
  initialFiles?: File[];
  maxHeight?: string;
  defaultShowConsole?: boolean;
}

const ReactPlayground: React.FC<PlaygroundProps> = ({
  maxHeight = '800px',
  defaultShowConsole = false,
  initialFiles = DEFAULT_FILES
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
  } = usePlayground({ defaultFiles: initialFiles });
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
          {!isExpanding && <h3>Playground</h3>}
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
        <ReactFileManager
          files={files}
          activeFileName={activeFileName}
          addFiles={addFiles}
          setActiveFileName={setActiveFileName}
          delFiles={delFiles}
        />
      </div>
      <ReactEdit
        activeFile={activeFile}
        onChange={(content: string) => {
          updateFileContent(activeFile.name, content);
        }}
      ></ReactEdit>
    </div>
  );
  return (
    <ReactPlaygroundLayout
      maxHeight={maxHeight}
      editComponent={editComponent}
      previewComponent={
        <ReactPreview
          files={files}
          logs={logs}
          addLog={addLog}
          clearLog={clearLog}
          showLog={showLog}
        ></ReactPreview>
      }
    />
  );
};

export default ReactPlayground;
