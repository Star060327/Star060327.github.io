import { type Monaco } from '@monaco-editor/react';
import { type SuggestItem } from '../../types/index';

// 挂在前
export function handleReactEditorWillMount(monaco: Monaco, isRegister: boolean) {
  if (isRegister) {
    return;
  }
  // 配置 TypeScript 编译器选项
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    // 核心配置：将 JSX 编译模式设为 React
    jsx: monaco.languages.typescript.JsxEmit.React,
    // 允许在 JS 文件中使用 JSX
    allowJs: true,
    // 目标 ES 版本
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    // 允许非 TS 扩展名
    allowNonTsExtensions: true,
    // 启用模块解析（用于 import 路径识别）
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs
  });

  // jsx配置
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowNonTsExtensions: true, // 允许非 TS 扩展名
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs, // 模块解析策略
    module: monaco.languages.typescript.ModuleKind.CommonJS, // 模块系统
    noEmit: true, // 不生成输出文件
    esModuleInterop: true, // 启用 ES 模块互操作性
    jsx: monaco.languages.typescript.JsxEmit.React, // JSX 编译模式
    reactNamespace: 'React', // React 命名空间
    allowJs: true, // 允许在 JS 文件中使用 JSX
    typeRoots: ['node_modules/@types'] // 类型定义根目录
  });

  // 注册自动补全提示
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position); // 获取当前光标前的单词
      const range = {
        // 定义补全范围
        startLineNumber: position.lineNumber, // 补全范围开始行号
        endLineNumber: position.lineNumber, // 补全范围结束行号
        startColumn: word.startColumn, // 补全范围开始列号
        endColumn: word.endColumn // 补全范围结束列号
      };
      const suggestions: SuggestItem[] = [];

      // 2. Script 上下文补全
      // react 核心 API
      const reactApis = [
        'useState',
        'useEffect',
        'useContext',
        'useReducer',
        'useCallback',
        'useMemo',
        'useRef',
        'useImperativeHandle',
        'useLayoutEffect',
        'useDebugValue'
      ];
      reactApis.forEach((api) => {
        suggestions.push({
          label: api,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: api,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
      });

      // 常用代码片段
      suggestions.push(
        {
          label: 'import react',
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: '导入 React 核心 API',
          insertText: "import { $1 } from 'react'",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        },
        {
          label: 'const useState',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'const [${1:state}, ${2:setState}] = useState(${3:initialValue})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        },
        {
          label: 'const useEffect',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'useEffect(() => {\n  $1\n}, [$2])',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        },
        {
          label: 'const useContext',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'const ${1:contextValue} = useContext(${2:context})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        },
        {
          label: 'log',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'console.log(${1:message})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        }
      );

      // react 指令
      const directives = [
        { label: 'onClick', text: 'onClick={${1:handler}}' }, // 注意：React 中通常用 {} 而非 ""
        { label: 'onChange', text: 'onChange={${1:handler}}' },
        { label: 'className', text: 'className="${1:class}"' }, // 补全常用属性
        { label: 'style', text: 'style={{ $1 }}' } // React style 接受的是对象
      ];

      directives.forEach((d) => {
        suggestions.push({
          label: d.label,
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: d.text,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
      });

      // 常用 HTML 标签
      const tags = ['div', 'span', 'p', 'button', 'h1', 'h2', 'h3', 'ul', 'li', 'form', 'a'];
      tags.forEach((tag) => {
        suggestions.push({
          label: tag,
          kind: monaco.languages.CompletionItemKind.Tag,
          insertText: `<${tag}>$0</${tag}>`,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
      });
      // 自闭合标签
      ['img', 'input', 'br', 'hr'].forEach((tag) => {
        suggestions.push({
          label: tag + ' (self-closing)',
          kind: monaco.languages.CompletionItemKind.Tag,
          insertText: `<${tag} />`,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
      });
      isRegister = true;
      return { suggestions };
    }
  });
}
