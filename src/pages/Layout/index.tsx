import styles from './index.module.scss';
import React, { useState } from 'react';
import CommonLayout from '../../components/CommonLayout';
import { motion } from 'framer-motion';
import Typewriter from '@/hooks/useTypewriter.tsx';
import useScrollRestore from '@/hooks/useScrollRestore';
import avatar from '@/assets/images/avatar.jpg';
import { data } from '@/utils/data.ts';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, BookOpen, FolderClosed } from 'lucide-react';
import FloatingParticles from '@/components/FloatingParticles';
import aboutData from '@/utils/aboutData';
import classifyData from '@/utils/classifyData';
import classNames from 'classnames';
import { Calendar } from 'lucide-react';

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
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Star'Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Typewriter text="种一棵树最好的时间是十年前，其次是现在。" speed={100} />
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
          <ChevronDown />
        </motion.div>
      </div>
    </>
  );
}

export default function Layout(): React.ReactNode {
  const navigate = useNavigate();
  const location = useLocation();
  //刷新位置不变
  useScrollRestore();
  // 分页
  const [current, setCurrent] = useState(1);
  const count = useRef(data.length < 6 ? 1 : Math.ceil(data.length / PAGESIZE));

  // 更新页数
  function updatePage(page: number) {
    setCurrent(page);
    requestAnimationFrame(() => {
      // 滚动到博客列表顶部而不是页面顶部，保持用户体验
      const content = document.getElementById('content-start');
      if (content) {
        content.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  //当前页数的博客内容
  const currentData = data.slice((current - 1) * PAGESIZE, current * PAGESIZE);

  function handleClassify(val: string) {
    if (val === '归档') {
      navigate('/file');
    } else {
      navigate('/tag');
    }
  }
  // sessionStorage保存当前的位置，刷新后恢复
  function restoreScrollPosition() {
    // 记录位置
    sessionStorage.setItem('curPosition', window.scrollY.toString());
  }

  useEffect(() => {
    if (location.pathname === '/') {
      const state = location.state as { scrollTo?: string } | null;
      if (state?.scrollTo) {
        setTimeout(() => {
          const el = document.getElementById(state.scrollTo!);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
        navigate('.', { replace: true, state: null });
        return;
      }
      const position = sessionStorage.getItem('curPosition');
      if (position) {
        setTimeout(() => {
          window.scrollTo({
            top: Number(position),
            behavior: 'smooth'
          });
        }, 0);
      }
    }
  }, [location.pathname]);

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
                  <div className={styles['sumup-top-avatar']} onClick={() => navigate('/about')}>
                    <img src={avatar} alt="头像" />
                    <h2>徐维斌</h2>
                  </div>
                  <ul className={styles['sumup-top-list']}>
                    {aboutData.map((item) => (
                      <li
                        key={`${item.id}-${item.content}`}
                        onClick={() => handleClassify(item.content)}
                      >
                        <span>{item.count}</span>
                        <span>{item.content}</span>
                      </li>
                    ))}
                  </ul>
                </header>
                <div className={styles['sumup-content']}>
                  <h3>
                    <FolderClosed /> 分类
                  </h3>
                  <ul>
                    {classifyData.map((item) => (
                      <li key={`${item.id}-${item.title}`}>
                        <span>{item.title}</span>
                        <span>{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* 博客内容 */}
              <div className={styles['blog-left']}>
                <ul className={styles['blog-content']}>
                  {currentData.map((item) => {
                    return (
                      <li
                        key={`${item.id}-${item.title}`}
                        onClick={() => {
                          navigate(item.path);
                          restoreScrollPosition();
                        }}
                      >
                        <h2>{item.title}</h2>
                        <div className={styles['blog-tag']}>
                          {/* 文章标签部分 */}
                          {item.tags.length > 0 && (
                            <div className={styles.realTag}>
                              {item.tags.map((tag) => (
                                <span key={`${tag}-${tag}`}>{tag}</span>
                              ))}
                            </div>
                          )}
                          <span className={styles.date}>
                            <Calendar style={{ width: 16, height: 16 }} /> {item.date}
                          </span>
                        </div>
                        <p className={styles.excerpt}>{item.excerpt}</p>
                        <div className={styles.bottom}>
                          <span className={styles['read-more']}>
                            <BookOpen style={{ width: 16, height: 16 }} /> 阅读更多 &gt;&gt;
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <ul className={styles.pagenation}>
                  <li>
                    <button
                      className={styles.btn}
                      disabled={current === 1}
                      onClick={() => updatePage(current - 1)}
                    >
                      <ChevronLeft className={styles.icon} />
                    </button>
                  </li>
                  {Array.from({ length: count.current }).map((item, index) => (
                    <li
                      key={`${item}-${index}-${item}`}
                      className={classNames(index + 1 === current && styles.activePage)}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrent(index + 1);
                      }}
                    >
                      {index + 1}
                    </li>
                  ))}
                  <li>
                    <button
                      className={styles.btn}
                      disabled={current === count.current}
                      onClick={() => updatePage(current + 1)}
                    >
                      <ChevronRight className={styles.icon} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
    </>
  );
}
