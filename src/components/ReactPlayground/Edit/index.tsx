import styles from './index.module.scss';
import React from 'react';
import type { File } from '../hooks/useReactPlayground';
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


const ReactEdit: React.FC<Prop> = ({
  activeFile,
  onChange
}) => {

  // 编辑器实例
  const editorRef = useRef<any>(null);
  // monaco 实例
  const monacoRef = useRef<any>(null);

  
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
                      snippetSuggestions: 'bottom', // 显示代码片段建议
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
export default ReactEdit;
