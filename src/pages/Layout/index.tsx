import styles from './index.module.scss';
import React from 'react';
import CommonLayout from '../../components/CommonLayout';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
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
                        <div>{item.tags.join('')}</div>
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
