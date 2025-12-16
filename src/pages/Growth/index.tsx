import CommonLayout from '../../components/CommonLayout';
import './index.scss'
import kitty1 from '../../assets/images/kitty1.jpg'
import kitty2 from '../../assets/images/kitty2.jpg'
import kitty3 from '../../assets/images/kitty3.jpg'
import kitty4 from '../../assets/images/kitty4.jpg'
import kitty5 from '../../assets/images/kitty5.jpg'
import kitty6 from '../../assets/images/kitty6.jpg'
// import kitty7 from '../../assets/images/kitty7.jpg'

import { useLayoutEffect } from 'react';
type LearnFront = {
  id: number,
  title: string,
  content: string,
  img: string
}
export default function Growth() {
  const learnFront:LearnFront[] = [
    {
      id: 0,
      title: '2025年1月-3月',
      content: '通过观看B站的课程学习了HTML,CSS,JavaScript,自己仿写了一个小米官网的静态页面',
      img: kitty1
    },
    {
      id: 1,
      title: '2025年3月-5月',
      content: '学习了Ajax,Vue3,浏览器渲染原理,计算机网络基础,通过写一个Vue3的后台管理系统和小型电商平台练习',
      img: kitty2
    },
    {
      id: 2,
      title: '2025年5月-7月',
      content: '学习了React,TypeScript,了解git的简单用法,简单学习了nodejs、构建工具(Webpack、Vite),用React写了一个后台管理系统',
      img: kitty3
    },
    {
      id: 3,
      title: '2025年7月-9月',
      content: '复习了Javascript的基础知识,用Vue3和队友协作写了一个小游戏,简单学习了数据结构js版',
      img: kitty4
    },
    {
      id: 4,
      title: '2025年9月-11月',
      content: '用Vue3写了一个后台管理系统巩固知识,将Vue3与React进行比较补充了一些知识,了解了前端的安全问题',
      img: kitty5
    },
    {
      id: 5,
      title: '当前',
      content: '持续学习中......',
      img: kitty6
    }
  ]
  useLayoutEffect(() => {
    
  }, [])
  return (
    <>
      <CommonLayout>
        <div className="main">
          <div className="learn-front">
            <div className="top">
              <h2>前端学习过程</h2>
              <ul className="list">
                {learnFront.map((item) => (
                <li key={item.id}>
                  <div className="title">
                    <img src={item.img} alt="漂亮的logo" />
                    <h3>{item.title}</h3>
                  </div>
                  <p className="main-content">{item.content}</p>
                </li>))}
              </ul>
              <h2>技术栈</h2>
            </div>
          </div>
          
        </div>
      </CommonLayout>
    </>
  );
}
