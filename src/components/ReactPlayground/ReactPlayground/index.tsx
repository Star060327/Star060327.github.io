import React, { useState, useRef, useEffect } from 'react';
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole
} from '@codesandbox/sandpack-react';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import PlaygroundLayout from '../../Playground/Layout';
import { CodeXml, Copy, ChevronLast, RotateCcw, FileCode, Plus, X } from 'lucide-react';
import styles from './index.module.scss';
import classNames from 'classnames';
import { DEFAULT_FILES } from '../hooks/useReactPlayground';

interface PlaygroundProps {
  initialFiles?: Record<string, string>;
  maxHeight?: string;
  defaultShowConsole?: boolean;
}

// 依赖库
const dependencies = {
  'react-router-dom': 'latest',
  react: '^18.0.0',
  'react-dom': '^18.0.0'
};

// 文件列表
const SandpackFileTabs = () => {
  const { sandpack } = useSandpack();
  const { files, activeFile, openFile, deleteFile, addFile } = sandpack;

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const fileContainerRef = useRef(null);
  const [newFileName, setNewFileName] = useState<string>('');
  // 展开
  const [isExpanding, setIsExpanding] = useState<boolean>(false);

  function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newFileName) return;
    const ext = newFileName.split('.').pop()?.toLowerCase();
    let language = 'text';
    // 处理react的文件配置
    if (ext === 'jsx') language = 'javascript';
    else if (ext === 'css') language = 'css';
    else if (ext === 'js') language = 'javascript';
    else {
      alert('仅支持.jsx,.css,.js文件');
      return;
    }
    addFile(newFileName, language, true);
    setNewFileName('');
    setIsAdding(false);
  }

  // Icon helper based on file extension
  const getIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'html' || ext === 'vue')
      return <FileCode style={{ color: '#e86102', width: 16, height: 16 }} />;
    if (ext === 'css') return <FileCode style={{ color: '#2b7dfb', width: 16, height: 16 }} />;
    if (ext === 'js' || ext === 'jsx' || ext === 'ts' || ext === 'tsx')
      return <FileCode style={{ color: '#f0db4f', width: 16, height: 16 }} />;
    return <FileCode style={{ color: '#889399', width: 16, height: 16 }} />;
  };
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
  return (
    <div className={styles['edit-file-container']} ref={fileContainerRef}>
      <ul className={styles['edit-file-list']}>
        {Object.keys(files).map((filename, index) => (
          <li
            key={`${filename}-${index}`}
            className={classNames(activeFile === filename && styles.activeFile)}
            onClick={() => openFile(filename)}
          >
            <span className={styles.texts}>{getIcon(filename)}</span>
            {!isExpanding && <span className={styles.texts}>{filename}</span>}
            {!isExpanding && Object.keys(files).length > 1 && (
              <button className={styles['file-btn']} onClick={() => deleteFile(filename)}>
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
            placeholder="filename.jsx"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={() => {
              if (!newFileName) setIsAdding(false);
            }}
          />
        </form>
      )}
    </div>
  );
};

const SandpackEditHeader = ({
  showLog,
  setShowLog
}: {
  showLog: boolean;
  setShowLog: (v: boolean) => void;
}) => {
  const { sandpack } = useSandpack();

  const editContainerRef = useRef(null);
  const [isExpanding, setIsExpanding] = useState<boolean>(true);

  const handleCopy = () => {
    const code = sandpack.files[sandpack.activeFile].code;
    navigator.clipboard.writeText(code);
  };

  const handleReset = () => {
    sandpack.resetAllFiles();
  };

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

  return (
    <header className={styles['edit-header']} ref={editContainerRef}>
      <div className={styles['edit-header-title']}>
        <CodeXml style={{ color: '#2b7dfb', width: 20, height: 20 }} />
        {!isExpanding && <h3>Playground</h3>}
      </div>
      <div className={styles['edit-header-menu']}>
        <button className={styles.btn} onClick={handleCopy} title="Copy Code">
          <Copy className={styles.icon} />
        </button>
        <button
          className={classNames(styles.btn, showLog && styles['active-btn'])}
          onClick={() => setShowLog(!showLog)}
          title="Toggle Console"
        >
          <ChevronLast className={styles.icon} />
        </button>
        <button className={styles.btn} onClick={handleReset} title="Reset Files">
          <RotateCcw className={styles.icon} />
        </button>
      </div>
    </header>
  );
};

const ReactPlayground: React.FC<PlaygroundProps> = ({
  initialFiles = DEFAULT_FILES,
  maxHeight = '800px',
  defaultShowConsole = false
}) => {
  const [showLog, setShowLog] = useState(defaultShowConsole);
  const [consoleHeight, setConsoleHeight] = useState(150);
  const [isDraggingConsole, setIsDraggingConsole] = useState(false);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number|undefined>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingConsole || !previewContentRef.current) return;

      if (requestRef.current) return;

      requestRef.current = requestAnimationFrame(() => {
        if (!previewContentRef.current) return;

        const containerRect = previewContentRef.current.getBoundingClientRect();
        const newHeight = containerRect.bottom - e.clientY;

        // Limit min/max height
        const minHeight = 50;
        const maxHeight = containerRect.height - 100; // Leave space for preview

        setConsoleHeight(Math.min(Math.max(newHeight, minHeight), maxHeight));
        requestRef.current = undefined;
      });
    };

    const handleMouseUp = () => {
      setIsDraggingConsole(false);
      document.body.style.cursor = 'default';
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = undefined;
      }
    };

    if (isDraggingConsole) {
      document.body.style.cursor = 'ns-resize';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isDraggingConsole]);

  return (
    <SandpackProvider
      template="react"
      theme="dark"
      files={initialFiles}
      customSetup={{
        dependencies
      }}
      options={{
        recompileMode: 'delayed',
        recompileDelay: 1000
      }}
    >
      <PlaygroundLayout
        maxHeight={maxHeight}
        editComponent={
          <div className={styles['edit-content']}>
            <SandpackEditHeader showLog={showLog} setShowLog={setShowLog} />
            <SandpackFileTabs />
            <SandpackCodeEditor
              showTabs={false} // Disable default tabs
              closableTabs={false}
              showLineNumbers={true}
              showInlineErrors={true}
              wrapContent={true}
              extensions={[autocompletion()]}
              extensionsKeymap={completionKeymap}
              showRunButton={false}
              style={{
                height: 'calc(100% - 3.2rem - 2.8rem)'
              }}
            />
          </div>
        }
        previewComponent={
          <div className={styles['preview-content']} ref={previewContentRef}>
            <SandpackPreview
              showNavigator={true}
              showOpenInCodeSandbox={false}
              showRefreshButton={true}
              style={{
                height: showLog ? `calc(100% - ${consoleHeight}px)` : '100%',
                pointerEvents: isDraggingConsole ? 'none' : 'auto'
              }}
            />
            {showLog && (
              <>
                <div
                  className={styles['console-drag-handle']}
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent text selection
                    setIsDraggingConsole(true);
                  }}
                />
                <SandpackConsole style={{ height: consoleHeight }} />
              </>
            )}
          </div>
        }
      />
    </SandpackProvider>
  );
};
export default ReactPlayground;
