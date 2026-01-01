
type Data = {
  id: number;
  title: string;
  tags: string[]; // Changed from tag: string to tags: string[]
  date: string;
  content: string;
  path: string;
  excerpt?: string; // Added optional excerpt
};

// 博客数据
export const data: Data[] = [
  {
    id: 0,
    title: 'Markdown渲染',
    tags: ['技术', 'Markdown'],
    date: '2025-12-24',
    content: '这篇文章展示了我们博客平台强大的 Markdown 渲染能力。让我们一起来看看各种元素的渲染效果......',
    excerpt: '探索 Markdown 渲染的无限可能，从基础语法到高级扩展...',
    path: '/content/md'
  },
  {
    id: 1,
    title: '虚拟列表',
    tags: ['前端', 'React', '性能优化'],
    date: '2026-01-01',
    content: '',
    excerpt: '深入理解虚拟列表原理，实现高性能长列表渲染...',
    path: '/content/虚拟列表'
  }
];

