
import { type Monaco } from '@monaco-editor/react';
import { type SuggestItem } from '../../types/index';
import { registerTheme } from './theme';

// 定义 HTML 标签
const TAG_DOUBLE = [
        'div',
        'span',
        'p',
        'button',
        'h1',
        'h2',
        'h3',
        'ul',
        'li',
        'form',
        'a',
        'main',
        'footer',
        'header',
        'nav',
        'section'
      ];
const TAG_SINGLE = [
        'img',
        'input',
        'br',
        'hr'
      ];
// 定义 js 代码片段
const JS=[
  {
    label: 'log',
    insertText: 'console.log(${1:message})',
    documentation: '插入 console.log 代码片段，光标定位到参数位置'
  },
  {
    label: 'error',
    insertText: 'console.error(${1:error})',
    documentation: '插入 console.error 代码片段，用于输出错误信息'
  },
  {
    label: 'warn',
    insertText: 'console.warn(${1:warn})',
    documentation: '插入 console.warn 代码片段，用于输出警告信息'
  },
  // 常用循环/条件片段
  {
    label: 'for',
    insertText: [
      'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {',
      '  ${3:// code}',
      '}'
    ].join('\n'),
    documentation: '插入标准 for 循环代码片段'
  },
  {
    label: 'if',
    insertText: ['if (${1:condition}) {', '  ${2:// code}', '}'].join('\n'),
    documentation: '插入 if 条件判断代码片段'
  }

]
export function handleHtmlEditorWillMount(
  monaco: Monaco,
) {
  registerTheme(monaco);
  // js自动补全
  monaco.languages.registerCompletionItemProvider('javascript', {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position); // 获取当前光标前的单词
      const range = {
        // 定义补全范围
        startLineNumber: position.lineNumber, // 补全范围开始行号
        endLineNumber: position.lineNumber, // 补全范围结束行号
        startColumn: word.startColumn, // 补全范围开始列号
        endColumn: word.endColumn // 补全范围结束列号
      };
      // 常用代码片段
      const suggestions: SuggestItem[] = JS.map(item => ({
        ...item,
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range
      }))
      return { suggestions };
    }
  });
  // html自动补全
  monaco.languages.registerCompletionItemProvider('html', {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      // 常用 HTML 标签
      
      TAG_DOUBLE.forEach((tag) => {
        suggestions.push({
          label: tag,
          kind: monaco.languages.CompletionItemKind.Tag,
          insertText: `<${tag}>$0</${tag}>`,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
      });
      // 自闭合标签
      TAG_SINGLE.forEach((tag) => {
        suggestions.push({
          label: tag + ' (self-closing)',
          kind: monaco.languages.CompletionItemKind.Tag,
          insertText: `<${tag} />`,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
      });
      return { suggestions };
    }
  });
}
