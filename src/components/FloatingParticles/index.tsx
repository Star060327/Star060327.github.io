import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles:React.FC = () => {
  // 生成随机粒子的配置
  const particleCount = 25;
  const [particles, setParticles] = useState<{
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    type?: string;
  }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100%
      size: Math.random() * 12 + 4, // 4-16px
      duration: Math.random() * 20 + 10, // 10-30s，慢一点更优雅
      // 使用负延迟，使动画看起来已经运行了一段时间，避免初始空白
      delay: -Math.random() * 30, 
      opacity: Math.random() * 0.2 + 0.1, // 0.1-0.3
      type: '❄️',
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: -20, // 起始位置在可视区域上方
            opacity: particle.opacity,
          }}
          animate={{
            y: ['0vh', '110vh'], // 飘落距离
            rotate: [0, 360],
            x: [0, (Math.random() - 0.5) * 100, 0], // 增加横向漂移范围
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        >
          {particle.type}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingParticles;
