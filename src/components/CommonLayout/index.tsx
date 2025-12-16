import './index.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect,useLayoutEffect } from 'react';
import classNames from 'classnames';
import { BsBorderWidth } from "react-icons/bs";
import Drawer from '../Drawer/index.tsx';
type Props = {
  children: React.ReactNode;
};
export default function CommonLayout(props: Props) {
  const { children } = props;
  const location = useLocation();
  const [id, setId] = useState<number>(0);
  const [isWeb,setIsWeb]=useState<boolean>(true);
  const navigate = useNavigate();
  const routes = ['/', '/growth', '/article'];
  const [visible,setVisible] = useState<boolean>(false);

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
  useLayoutEffect(()=>{
    function updateSize(){
      setIsWeb(window.innerWidth>=768)
    }
    // 立即执行一次
    updateSize()
    // 添加事件监听
    window.addEventListener('resize',updateSize)
    return ()=>window.removeEventListener('resize',updateSize)
  },[])
  const handleClick = (id: number) => {
    setId(id);
    navigate(routes[id]);
  };
  return (
    <>
      <div className="web-container">
        <header className="header">
          <div className="index-logo" onClick={()=>navigate('/')}>
            <img src="src\assets\images\kitty-logo.jpg" alt="logo" />
            {/* web标题 */}
            {isWeb&&<h1>星星的Blog</h1>}
          </div>
          {/* web展示 */}
          {isWeb&&<ul className="webnavigate">
            <li className={classNames({ 'active-li': id === 0 })}>
              <a onClick={() => handleClick(0)} className={classNames({ 'active-a': id === 0 })}>
                首页
              </a>
            </li>
            <li className={classNames({ 'active-li': id === 1 })}>
              <a onClick={() => handleClick(1)} className={classNames({ 'active-a': id === 1 })}>
                个人
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
          </ul>}
          {/* 移动端到导航 */}
            {/* {!isWeb&&<ul className="mobile-navigate">
              <li><a onClick={() => handleClick(0)}><img src={id===0?homeAct:homeBlack} alt="首页" /></a></li>
              <li><a onClick={() => handleClick(1)}><img src={id===1?growthAct:growthBlack} alt="成长" /></a></li>
              <li><a onClick={() => handleClick(2)}><img src={id===2?blogAct:blogBlack} alt="博客" /></a></li>
              <li><a><img src={sun} alt="切换模式" /></a></li>
            </ul>} */}
            {
              !isWeb && <div className="mobile-navigate">
                <BsBorderWidth size={32} color='#2c3e50' onClick={()=>setVisible(true)}/>
              </div>
            }
        </header>
        <div className="content">{children}</div>
        <footer className="footer">
          <p>Copyright © 2025 星星</p>
        </footer>
      </div>
        <Drawer visible={visible} onClose={()=>setVisible(false)}>123</Drawer>
    </>
  );
}
