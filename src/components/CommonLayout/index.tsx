import styles from './index.module.scss';
import React from 'react';
import useTheme from '../../hooks/useTheme.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, TableOfContents, X } from 'lucide-react';
import navigateData from '@/utils/naviagteData.ts';
import type { NavigateData } from '@/utils/naviagteData.ts';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
};

export default function CommonLayout(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [width, setWidth] = useState<number>(window.innerWidth); // 窗口宽度
  const { theme, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  function fn() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', fn); //检测窗口宽度变化
    return () => window.removeEventListener('resize', fn);
  });
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, path: string) {
    e.preventDefault();
    setIsModalOpen(false);
    navigate(path);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = '';
  }, [isModalOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div className={styles.commonLayout}>
        {/* 头部 */}
        <header className={styles.top}>
          <div className={styles.left}>
            <h2
              onClick={() => {
                scrollTo({ top: 0 });
                navigate('/');
              }}
            >
              🌟 Star-Blog
            </h2>
          </div>
          {/* PC端 */}
          {width > 768 && (
            <ul className={styles.right}>
              {navigateData.map((item: NavigateData) => (
                <li key={item.id}>
                  <a onClick={(e) => handleClick(e, item.path)}>{item.title}</a>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleTheme}
                  className={styles.btn}
                  style={{
                    transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  {theme === 'light' ? (
                    <Moon style={{ color: 'var(--color-text-primary)', width: 20, height: 20 }} />
                  ) : (
                    <Sun style={{ color: 'var(--color-text-primary)', width: 20, height: 20 }} />
                  )}
                </button>
              </li>
            </ul>
          )}
          {/* 移动端 */}
          {width <= 768 && (
            <div>
              <ul className={styles.right}>
                <li>
                  <button
                    className={styles.btn}
                    style={{
                      transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                    onClick={toggleTheme}
                  >
                    {theme === 'light' ? (
                      <Moon style={{ color: 'var(--color-text-primary)', width: 16, height: 16 }} />
                    ) : (
                      <Sun style={{ color: 'var(--color-text-primary)', width: 16, height: 16 }} />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    className={styles.btn}
                    style={{ transition: 'none' }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <TableOfContents
                      style={{ color: 'var(--color-text-primary)', width: 16, height: 16 }}
                    />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </header>
        <main className={styles.main}>{props.children}</main>
        <footer className={styles.bottom}>
          <p>© 2025-2026 Star | 分享前端知识 🥰</p>
          <p>本站由 React + Vite + TypeScript + SCSS 构建 🚀</p>
        </footer>
      </div>
      {/* 遮罩层：始终渲染但用 CSS 控制显示隐藏，保证退场动画 */}
      <div
        className={classNames(styles['modal-overlay'], isModalOpen && styles['modal-overlay-show'])}
        id="overlay"
        onClick={() => setIsModalOpen(false)}
      ></div>
      {/* 抽屉 */}
      <div
        className={classNames(styles['modal-content'], isModalOpen && styles['modal-content-show'])}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isModalOpen}
      >
        <div className={styles['modal-header']}>
          <h2>导航</h2>
          <button className={styles['modal-close']} onClick={() => setIsModalOpen(false)}>
            <X style={{ width: 18, height: 18 }} />
          </button>
        </div>
        <div className={styles.mobile}>
          <ul className={styles['modal-nav']}>
            {navigateData.map((item: NavigateData) => (
              <li key={item.id + item.title + ``}>
                <a
                  onClick={(e) => handleClick(e, item.path)}
                  className={classNames(location.pathname === item.path && styles['active-link'])}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
