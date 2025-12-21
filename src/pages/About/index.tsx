import styles from './index.module.scss';
import CommonLayout from '../../components/CommonLayout';
import avatar from '@/assets/images/avatar.jpg';
import { GithubOutlined, WechatWorkOutlined } from '@ant-design/icons';
import { TagCloud } from 'react-tagcloud';
import gsap from 'gsap';
import { useRef, useEffect } from 'react';
import useScrollRestore from '@/hooks/useScrollRestore';
const data = [
  { value: 'JavaScript', count: 36 },
  { value: 'React', count: 36 },
  { value: 'Nodejs', count: 36 },
  { value: 'HTML5', count: 36 },
  { value: 'CSS3', count: 36 },
  { value: 'Webpack', count: 36 },
  { value: 'ECMAScript', count: 36 },
  { value: 'TypeScript', count: 36 },
  { value: 'Vite', count: 36 },
  { value: 'Vue.js', count: 36 },
  { value: 'github', count: 36 },
  { value: 'git', count: 36 }
];
//淡入淡出渲染
const customRenderer = (tag: { value: string; count: number }, size: number, color: string) => (
  <span
    key={tag.value}
    className={styles.tag}
    style={{
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${size / 2}em`,
      border: `2px solid ${color}`
    }}
  >
    {tag.value}
  </span>
);
export default function About() {
  const ulRef = useRef<HTMLUListElement>(null);
  useScrollRestore();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (ulRef.current) {
      gsap.from(ulRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1.0,
        ease: 'sine.out',
        delay: 0.3
      });
    }
  });
  return (
    <>
      <CommonLayout>
        <div className={styles.about}>
          {/* 自我介绍页 */}
          <div className={styles.self}>
            {/* 头像部分 */}
            <div className={styles.selfTop}>
              <div className={styles.img}>
                <img src={avatar} alt="avatar" />
              </div>
              <h2>Star</h2>
              <p>热爱前端开发</p>
            </div>
            {/* 个人介绍部分 */}
            <div className={styles.selfMain}>
              <h3>你好呀！</h3>
              <p>
                欢迎来到我的个人博客！在这里，我会分享我的日常生活、技术、前端开发等等。希望我的分享能够给你带来一些快乐和灵感！
              </p>
              <h3>关于我</h3>
              <ul className={styles.selfMainList} ref={ulRef}>
                <li>天理24届在读</li>
                <li>intp</li>
                <li>热爱前端</li>
                <li>热爱生活</li>
                <li>选择困难症</li>
              </ul>
            </div>
          </div>
          {/* 技术栈部分 */}
          <div className={styles.skills}>
            <h3>技术栈</h3>
            <TagCloud tags={data} minSize={1} maxSize={5} renderer={customRenderer} />
          </div>
          {/* 联系页 */}
          <div className={styles.contact}>
            <h3>联系我</h3>
            <p>如果你有任何问题或者想要和我交流，欢迎通过以下方式联系我哦～</p>
            <ul className={styles.contactList}>
              <li>
                <div className={styles.contactIcon}>
                  <WechatWorkOutlined
                    style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <p>邮箱</p>
                  <div>3067915247@qq.com</div>
                </div>
              </li>
              <li>
                <div
                  className={styles.contactIcon}
                  onClick={() => window.open('https://github.com/Star060327', '_blank')}
                >
                  <GithubOutlined
                    style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)' }}
                  />
                </div>
                <div className={styles.contactInfo}>
                  <p>github</p>
                  <a href="https://github.com/Star060327" target="_blank" rel="noreferrer">
                    访问主页
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </CommonLayout>
    </>
  );
}
