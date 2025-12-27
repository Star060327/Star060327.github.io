import React, { useEffect, useState, Suspense, useRef } from 'react';
import CommonLayout from '@/components/CommonLayout';
import type { ComponentType } from 'react';
import mdxComponents from '@/components/MDXComponents';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { Navigate } from 'react-router-dom';
import useScrollRestore from '@/hooks/useScrollRestore';
import classNames from 'classnames';

// 定义 MDX 组件接受的 Props 类型
type MDXProps = {
  components?: typeof mdxComponents;
  user?: string;
};
type Heading = {
  id: string;
  level: number;
  text: string;
};

// 动态导入组件
const modules = import.meta.glob('../../posts/*.mdx');
const lazyMdxComponents: Record<
  string,
  React.LazyExoticComponent<ComponentType<MDXProps>>
> = {};

for (const path of Object.keys(modules)) {
  // 归一化路径，解决跨平台路径问题
  const normalizedPath = path.normalize('NFC');
  const key = normalizedPath.replace('../../posts/', '').replace('.mdx', '');
  lazyMdxComponents[key] = lazy(modules[path] as () => Promise<{ default: ComponentType<MDXProps> }>);
}

const ContentPage: React.FC = () => {
  useScrollRestore();
  const { '*': path } = useParams<string>();
  // 记录当前高亮的标题ID
  const [activeId, setActiveId] = useState<string>('');
  // 存储大纲数据
  const [headings, setHeadings] = useState<Heading[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLElement>(null);

  // 根据路径获取预创建的 lazy 组件
  // 同样需要解码路径
  const MdxContent = path
    ? lazyMdxComponents[decodeURIComponent(path).normalize('NFC')]
    : null;

  // 提取标题
  useEffect(() => {
    // 只有在内容加载完成后才提取标题
    if (!contentRef.current) return;
    // 提取标题
    const extractHeadings = () => {
      const elements = Array.from(
        contentRef.current!.querySelectorAll('h1,h2,h3,h4,h5,h6')
      ).map((item) => ({
        id: item.id || `heading-${Math.random().toString(36).substring(2, 9)}`,
        level: Number(item.nodeName.charAt(1)),
        text: item.textContent || ''
      }));
      
      // 给没有ID的标题添加ID，以便锚点跳转
      Array.from(contentRef.current!.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((item, index) => {
         if(!item.id) {
             item.id = elements[index].id;
         }
      });

      // 只有当标题数量变化或内容变化时才更新（简单判断长度）
      setHeadings((prev) => {
          if (prev.length === elements.length && prev.every((h, i) => h.text === elements[i].text)) {
              return prev;
          }
          return elements;
      });
    };

    // 初始提取
    extractHeadings();

    // 监听内容变化（针对 Suspense 加载完成）
    const observer = new MutationObserver(extractHeadings);
    observer.observe(contentRef.current, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, [path]);
  // 滚动到当前激活的目录项

  // 监听滚动高亮
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 设置高亮标题的id
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0% -80% 0%' } // 调整检测区域
    );
    // 为每个标题元素添加观察器
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // 大纲自动跟随滚动
  useEffect(() => {
    if (!activeId || !outlineRef.current) return;

    // 使用 requestAnimationFrame 优化滚动性能
    const scrollOutline = () => {
      if (!outlineRef.current) return;
      const activeItem = outlineRef.current.querySelector(`.${styles.active}`);
      
      if (activeItem instanceof HTMLElement) {
        const container = outlineRef.current;
        
        // 使用 getBoundingClientRect 计算位置，解决 offsetTop 受定位父级影响的问题
        const containerRect = container.getBoundingClientRect();
        const activeItemRect = activeItem.getBoundingClientRect();
        
        // 计算激活项相对于容器顶部的距离（包含滚动条位置）
        const relativeTop = activeItemRect.top - containerRect.top + container.scrollTop;
        
        // 计算目标滚动位置：使激活项居中
        const scrollTop = relativeTop - container.clientHeight / 2 + activeItem.clientHeight / 2;
        
        container.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: 'smooth'
        });
      }
    };
    // 每次滚动时都请求动画帧，确保滚动平滑
    const rafId = requestAnimationFrame(scrollOutline);
    // 组件卸载时取消动画帧请求
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeId]);

  

  // 处理未找到内容的情况
  if (!MdxContent) {
    return <Navigate to="/not-found" />;
  }
  // 处理标题点击事件
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActiveId(id); // 立即高亮
      const element = document.getElementById(id);
      if (element) {
        // rAF优化
          requestAnimationFrame(() => {
            const top = element.getBoundingClientRect().top + window.scrollY - 100; // 减去头部高度
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
          });
      }
  };

  return (
    <CommonLayout>
      <div className={styles['blog-container']}>
        {/* 确定版心 */}
        <div className={styles.w}>
          {/* 公共的博客头 */}
          <header className={styles['blog-header']}>
            {/* 博客标题 */}
            <h1>Markdown渲染</h1>
            <div className={styles['blog-meta']}>
              <span className={styles['blog-meta-date']}>2025-12-24</span>
              <div className={styles['blog-meta-skill']}>技术</div>
            </div>
          </header>
          {/* 核心博客内容 */}
          <div className={styles['blog-content']} ref={contentRef}>
            <Suspense fallback={<div className={styles.loading}>加载中...</div>}>
              <MdxContent components={mdxComponents} />
            </Suspense>
          </div>
        </div>
        {/* 文章大纲 */}
        {headings.length > 0 && (
          <nav className={styles['blog-outline']} ref={outlineRef}>
            <div className={styles['outline-title']}>目录</div>
            <ul>
              {headings.map((h: Heading) => {
                return (
                  <li
                    key={h.id}
                    className={classNames(styles['blog-outline-item'], {
                      [styles['active']]: activeId === h.id
                    })}
                    style={{ paddingLeft: `${(h.level - 1) * 0.8}rem` }}
                  >
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => handleAnchorClick(e, h.id)}
                      title={h.text}
                    >
                      {h.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </CommonLayout>
  );
};
export default ContentPage;
