import styles from './index.module.scss';
import React from 'react';
import { MoonOutlined, SunOutlined, DatabaseFilled } from '@ant-design/icons';
import useTheme from '../../hooks/useTheme.ts';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
type Props = {
  children: React.ReactNode;
};

export default function CommonLayout(props: Props) {
  const navigate = useNavigate();
  const [width, setWidth] = useState<number>(window.innerWidth); // 窗口宽度
  const { theme, toggleTheme } = useTheme();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a rel="noopener noreferrer" onClick={() => navigate('/')}>
          首页
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" onClick={() => navigate('/about')}>
          关于我
        </a>
      )
    },
    {
      key: '3',
      label: (
        <a rel="noopener noreferrer" onClick={() => navigate('/file')}>
          归档
        </a>
      )
    }
  ];
  function fn() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', fn); //检测窗口宽度变化
    return () => window.removeEventListener('resize', fn);
  });
  function handleClick(e: React.MouseEvent<HTMLSpanElement>, path: string) {
    e.preventDefault();
    navigate(path);
  }

  return (
    <>
      <div className={styles.commonLayout}>
        {/* 头部 */}
        <header className={styles.top}>
          <div className={styles.left}>
            <h2>🌟 Star-Blog</h2>
          </div>
          {/* PC端 */}
          {width > 768 && (
            <ul className={styles.right}>
              <li>
                <a onClick={(e) => handleClick(e, '/')}>首页</a>
              </li>
              <li>
                <a onClick={(e) => handleClick(e, '/about')}>关于我</a>
              </li>
              <li>
                <a onClick={(e) => handleClick(e, '/file')}>归档</a>
              </li>
              {theme === 'light' && (
                <li>
                  <Button color="default" variant="filled" onClick={toggleTheme}>
                    <MoonOutlined
                      style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}
                    />
                  </Button>
                </li>
              )}
              {theme === 'dark' && (
                <li>
                  <Button color="default" variant="filled" onClick={toggleTheme}>
                    <SunOutlined
                      style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}
                    />
                  </Button>
                </li>
              )}
            </ul>
          )}
          {/* 移动端 */}
          {width <= 768 && (
            <div>
              <ul className={styles.right}>
                {theme === 'light' && (
                  <li>
                    <Button
                      color="default"
                      variant="filled"
                      style={{ width: '2.5rem', height: '2.5rem' }}
                      onClick={toggleTheme}
                    >
                      <MoonOutlined
                        style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}
                      />
                    </Button>
                  </li>
                )}
                {theme === 'dark' && (
                  <li>
                    <Button
                      color="default"
                      variant="filled"
                      style={{ width: '2.5rem', height: '2.5rem' }}
                      onClick={toggleTheme}
                    >
                      <SunOutlined
                        style={{ fontSize: '1rem', color: 'var(--color-text-primary)' }}
                      />
                    </Button>
                  </li>
                )}
                <li>
                  <Space vertical>
                    <Space wrap>
                      <Dropdown menu={{ items }} placement="bottom">
                        <Button
                          color="default"
                          variant="filled"
                          style={{ width: '2.5rem', height: '2.5rem' }}
                        >
                          <DatabaseFilled
                            style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}
                          />
                        </Button>
                      </Dropdown>
                    </Space>
                  </Space>
                </li>
              </ul>
            </div>
          )}
        </header>
        <main className={styles.main}>{props.children}</main>
        <footer className={styles.bottom}>
          <p>© 2025-2026 Star | 分享前端知识</p>
          <p>本站由 React + Vite + TypeScript + SCSS 构建</p>
        </footer>
      </div>
    </>
  );
}
