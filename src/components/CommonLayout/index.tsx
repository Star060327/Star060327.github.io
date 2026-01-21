import styles from './index.module.scss';
import React from 'react';
import useTheme from '../../hooks/useTheme.ts';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, TableOfContents } from 'lucide-react';
import navigateData from '@/utils/naviagteData.ts';
import type { NavigateData } from '@/utils/naviagteData.ts';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
};

export default function CommonLayout(props: Props) {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth); // 窗口宽度
  const { theme, toggleTheme } = useTheme();
  // 移动端是否展示导航标签
  const [isShow, setIsShow] = useState<boolean>(false);

  function fn() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', fn); //检测窗口宽度变化
    return () => window.removeEventListener('resize', fn);
  });
  function handleClick(e: React.MouseEvent<HTMLSpanElement>, path: string) {
    e.preventDefault();
    setIsShow(false);
    navigate(path);
  }
  useEffect(() => {
    function handleScroll() {
      setIsShow(false);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

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
                    onClick={() => setIsShow(!isShow)}
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
        {width <= 768 && (
          <div className={styles.mobile}>
            <ul className={classNames(styles.navigator, isShow && styles.navigatorShow)}>
              {navigateData.map((item: NavigateData) => (
                <li key={item.id + item.title + ``}>
                  <a onClick={(e) => handleClick(e, item.path)}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <main className={styles.main}>{props.children}</main>
        <footer className={styles.bottom}>
          <p>© 2025-2026 Star | 分享前端知识</p>
          <p>本站由 React + Vite + TypeScript + SCSS 构建</p>
        </footer>
      </div>
    </>
  );
}
