import { type Monaco } from '@monaco-editor/react';
import { type SuggestItem } from '../../types/index';

export function handleHtmlEditorWillMount(
  monaco: Monaco,
  isRegisterJs: boolean,
  isRegisterHtml: boolean
) {
  // js自动补全
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model: any, position: any) => {
      if (isRegisterJs) {
        return { suggestions: [] };
      }
      const word = model.getWordUntilPosition(position); // 获取当前光标前的单词
      const range = {
        // 定义补全范围
        startLineNumber: position.lineNumber, // 补全范围开始行号
        endLineNumber: position.lineNumber, // 补全范围结束行号
        startColumn: word.startColumn, // 补全范围开始列号
        endColumn: word.endColumn // 补全范围结束列号
      };
      // 常用代码片段
      const suggestions: SuggestItem[] = [
        // 基础 console 系列
        {
          label: 'log',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'console.log(${1:message})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          documentation: '插入 console.log 代码片段，光标定位到参数位置'
        },
        {
          label: 'error',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'console.error(${1:error})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          documentation: '插入 console.error 代码片段，用于输出错误信息'
        },
        {
          label: 'warn',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'console.warn(${1:warn})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          documentation: '插入 console.warn 代码片段，用于输出警告信息'
        },
        // 常用循环/条件片段
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {',
            '  ${3:// code}',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          documentation: '插入标准 for 循环代码片段'
        },
        {
          label: 'if',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: ['if (${1:condition}) {', '  ${2:// code}', '}'].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
          documentation: '插入 if 条件判断代码片段'
        }
      ];

      isRegisterJs = true;
      return { suggestions };
    }
  });
  // html自动补全
  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: (model: any, position: any) => {
      if (isRegisterHtml) {
        return { suggestions: [] };
      }
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
      const tags = [
        'div',
        'span',
        'p',
        'button',
        'input',
        'h1',
        'h2',
        'h3',
        'ul',
        'li',
        'form',
        'img',
        'a'
      ];
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
      isRegisterHtml = true;
      return { suggestions };
    }
  });
}
