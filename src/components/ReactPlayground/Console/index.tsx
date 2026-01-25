import styles from './index.module.scss'
import React from 'react'
import type {Log} from '../hooks/useReactPlayground'
import {ChevronLast,Trash2} from 'lucide-react'
interface Prop {
  logs: Log[]
  clearLog: () => void
}

const ReactConsole:React.FC<Prop>= ({logs,clearLog}) => {

  return (
    <div className={styles.console}>
      {/* 头部 */}
        <header className={styles['preview-console-header']}>
          <div className={styles['header-left']}>
            <ChevronLast style={{color: '#fff',width: 16,height: 16}}/>
            <span className={styles['console-title']}>Console</span>
            <div className={styles['log-count']}>{logs.length}</div>
          </div>
          <div className={styles['header-right']}>
            <button className={styles['clear-btn']} onClick={clearLog}>
              <Trash2 className={styles['icon']}/>
            </button>
          </div>
        </header>
        {/* 打印台 */}
        <main className={styles['preview-console-main']} >
          {logs.length===0&&<p className={styles['console-no-log']}>No logs yet...</p>}
          {
            logs.map((item,index) => (
              <div key={`${item.type}-${index}-${item.timestamp}`}>
               <span className={styles['console-timestamp']}> [{new Date(item.timestamp).toLocaleTimeString()}]</span>
              <span style={{color: item.type === 'error' ? 'red' : item.type === 'warn' ? '#f7b731' : item.type === 'info' ? '#45aaf2' : '#fff'}}> {item.message} </span>
              </div>
            ))
          }   
        </main>
       
    </div>
  )
}
export default ReactConsole