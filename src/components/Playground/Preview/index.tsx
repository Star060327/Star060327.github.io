import styles from './index.module.scss';
import React from 'react'
import {useRef,useEffect,useState} from 'react'
import type {File,Log} from '../hooks/usePlayground'
import Console from '../Console';
import {GripHorizontal} from 'lucide-react';

interface Prop {
  files: File[];
  logs: Log[];
  addLog: (log: Log) => void;
  clearLog: () => void;
  showLog: boolean;
}

const PreView: React.FC<Prop> = ({files,logs,addLog,clearLog,showLog}) => {

  const [isDragging,setIsDragging]=useState(false)

  const iframeRef=useRef(null)
  // iframe展示的内容
  const [srcDoc,setSrcDoc]=useState<string>('')
  // 唯一编号
  const instanceId = React.useId();
  // 控制台高度
  const startHeight=useRef(0)
  const [consoleHeight,setConsoleHeight]=useState(192)
  // 记录鼠标距离顶部的距离
  const eHeight=useRef(0)

  useEffect(()=>{
    
    // 鼠标移动事件
    const handleMouseMove=(e:MouseEvent)=>{
      if(!isDragging) return
      const height=e.clientY-eHeight.current
      const newHeight=Math.max(122,Math.min(startHeight.current-height,400))
      setConsoleHeight(newHeight)
    }
    // 鼠标松开事件
    const handleMouseUp=()=>{
      setIsDragging(false)
      document.body.style.cursor='default'
    }
    window.addEventListener('mousemove',handleMouseMove)
    window.addEventListener('mouseup',handleMouseUp)
    return ()=>{
      window.removeEventListener('mousemove',handleMouseMove)
      window.removeEventListener('mouseup',handleMouseUp)
    }
  },[isDragging])

   useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'console' && event.data?.id === instanceId && event.data?.log) {
        const log = event.data.log;
        addLog(log);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [addLog, instanceId]);

  useEffect(()=>{
    const timer = setTimeout(() => {
      const htmlFile = files.find(f => f.name.endsWith('.html'))?.content || '';
      const cssFile = files.find(f => f.name.endsWith('.css'))?.content || '';
      const jsFile = files.find(f => f.name.endsWith('.js'))?.content || '';
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

            // 拦截链接点击
            document.addEventListener('click', function(e) {
              const link = e.target.closest('a');
              if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                console.warn('预览模式下禁止跳转: ' + (href || '无链接'));
              }
            }, true);

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
      // 拼接html
      const combinedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <base target="_self" />
            <style>${cssFile}</style>
            ${consoleScript}
          </head>
          <body>
            ${htmlFile}
            <script>
              try {
                ${jsFile}
              } catch (err) {
                console.error(err);
              }
            </script>
          </body>
        </html>
      `;

      setSrcDoc(combinedHtml);
    }, 1000); // Debounce delay

    return () => clearTimeout(timer);
  },[files])

  return (
    <div className={styles['preview-content']} >
      <div className={styles['preview-iframe']}>
        <iframe title="preview" ref={iframeRef} srcDoc={srcDoc} sandbox="allow-scripts allow-same-origin allow-forms allow-modals" className={styles['iframe']} style={{ pointerEvents: isDragging ? 'none' : 'auto' }}></iframe>
      </div>
      {showLog&&<div className={styles['preview-console']} >
        {/* 拖拽区 */}
        <div className={styles['preview-drag']} onMouseDown={(e)=>{e.preventDefault();setIsDragging(true);eHeight.current=e.clientY;startHeight.current=consoleHeight;}}>
          <GripHorizontal className={styles.icon}/>
        </div>
        <div style={{height:consoleHeight+'px'}}>
          <Console logs={logs} clearLog={clearLog}></Console>
        </div>
        </div>}
     {isDragging && (
        <div className={styles['console-drag']} />
      )}
    </div>
  )
}
export default PreView;