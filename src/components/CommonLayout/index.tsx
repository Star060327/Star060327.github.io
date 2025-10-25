import './index.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
type Props = {
  children: React.ReactNode;
};
export default function CommonLayout(props: Props) {
  const { children } = props;
  const location = useLocation();
  const [id, setId] = useState<number>(0);
  const navigate = useNavigate();
  const routes = ['/', '/growth', '/article'];
  // 页面每次更新时重置id
  useEffect(() => {
    if (location.pathname === '/') {
      setId(0);
    } else if (location.pathname === '/growth') {
      setId(1);
    } else if (location.pathname === '/article') {
      setId(2);
    }
  }, [location.pathname]);
  const handleClick = (id: number) => {
    setId(id);
    navigate(routes[id]);
  };
  return (
    <>
      <div className="web-container">
        <header className="header">
          <div className="index-logo">
            <img src="src\assets\images\kitty-logo.jpg" alt="logo" />
            <h1>星星的Blog</h1>
          </div>
          <ul className="navigate">
            <li className={classNames({ 'active-li': id === 0 })}>
              <a onClick={() => handleClick(0)} className={classNames({ 'active-a': id === 0 })}>
                首页
              </a>
            </li>
            <li className={classNames({ 'active-li': id === 1 })}>
              <a onClick={() => handleClick(1)} className={classNames({ 'active-a': id === 1 })}>
                成长
              </a>
            </li>
            <li className={classNames({ 'active-li': id === 2 })}>
              <a onClick={() => handleClick(2)} className={classNames({ 'active-a': id === 2 })}>
                博客
              </a>
            </li>
            <li>
              <a>关灯</a>
            </li>
          </ul>
        </header>
        <div className="content">{children}</div>
      </div>
    </>
  );
}
