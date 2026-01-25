import styles from './index.module.scss';
import React from 'react';
import type { File } from '../hooks/usePlayground';
import { useEffect, useRef } from 'react';
import { Editor, type Monaco } from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/plugins/html';
import parserCss from 'prettier/plugins/postcss';
import parserBabel from 'prettier/plugins/babel';
import * as estree from 'prettier/plugins/estree';


interface Prop {
  activeFile: File;
  onChange: (content: string) => void;
}

interface SuggestItem {
  label: string;
  kind: string;
  documentation?: string;
  insertText: string;
  insertTextRules: string;
  range: {
    startLineNumber: number;
    endLineNumber: number;
    startColumn: number;
    endColumn: number;
  };
}

// 格式化代码
const formatCode = async (code: string, language: string) => {
  try {
    let parser = 'html';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let plugins: any[] = [parserHtml];

    if (language === 'css') {
      parser = 'css';
      plugins = [parserCss];
    } else if (language === 'javascript') {
      parser = 'babel';
      plugins = [parserBabel, estree];
    }

    return await prettier.format(code, {
      parser,
      plugins,
      printWidth: 80,
      tabWidth: 2,
    });
  } catch (error) {
    console.error('Formatting failed:', error);
    return code;
  }
};


const Edit: React.FC<Prop> = ({
  activeFile,
  onChange
}) => {

  // 编辑器实例
  const editorRef = useRef<any>(null);
  // monaco 实例
  const monacoRef = useRef<any>(null);
  
  const isRegisterJs=useRef(false);
  const isRegisterHtml=useRef(false);
  function handleEditorWillMount(monaco:Monaco){
    // js自动补全
    monaco.languages.registerCompletionItemProvider('javascript',{
      provideCompletionItems: (model:any, position:any) => {
        if(isRegisterJs.current){
          return { suggestions: [] };
        }
        const word = model.getWordUntilPosition(position); // 获取当前光标前的单词
          const range = { // 定义补全范围
            startLineNumber: position.lineNumber,// 补全范围开始行号
            endLineNumber: position.lineNumber,// 补全范围结束行号
            startColumn: word.startColumn,// 补全范围开始列号
            endColumn: word.endColumn// 补全范围结束列号
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
        insertText: [
          'if (${1:condition}) {',
          '  ${2:// code}',
          '}'
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range,
        documentation: '插入 if 条件判断代码片段'
      }
    ];

          isRegisterJs.current=true;
          return { suggestions };
          
      },
    })
    // html自动补全
    monaco.languages.registerCompletionItemProvider('html',{
      provideCompletionItems: (model:any, position:any) => {
        if(isRegisterHtml.current){
          return { suggestions: [] };
        }
        const word = model.getWordUntilPosition(position); // 获取当前光标前的单词
          const range = { // 定义补全范围
            startLineNumber: position.lineNumber,// 补全范围开始行号
            endLineNumber: position.lineNumber,// 补全范围结束行号
            startColumn: word.startColumn,// 补全范围开始列号
            endColumn: word.endColumn// 补全范围结束列号
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
          isRegisterHtml.current=true;
          return { suggestions };
      },
    })
  }
  
  // 编辑器挂载时，将内容设置为 activeFile.content
  function handleEditorDidMount(editor:any, monaco:any):Monaco{
     editorRef.current = editor;
    monacoRef.current = monaco;

    // 配置 Monaco 编辑器
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });

    // 注册格式化器
    const registerFormatter = (lang: string) => {
      monaco.languages.registerDocumentFormattingEditProvider(lang, {
        // 提供文档格式化编辑
        async provideDocumentFormattingEdits(model: any) {
          const text = model.getValue();
          const formatted = await formatCode(text, lang);
          return [
            {
              range: model.getFullModelRange(),
              text: formatted,
            },
          ];
        },
      });
    };

    registerFormatter('html');
    registerFormatter('css');
    registerFormatter('javascript');
  }
  // 当 activeFile.language 变化时，更新编辑器语言  
  useEffect(() => {
    if (monacoRef.current && editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        monacoRef.current.editor.setModelLanguage(model, activeFile.language);
      }
    }
  }, [activeFile.language]);
  return (
    <>
    <div className={styles['edit-editor']}>
          <Editor 
                    height="100%"
                              language={activeFile.language}
                              value={activeFile.content}
                              theme="vue-dark"
                              onChange={(val) => onChange(val || '')}
                              beforeMount={handleEditorWillMount}
                              onMount={handleEditorDidMount}
                              options={{
                                minimap: { enabled: false }, // 关闭小地图
                                fontSize: 14,
                                padding: { top: 16 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                                formatOnPaste: true,
                                formatOnType: true,
                                scrollbar: {
                                  vertical: 'auto',
                                  horizontal: 'auto',
                                  alwaysConsumeMouseWheel: false
                                },
                                suggestOnTriggerCharacters: true, // 触发自动补全
                                parameterHints: { enabled: true }, // 显示参数提示
                                snippetSuggestions: 'top', // 显示代码片段建议
                                wordBasedSuggestions: 'off', // 基于单词的建议
                                lineNumbers: 'on', // 显示行号
                                tabSize: 2, // 2 空格缩进
                                wordWrap: 'on', // 自动换行
                                folding: true, // 允许折叠代码块
                                quickSuggestions: {
                                  other: true,
                                  comments: true,
                                  strings: true
                                },
                                renderWhitespace: 'none',
                                // 允许在 Vue 文件中使用 Emmet
                                tabCompletion: 'on'
                              }}
                    />
        </div>
    </>
  );
};
export default Edit;
