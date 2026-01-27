import styles from './index.module.scss';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import type { File, Log } from '../hooks/useVuePlayground';
import VueConsole from '../Console';
import { GripHorizontal, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { generatePlaygroundHtml } from '../utils/vueCompiler';
interface Prop {
  files: File[];
  logs: Log[];
  addLog: (log: Log) => void;
  clearLog: () => void;
  showLog: boolean;
}

const VuePreView: React.FC<Prop> = ({ files, logs, addLog, clearLog, showLog }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  // iframe展示的内容
  const [srcDoc, setSrcDoc] = useState<string>('');
  // 唯一编号
  const instanceId = React.useId();
  const vueId = React.useId();
  // 控制台高度
  const startHeight = useRef(0);
  const [consoleHeight, setConsoleHeight] = useState(192);
  // 记录鼠标距离顶部的距离
  const eHeight = useRef(0);

  const [url, setUrl] = useState<string>('/');
  const urlRef = useRef(url); //追踪当前路径
  const routerReadyRef = useRef(false); // 标记 iframe 是否已准备好路由
  // 用于强制刷新 iframe 的 key
  const [iframeKey, setIframeKey] = useState(0);

  // 发送指令给 iframe
  const sendCommand = (type: string, payload: Record<string, string> = {}) => {
    if (iframeRef.current) {
      // @ts-expect-error 忽略类型检查
      iframeRef.current.contentWindow?.postMessage({ type, id: vueId, ...payload }, '*');
    }
  };
  // 刷新 iframe
  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  // React 端发送指令
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 确保发送的是符合 Hash 模式的路径格式
    const formattedPath = url.startsWith('/') ? url : `/${url}`;
    sendCommand('PUSH_ROUTE', { path: formattedPath });
    // 等待 iframe 准备好路由
    if (routerReadyRef.current && urlRef.current !== url) {
      setUrl(formattedPath);
    }
    console.log('提交后的url：', url, formattedPath);
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setShowInput(entry.contentRect.width > 270);
      }
    });
    observer.observe(containerRef.current!);
    return () => observer.disconnect();
  }, []);

  // 同步更新 urlRef
  useEffect(() => {
    urlRef.current = url;
  }, [url]);

  useEffect(() => {
    routerReadyRef.current = false;
  }, [iframeKey]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 处理控制台日志
      if (event.data?.type === 'console' && event.data?.id === instanceId && event.data?.log) {
        const log = event.data.log;
        addLog(log);
      }
      const { type, path, id } = event.data || {};

      if (type === 'ROUTER_READY' && id === vueId) {
        routerReadyRef.current = true;
        sendCommand('PUSH_ROUTE', { path: urlRef.current });
        return;
      }

      // 处理路由变化
      if (type === 'ROUTER_CHANGE' && id === vueId && typeof path === 'string') {
        if (!routerReadyRef.current) return;
        setUrl((prev) => {
          if (prev === path) return prev;
          return path;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addLog, instanceId, vueId]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      // 拼接html
      try {
        const combinedHtml = await generatePlaygroundHtml(files, instanceId, vueId);
        setSrcDoc(combinedHtml);
        routerReadyRef.current = false;
      } catch (e) {
        console.error('编译Vue文件失败:', e);
      }
    }, 1000); // Debounce delay

    return () => clearTimeout(timer);
  }, [files, instanceId, vueId]);

  useEffect(() => {
    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const height = e.clientY - eHeight.current;
      const newHeight = Math.max(122, Math.min(startHeight.current - height, 377));
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

  return (
    <div className={styles['preview-content']} ref={containerRef}>
      {/* 最上面展示地址的 */}
      <div className={styles['preview-url']}>
        <button className={styles['url-btn']} onClick={() => sendCommand('GO_BACK')}>
          <ChevronLeft className={styles['url-icon']} />
        </button>
        <button className={styles['url-btn']} onClick={() => sendCommand('GO_FORWARD')}>
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
            <VueConsole logs={logs} clearLog={clearLog}></VueConsole>
          </div>
        </div>
      )}
      {isDragging && <div className={styles['console-drag']} />}
    </div>
  );
};
export default VuePreView;
