export type Data = {
  id: number;
  title: string;
  tags: string[]; // Changed from tag: string to tags: string[]
  date: string;
  path: string;
  excerpt?: string; // Added optional excerpt
};

// 博客数据
export const data: Data[] = [
  {
    id: 0,
    title: 'Markdown渲染',
    tags: ['md渲染'],
    date: '2025-12-24',
    excerpt: '探索 Markdown 渲染的无限可能，从基础语法到高级扩展...',
    path: '/content/md'
  },
  {
    id: 1,
    title: '虚拟列表',
    tags: ['技术', 'React'],
    date: '2026-01-01',
    excerpt: '深入理解虚拟列表原理，实现高性能长列表渲染...',
    path: '/content/虚拟列表'
  },
  {
    id: 2,
    title: 'playground',
    tags: ['技术'],
    date: '2026-01-14',
    excerpt: '展示我手写的playground',
    path: '/content/playground'
  },
  {
    id: 3,
    title: '六种继承方式',
    tags: ['JavaScript'],
    date: '2026-03-05',
    excerpt: '六种继承方式的实现',
    path: '/content/六种继承方式'
  }
];
