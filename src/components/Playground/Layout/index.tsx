import styles from './index.module.scss';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { GripVertical } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PlaygroundLayout: React.FC<{
  maxHeight?: string;
  editComponent?: React.ReactNode;
  previewComponent?: React.ReactNode;
}> = ({ maxHeight = '800px', editComponent, previewComponent }) => {
  // 分割比例
  const [radio, setRadio] = useState<number>(0.5);
  // 是否拖拽
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // 是否展开
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  useEffect(() => {
    if (!isDragging) return;
    if (!containerRef.current) return;
    // 鼠标移动
    const handleMoving = (e: MouseEvent) => {
      const x = containerRef.current?.getBoundingClientRect().left || 0;
      const width = containerRef.current?.offsetWidth || 0;
      setRadio(Math.max(0.2, Math.min((e?.clientX - x) / width || 0.5, 0.8)));
    };
    // 鼠标松开
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };
    // 监听事件
    window.addEventListener('mousemove', handleMoving);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      // 移除事件
      removeEventListener('mousemove', handleMoving);
      removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(()=>{

  })
  return (
    <div className={styles['playground-outer']}>
      <div
        className={styles['playground-layout']}
        ref={containerRef}
        style={{ height: isExpanded ? maxHeight : '580px' }}
      >
        <main className={styles.main}>
          {/* 编辑区 */}
          <div className={styles.edit} style={{ width: `${radio * 100}%` }}>
            {editComponent}
          </div>

          {/* 拖拽区 */}
          <div
            className={styles['edit-drag']}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
          >
            <GripVertical />
          </div>

          {/* 预览区 */}
          <div className={styles.preview}>
            {isDragging && (
              <div className={styles['preview-drag']} onMouseDown={(e) => e.preventDefault()} />
            )}
            {previewComponent}
          </div>
        </main>
        {/* 展开更多 */}
        <div className={styles['show-more']} onClick={() => setIsExpanded(!isExpanded)}>
          {!isExpanded ? (
            <>
              <ChevronDown style={{ width: '1rem', height: '1rem' }} /> <span>展开更多</span>
            </>
          ) : (
            <>
              <ChevronUp style={{ width: '1rem', height: '1rem' }} /> <span>收起</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default PlaygroundLayout;
