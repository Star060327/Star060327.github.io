// vite.config.ts (最佳实践版本)
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { reactPresets } from '@bit-ocean/auto-import';
import AntdResolver from 'unplugin-auto-import-antd';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import path from 'path';
import { visit } from 'unist-util-visit';

// Custom plugin to parse ==text== to <mark>text</mark>
const remarkMark = () => {
  return (tree:any) => {
    visit(tree, 'text', (node, index, parent) => {
      const value = node.value;
      if (!value.includes('==')) return;

      const parts = value.split(/==(.*?)==/);
      if (parts.length === 1) return;

      const newNodes = parts
        .map((part: string, i: number) => {
          if (i % 2 === 1) {
            // Captured group (inside ==)
            return {
              type: 'mdxJsxTextElement',
              name: 'mark',
              attributes: [],
              children: [{ type: 'text', value: part }]
            };
          }
          // Text outside ==
          return { type: 'text', value: part };
        })
        .filter((n: any) => n.value !== '');

      parent.children.splice(index, 1, ...newNodes);
      return index + newNodes.length;
    });
  };
};

// Custom plugin to pass meta string as prop
const rehypeMetaAsProps = () => {
  return (tree: any) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        node.properties.meta = node.data.meta;
      }
    });
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath, remarkMark],
        rehypePlugins: [rehypeKatex, rehypeMetaAsProps]
      })
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    AutoImport({
      imports: reactPresets,
      dts: 'auto-imports.d.ts',
      resolvers: [AntdResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  build: {
    outDir: 'docs'
  }
});
