import { isValidElement, type ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import { ImageOff } from 'lucide-react';
import CodeBlock from '../CodeBlock/CodeBlock';
import styles from './index.module.scss';
import Playground from '../Playground/Playground';
const mdxComponents: MDXComponents = {
  // playground 布局
  Playground,
  // 映射 mark 元素，支持 ==高亮== 语法
  mark: (props: ComponentPropsWithoutRef<'mark'>) => <mark {...props} className={styles.mark} />,
  // 粗体
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong {...props} className={styles.strong} />
  ),

  // 必须映射 pre，因为 Markdown 的代码块外层是 pre
  pre: ({ children }: ComponentPropsWithoutRef<'pre'>) => {
    if (isValidElement(children)) {
      const codeProps = children.props as ComponentPropsWithoutRef<'code'>;
      return (
        <CodeBlock className={codeProps.className} {...codeProps}>
          {codeProps.children}
        </CodeBlock>
      );
    }
    return <pre>{children}</pre>;
  },
  // 映射 code 元素，添加语法高亮类名
  code: ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
    // 检查是否是行内代码（没有className或者className不包含language-）
    const isInline = !className || !className.includes('language-');

    // 如果内容以 ` 开头和结尾，去除它们
    let content = children;
    if (isInline && typeof content === 'string') {
      // 移除开头和结尾的反引号，包括可能存在的多个
      content = content.replace(/^`+|`+$/g, '');
    }

    return (
      <code
        {...props}
        className={`${className || ''} ${isInline ? 'px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-sm border border-slate-200 dark:border-slate-700/50 break-words whitespace-normal' : ''}`}
      >
        {content}
      </code>
    );
  },
  // 映射 blockquote 元素，添加引用样式
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote {...props} className={styles.blockquote}></blockquote>
  ),
  // 标题系列
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <h1 {...props} className={styles.h1} />,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <h2 {...props} className={styles.h2} />,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <h3 {...props} className={styles.h3} />,
  h4: (props: ComponentPropsWithoutRef<'h4'>) => <h4 {...props} className={styles.h4} />,
  h5: (props: ComponentPropsWithoutRef<'h5'>) => <h5 {...props} className={styles.h5} />,
  h6: (props: ComponentPropsWithoutRef<'h6'>) => <h6 {...props} className={styles.h6} />,
  // 段落
  p: (props: ComponentPropsWithoutRef<'p'>) => <p {...props} className={styles.p} />,
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className={styles.tableWrapper}>
      <table {...props} className={styles.table} />
    </div>
  ),
  // 表格行
  tr: (props: ComponentPropsWithoutRef<'tr'>) => <tr {...props} className={styles.tr} />,
  // 表格单元格
  td: (props: ComponentPropsWithoutRef<'td'>) => <td {...props} className={styles.td} />,
  // 表格标题单元格
  th: (props: ComponentPropsWithoutRef<'th'>) => <th {...props} className={styles.th} />,
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead {...props} className={styles.thead} />
  ),
  // 表格主体
  tbody: (props: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody {...props} className={styles.tbody} />
  ),
  // 列表
  ul: (props: ComponentPropsWithoutRef<'ul'>) => <ul {...props} className={styles.ul} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <ol {...props} className={styles.ol} />,
  li: (props: ComponentPropsWithoutRef<'li'>) => <li {...props} className={styles.li} />,
  // 图片
  // 映射 img 元素，添加图片样式 支持懒加载
  img: (props: ComponentPropsWithoutRef<'img'>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [error, setError] = useState(false);

    if (error) {
      return (
        <div className={styles['img-error']}>
          <ImageOff style={{ width: '24px', height: '24px', marginBottom: '8px' }} />
          <span className={styles['img-error-text']}>图片加载失败</span>
          <span className={styles['img-error-alt']} title={props.src}>
            {props.alt || props.src?.split('/').pop() || 'Unknown Image'}
          </span>
        </div>
      );
    }

    return <img {...props} onError={() => setError(true)} loading="lazy" className={styles.img} />;
  },
  //链接
  a: (props: ComponentPropsWithoutRef<'a'>) => {
    const { href } = props;
    // 只有以 http 或 https 开头的链接才在新窗口打开
    // 这样可以确保锚点链接 (#)、相对路径 (./)、绝对路径 (/) 都在当前窗口打开
    const isExternal = href && (href.startsWith('http://') || href.startsWith('https://'));

    return (
      <a
        {...props}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={styles.a}
      />
    );
  },
  // 分割线
  hr: (props: ComponentPropsWithoutRef<'hr'>) => <hr {...props} className={styles.hr} />
};
export default mdxComponents;
