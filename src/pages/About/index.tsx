import styles from './index.module.scss';
import CommonLayout from '../../components/CommonLayout';
import avatar from '@/assets/images/avatar.jpg';
import { GithubOutlined, WechatWorkOutlined } from '@ant-design/icons';
export default function About() {
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
              <ul className={styles.selfMainList}>
                <li>天理24届在读</li>
                <li>intp</li>
                <li>热爱前端</li>
                <li>热爱生活</li>
                <li>选择困难症</li>
              </ul>
            </div>
          </div>
          <div className={styles.skills}></div>
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
