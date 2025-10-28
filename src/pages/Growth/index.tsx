import CommonLayout from '../../components/CommonLayout';
import './index.scss'
import kitty1 from '../../assets/images/kitty1.jpg'
import kitty2 from '../../assets/images/kitty2.jpg'
import kitty3 from '../../assets/images/kitty3.jpg'
import kitty4 from '../../assets/images/kitty4.jpg'
import kitty5 from '../../assets/images/kitty5.jpg'
import kitty6 from '../../assets/images/kitty6.jpg'
import kitty7 from '../../assets/images/kitty7.jpg'

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
      content: '通过观看B站的课程学习了111111',
      img: kitty1
    },
    {
      id: 1,
      title: '',
      content: '',
      img: kitty2
    },
    {
      id: 2,
      title: '',
      content: '',
      img: kitty3
    },
    {
      id: 3,
      title: '',
      content: '',
      img: kitty4
    },
    {
      id: 4,
      title: '',
      content: '',
      img: kitty5
    },
    {
      id: 5,
      title: '',
      content: '',
      img: kitty6
    },
    {
      id: 6,
      title: '',
      content: '',
      img: kitty7
    },
    {
      id: 7,
      title: '',
      content: '',
      img: kitty7
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
                  <p>{item.content}</p>
                </li>))}
              </ul>
            </div>
          </div>
        </div>
      </CommonLayout>
    </>
  );
}
