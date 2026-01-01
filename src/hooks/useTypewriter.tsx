import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Typewriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState<string>('');
  
  // 使用 useRef 存储这些不直接参与渲染的值，避免频繁触发 useEffect
  const indexRef = useRef(0);
  const lastTimestampRef = useRef(0);
  const frameIdRef = useRef(0);

  useEffect(() => {
    // 每次 text 改变时重置
    setDisplayText('');
    indexRef.current = 0;
    lastTimestampRef.current = 0;
    // 节流优化
    const type = (now: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = now;
      }

      const elapsed = now - lastTimestampRef.current;

      if (elapsed >= speed) {
        // 如果还有字符没打印完
        if (indexRef.current < text.length) {
          const nextChar = text[indexRef.current];
          setDisplayText(prev => prev + nextChar);
          
          indexRef.current += 1; // 直接操作 Ref 的值，不会触发重新渲染
          lastTimestampRef.current = now;
        }
      }

      // 只要没写完，就继续下一帧
      if (indexRef.current < text.length) {
        frameIdRef.current = requestAnimationFrame(type);
      }
    };

    frameIdRef.current = requestAnimationFrame(type);

    // 清除副作用：确保卸载组件时动画停止
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [text, speed]); // 只有 text 或 speed 变了才重置

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayText}
    </motion.span>
  );
};

export default Typewriter;