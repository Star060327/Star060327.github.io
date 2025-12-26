import styles from './index.module.scss';
import React from 'react';
import CommonLayout from '../../components/CommonLayout';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useRef, useEffect } from 'react';
import useScrollRestore from '@/hooks/useScrollRestore';
import avatar from '@/assets/images/avatar.jpg';
import { data } from '@/utils/data.ts';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(SplitText);

const PAGESIZE = 6;

export default function Layout(): React.ReactNode {
  const navigate = useNavigate();
  //刷新位置不变
  useScrollRestore();
  // js动画  文字逐个出现
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.fonts.ready.then(() => {
      //创建SplitText实例
      if (h1Ref.current) {
        const split1 = new SplitText(h1Ref.current, { type: 'words', addTags: true });
        // 从以下状态回到当前状态
        gsap.from(split1.words, {
          opacity: 0,
          y: 20, // 文字从下往上出现
          stagger: 0.1, // 每个元素的动画开始时间比前一个晚0.1s
          duration: 0.5, //每个元素的动画持续时间
          ease: 'sine.out' //缓动函数
        });
      }
      if (pRef.current) {
        const split2 = new SplitText(pRef.current, { type: 'words', addTags: true });
        gsap.from(split2.words, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: 'sine.out',
          delay: 0.3 //
        });
      }
    });
  });
  // 分页
  const [current, setCurrent] = useState(1);
  // 更新页数
  function updatePage(page: number) {
    setCurrent(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  //当前页数的博客内容
  const currentData = data.slice((current - 1) * PAGESIZE, current * PAGESIZE);
  return (
    <>
      <CommonLayout>
        <div className={styles.layout}>
          <div className={styles.top}>
            <h1 className={styles.h1} ref={h1Ref}>
              博客文章
            </h1>
            <p className={styles.p} ref={pRef}>
              记录生活 记录成长 记录进步
            </p>
          </div>
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
                  <li>
                    <span>54</span>
                    <span>归档</span>
                  </li>
                  <li>
                    <span>6</span>
                    <span>分类</span>
                  </li>
                  <li>
                    <span>7</span>
                    <span>标签</span>
                  </li>
                </ul>
              </header>
              <div className={styles['sumup-content']}>
                <h3>分类</h3>
                <ul>
                  <li>
                    <span>css</span>
                    <span>9</span>
                  </li>
                  <li>
                    <span>css</span>
                    <span>9</span>
                  </li>
                  <li>
                    <span>css</span>
                    <span>9</span>
                  </li>
                  <li>
                    <span>css</span>
                    <span>9</span>
                  </li>
                  <li>
                    <span>css</span>
                    <span>9</span>
                  </li>
                  <li>
                    <span>css</span>
                    <span>9</span>
                  </li>
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
                        <div>{item.tag}</div>
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
      </CommonLayout>
    </>
  );
}
