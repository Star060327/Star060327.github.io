import React from 'react';
import CommonLayout from '@/components/CommonLayout';
import type { ComponentType } from 'react';
import mdxComponents from '@/components/MDXComponents';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { Navigate } from 'react-router-dom';
import useScrollRestore from '@/hooks/useScrollRestore';
// 定义 MDX 组件接受的 Props 类型
type MDXProps = {
  components?: typeof mdxComponents;
  user?: string;
};

// 动态导入组件
const modules = import.meta.glob('../../posts/*.mdx');
const lazyMdxComponents: Record<string, React.LazyExoticComponent<ComponentType<MDXProps>>> = {};

for (const path of Object.keys(modules)) {
  // 归一化路径，解决跨平台路径问题
  const normalizedPath = path.normalize('NFC');
  const key = normalizedPath.replace('../../posts/', '').replace('.mdx', '');
  lazyMdxComponents[key] = React.lazy(() => import(path));
}

const ContentPage: React.FC = () => {
  useScrollRestore();
  const { '*': path } = useParams();

  // 根据路径获取预创建的 lazy 组件
  // 同样需要解码路径
  const MdxContent = path ? lazyMdxComponents[decodeURIComponent(path).normalize('NFC')] : null;

  // 处理未找到内容的情况
  if (!MdxContent) {
    return <Navigate to="/not-found" />;
  }

  return (
    <CommonLayout>
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
        <div className={styles['blog-content']}>
          <MdxContent components={mdxComponents} />
        </div>
      </div>
    </CommonLayout>
  );
};
export default ContentPage;
