import styles from './index.module.scss';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import type { File, Log } from '../hooks/useReactPlayground';
import ReactConsole from '../Console';
import { GripHorizontal, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { generatePlaygroundHtml } from '../utils/useCompiler';
interface Prop {
  files: File[];
  logs: Log[];
  addLog: (log: Log) => void;
  clearLog: () => void;
  showLog: boolean;
}

const ReactPreView: React.FC<Prop> = ({ files, logs, addLog, clearLog, showLog }) => {
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  // 是否展示输入框
  const [showInput, setShowInput] = useState(true);
  // url地址
  const [url, setUrl] = useState('/');

  // iframe展示的内容
  const [srcDoc, setSrcDoc] = useState<string>('');
  // 唯一编号
  const instanceId = React.useId();
  const reactId = React.useId();
  // 控制台高度
  const startHeight = useRef(0);
  const [consoleHeight, setConsoleHeight] = useState(192);
  // 记录鼠标距离顶部的距离
  const eHeight = useRef(0);
  // 路由是否准备就绪
  const routerReadyRef = useRef(false);
  const urlRef = useRef(url);

  // 刷新
  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };
  // 发送指令给 iframe
  const sendCommand = (type: string, payload: Record<string, string> = {}) => {
    if (iframeRef.current) {
      // @ts-expect-error 忽略类型检查
      iframeRef.current.contentWindow?.postMessage({ type, id: reactId, ...payload }, '*');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedPath = url.startsWith('/') ? url : `/${url}`;
    sendCommand('PUSH_ROUTE', { path: formattedPath });
    // 等待 iframe 准备好路由
    if (routerReadyRef.current && urlRef.current !== url) {
      setUrl(formattedPath);
    }
  };

  useEffect(() => {
    urlRef.current = url;
  }, [url]);

  useEffect(() => {
    routerReadyRef.current = false;
  }, [iframeKey]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setShowInput(entry.contentRect.width > 270);
      }
    });
    observer.observe(containerRef.current!);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const height = e.clientY - eHeight.current;
      const newHeight = Math.max(122, Math.min(startHeight.current - height, 400));
      setConsoleHeight(newHeight);
    };
    // 鼠标松开事件
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console' && event.data?.id === instanceId && event.data?.log) {
        const log = event.data.log;
        addLog(log);
      }
      const { type, path, id } = event.data || {};

      if (type === 'ROUTER_READY' && id === reactId) {
        routerReadyRef.current = true;
        sendCommand('PUSH_ROUTE', { path: urlRef.current });
        return;
      }

      // 处理路由变化
      if (type === 'ROUTER_CHANGE' && id === reactId && typeof path === 'string') {
        setUrl((prev) => {
          if (prev === path) return prev;
          return path;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addLog, instanceId, reactId]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        // 拼接html
        const combinedHtml = await generatePlaygroundHtml(files, instanceId, reactId);

        setSrcDoc(combinedHtml);
      } catch (e) {
        console.error('拼接React失败:', e);
      }
    }, 1000); // Debounce delay

    return () => clearTimeout(timer);
  }, [files, instanceId, reactId]);

  return (
    <div className={styles['preview-content']} ref={containerRef}>
      {/* 最上面展示地址的 */}
      <div className={styles['preview-url']}>
        <button className={styles['url-btn']} onClick={() => sendCommand('GO_BACK')}>
          <ChevronLeft className={styles['url-icon']} />
        </button>
        <button
          className={styles['url-btn']}
          onClick={() => sendCommand('GO_FORWARD', { path: urlRef.current })}
        >
          <ChevronRight className={styles['url-icon']} />
        </button>
        <button className={styles['url-btn']} onClick={handleRefresh}>
          <RotateCw className={styles['url-icon']} />
        </button>
        {showInput && (
          <form onSubmit={handleUrlSubmit}>
            <input
              type="text"
              className={styles['url-input']}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </form>
        )}
      </div>
      <div className={styles['preview-iframe']}>
        <iframe
          key={iframeKey}
          title="preview"
          ref={iframeRef}
          srcDoc={srcDoc}
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox "
          className={styles['iframe']}
          style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        ></iframe>
      </div>
      {showLog && (
        <div className={styles['preview-console']}>
          {/* 拖拽区 */}
          <div
            className={styles['preview-drag']}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
              eHeight.current = e.clientY;
              startHeight.current = consoleHeight;
            }}
          >
            <GripHorizontal className={styles.icon} />
          </div>
          <div style={{ height: consoleHeight + 'px' }}>
            <ReactConsole logs={logs} clearLog={clearLog}></ReactConsole>
          </div>
        </div>
      )}
      {isDragging && <div className={styles['console-drag']} />}
    </div>
  );
};
export default ReactPreView;
