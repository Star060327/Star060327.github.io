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
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex]
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
