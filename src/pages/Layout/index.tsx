import styles from './index.module.scss';
import React, { useState } from 'react';
import CommonLayout from '../../components/CommonLayout';
import { motion } from 'framer-motion';
import Typewriter from '@/hooks/useTypewriter.tsx';
import useScrollRestore from '@/hooks/useScrollRestore';
import avatar from '@/assets/images/avatar.jpg';
import { data } from '@/utils/data.ts';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import FloatingParticles from '@/components/FloatingParticles';
import aboutData from '@/utils/aboutData';
import classifyData from '@/utils/classifyData';
const PAGESIZE = 6;

// 布局主内容
function LayoutMain() {
  const scrollToContent = () => {
    const content = document.getElementById('content-start');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className={styles['layout-main']}>
        <FloatingParticles />
        <div className={styles['layout-main-content']}>
          <div className={styles['layout-main-content-header']}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Star'Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Typewriter 
                text="种一棵树最好的时间是十年前，其次是现在。" 
                speed={100}
              />
            </motion.p>
          </div>
        </div>
        
        <motion.div 
          className={styles['scroll-indicator']}
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <DownOutlined />
        </motion.div>
      </div>
    </>
  );
}

export default function Layout(): React.ReactNode {
  const navigate = useNavigate();
  //刷新位置不变
  useScrollRestore();
  // 分页
  const [current, setCurrent] = useState(1);
  // 更新页数
  function updatePage(page: number) {
    setCurrent(page);
    // 滚动到博客列表顶部而不是页面顶部，保持用户体验
    const content = document.getElementById('content-start');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  }
  //当前页数的博客内容
  const currentData = data.slice((current - 1) * PAGESIZE, current * PAGESIZE);
  
  return (
    <>
      <CommonLayout>
        <div className={styles['layout-main-container']}>
          <LayoutMain />
        <div id="content-start" className={styles.layout}>
          {/* 博客部分 */}
          <div className={styles.blog}>
            {/* 总结 */}
            <div className={styles.sumup}>
              {/* 总结头部 */}
              <header className={styles['sumup-top']}>
                <div className={styles['sumup-top-avatar']}>
                  <img src={avatar} alt="头像" />
                  <h2>徐维斌</h2>
                </div>
                <ul className={styles['sumup-top-list']}>
                  {aboutData.map((item) => (
                    <li key={item.id}>
                      <span>{item.count}</span>
                      <span>{item.content}</span>
                    </li>
                  ))}
                </ul>
              </header>
              <div className={styles['sumup-content']}>
                <h3>分类</h3>
                <ul>
                 {classifyData.map((item) => (
                  <li key={item.id}>
                    <span>{item.title}</span>
                    <span>{item.count}</span>
                  </li>
                 ))}
                </ul>
              </div>
              <footer className={styles['sumup-footer']}>
                <h3>标签</h3>
                <ul>
                  <li>js</li>
                  <li>js</li>
                  <li>js</li>
                  <li>js</li>
                  <li>js</li>
                  <li>js</li>
                  <li>js</li>
                </ul>
              </footer>
            </div>
            {/* 博客内容 */}
            <div className={styles['blog-left']}>
              <ul className={styles['blog-content']}>
                {currentData.map((item) => {
                  return (
                    <li key={item.id} onClick={() => navigate(item.path)}>
                      <h2>{item.title}</h2>
                      <div className={styles['blog-tag']}>
                        <div>{item.tags ? item.tags.join(', ') : item.tags}</div>
                        <span>{item.date}</span>
                      </div>
                      <p>{item.content}</p>
                    </li>
                  );
                })}
              </ul>
              <Pagination
                align="center"
                current={current}
                total={data.length}
                pageSize={PAGESIZE}
                onChange={updatePage}
              />
            </div>
          </div>
        </div>
        </div>
      </CommonLayout>
    </>
  );
}
