import { useState, useLayoutEffect } from 'react';
import CommonLayout from '../../components/CommonLayout';
import './index.scss';

export default function Layout() {
  const [width,setWidth] = useState<number>(window.innerWidth);
  // 雪花飘落的函数
  function createSnowflake(){
    const container = document.querySelector<HTMLElement>('.snow-container')
    const snowflake = document.createElement('div')
    snowflake.classList.add('snowflake')  //加样式
    snowflake.innerHTML = '❄'   //填充雪花

    const size = (width>=768?Math.random()*1.5 + 0.5 : Math.random()+0.2) //雪花随机生成大小
    snowflake.style.fontSize = size + 'rem'

    snowflake.style.left=`${Math.random()*100}%`  //随机定位
    snowflake.style.animationDelay = `${Math.random()*3}s`
    snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`;
    snowflake.style.transform = `rotate(${Math.random() * 360}deg)`; //雪花随机旋转

    container?.appendChild(snowflake)
     if (container?.children.length&&container?.children.length > 100) {
        container?.removeChild(container.firstChild!); // 直接删除第一个子节点
    }
}
  function create(){
    for (let i = 0; i < 50; i++) {
        createSnowflake();
      }
  }
  // 更新浏览器视口宽度
  function updateWidth(){
    setWidth(window.innerWidth)
  }
  createSnowflake()
  useLayoutEffect(()=>{
    window.addEventListener('resize',updateWidth )
    const timer = setInterval(createSnowflake, 400);
    window.addEventListener('load', create);
    return ()=>{
      clearInterval(timer)
      window.removeEventListener('load',create);
      window.removeEventListener('resize',updateWidth)
    }
   })
   
  return (
    <>
      <CommonLayout>
        <div className="snow-container" >

        </div>
      </CommonLayout>
    </>
  );
}
