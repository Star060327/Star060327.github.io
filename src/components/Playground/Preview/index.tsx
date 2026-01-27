import styles from './index.module.scss';
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import type { File, Log } from '../hooks/usePlayground';
import Console from '../Console';
import { GripHorizontal, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import {
  generateHtml,
  generateVueHtml,
  generateReactHtml
} from '../utils/generatePlaygroundHtml/index';
interface Prop {
  files: File[];
  logs: Log[];
  addLog: (log: Log) => void;
  clearLog: () => void;
  showLog: boolean;
  defaultLanguage: string;
}

const PreView: React.FC<Prop> = ({ files, logs, addLog, clearLog, showLog, defaultLanguage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  // iframe展示的内容
  const [srcDoc, setSrcDoc] = useState<string>('');
  // 唯一编号
  const instanceId = React.useId();
  const vueId = React.useId();
  const reactId = React.useId();
  // 控制台高度
  const startHeight = useRef(0);
  const [consoleHeight, setConsoleHeight] = useState(192);
  // 记录鼠标距离顶部的距离
  const eHeight = useRef(0);

  const [iframeKey, setIframeKey] = useState(0);

  const [url, setUrl] = useState('/');

  const urlRef = useRef(url);

  const [showInput, setShowInput] = useState(true);

  const routerReadyRef = useRef(false); // 标记 iframe 是否已准备好路由
  // 发送指令给 iframe
  const sendCommand = (type: string, payload: Record<string, string> = {}) => {
    if (iframeRef.current) {
      let id: string;
      if (defaultLanguage === 'html') return;
      else if (defaultLanguage === 'vue') id = vueId;
      else if (defaultLanguage === 'react') id = reactId;
      // @ts-expect-error 忽略类型检查
      iframeRef.current.contentWindow?.postMessage({ type, id, ...payload }, '*');
    }
  };
  // 刷新页面
  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };
  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedPath = url.startsWith('/') ? url : `/${url}`;
    sendCommand('PUSH_ROUTE', { path: formattedPath });
    // 等待 iframe 准备好路由
    if (routerReadyRef.current && urlRef.current !== url) {
      setUrl(formattedPath);
    }
    console.log(url);
  };

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
    urlRef.current = url;
  }, [url]);
  useEffect(() => {
    routerReadyRef.current = false;
  }, [iframeKey]);

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

      if (type === 'ROUTER_READY' && (id === vueId || id === reactId)) {
        routerReadyRef.current = true;
        sendCommand('PUSH_ROUTE', { path: urlRef.current });
        return;
      }

      // 处理路由变化
      if (
        type === 'ROUTER_CHANGE' &&
        (id === vueId || id === reactId) &&
        typeof path === 'string'
      ) {
        if (!routerReadyRef.current) return;
        setUrl((prev) => {
          if (prev === path) return prev;
          return path;
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addLog, instanceId, vueId, reactId]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      // 处理打印js
      const consoleScript = `
        <script>
          (function() {
            const instanceId = "${instanceId}";
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
        </script>
      `;
      // 拼接处理
      if (defaultLanguage === 'html') {
        const htmlFile = files.find((f) => f.name.endsWith('.html'))?.content || '';
        const cssFile = files.find((f) => f.name.endsWith('.css'))?.content || '';
        const jsFile = files.find((f) => f.name.endsWith('.js'))?.content || '';
        const combinedHtml = generateHtml(htmlFile, cssFile, jsFile, consoleScript);
        setSrcDoc(combinedHtml);
      } else if (defaultLanguage === 'vue') {
        try {
          const combinedHtml = await generateVueHtml(files, vueId, consoleScript);
          setSrcDoc(combinedHtml);
        } catch (e) {
          console.error('Vue代码拼接错误:', e);
        }
      } else if (defaultLanguage === 'react') {
        try {
          const combinedHtml = await generateReactHtml(files, reactId, consoleScript);
          setSrcDoc(combinedHtml);
        } catch (e) {
          console.error('React代码拼接错误:', e);
        }
      }
    }, 1000); // Debounce delay

    return () => clearTimeout(timer);
  }, [files, defaultLanguage, vueId, reactId]);

  return (
    <div className={styles['preview-content']} ref={containerRef}>
      {/* 最上面展示地址的 */}
      {defaultLanguage !== 'html' && (
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
      )}
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
            <Console logs={logs} clearLog={clearLog}></Console>
          </div>
        </div>
      )}
      {isDragging && <div className={styles['console-drag']} />}
    </div>
  );
};
export default PreView;
