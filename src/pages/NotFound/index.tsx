import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import CommonLayout from '@/components/CommonLayout';
import FloatingParticles from '@/components/FloatingParticles';
import styles from './index.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CommonLayout>
      <div className={styles.notFoundContainer}>
        {/* 复用之前的粒子背景组件，保持风格统一 */}
        <FloatingParticles />
        
        <div className={styles.content}>
          <motion.div
            className={styles.errorCode}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2 
            }}
          >
            404
          </motion.div>
          
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            哎呀，页面迷路了！
          </motion.h2>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            您寻找的页面可能已被移除、重命名或暂时不可用。
            别担心，您可以返回首页继续探索。
          </motion.p>
          
          <motion.button
            className={styles.homeButton}
            onClick={() => navigate('/')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.6 }}
          >
            <HomeOutlined /> 返回首页
          </motion.button>
        </div>
      </div>
    </CommonLayout>
  );
};

export default NotFound;
