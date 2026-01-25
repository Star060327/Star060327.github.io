import { type Monaco } from '@monaco-editor/react';

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
// 编辑器挂载前配置主题和语言
export  function handleEditorWillMount(monaco: Monaco) {
    // 注册 Vue 语言（如果尚未注册）
    if (!monaco.languages.getLanguages().some((lang: {id:string}) => lang.id === 'vue')) {
      // 注册 Vue 语言
      monaco.languages.register({ id: 'vue' });

      // 注册自动补全提示
      monaco.languages.registerCompletionItemProvider('vue', {
        provideCompletionItems: (model: any, position: any) => {
          const word = model.getWordUntilPosition(position); // 获取当前光标前的单词
          const range = { // 定义补全范围
            startLineNumber: position.lineNumber,// 补全范围开始行号
            endLineNumber: position.lineNumber,// 补全范围结束行号
            startColumn: word.startColumn,// 补全范围开始列号
            endColumn: word.endColumn// 补全范围结束列号
          };
          // 获取当前光标前的所有文本
          const textUntilPosition = model.getValueInRange({
            startLineNumber: 1,// 补全范围开始行号
            startColumn: 1,// 补全范围开始列号
            endLineNumber: position.lineNumber,// 补全范围结束行号
            endColumn: position.column// 补全范围结束列号
          });

          // 上下文判断
          const inScript =
            textUntilPosition.match(/<script[\s\S]*?>[\s\S]*$/) &&
            !textUntilPosition.match(/<\/script>/);
          const inTemplate =
            textUntilPosition.match(/<template[\s\S]*?>[\s\S]*$/) &&
            !textUntilPosition.match(/<\/template>/);

          const suggestions: SuggestItem[] = [];

          // 1. 通用代码片段 (SFC 结构)
          if (!inScript && !inTemplate) {
            suggestions.push({
              label: 'vueInit',
              kind: monaco.languages.CompletionItemKind.Snippet,
              documentation: '初始化 Vue SFC 结构',
              insertText: [
                '<script setup>',
                "import { ref } from 'vue'",
                '',
                '</script>',
                '',
                '<template>',
                '  <div>',
                '    $0',
                '  </div>',
                '</template>',
                '',
                '<style scoped>',
                '',
                '</style>'
              ].join('\n'),
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range
            });
            suggestions.push(
              {
                label: 'template',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: '<template>\n  $0\n</template>',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
              },
              {
                label: 'script setup',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: '<script setup>\n  $0\n</script>',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
              },
              {
                label: 'style',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: '<style>\n  $0\n</style>',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
              }
            );
          }

          // 2. Script 上下文补全
          if (inScript) {
            // Vue 核心 API
            const vueApis = [
              'ref',
              'reactive',
              'computed',
              'watch',
              'watchEffect',
              'onMounted',
              'onUnmounted',
              'nextTick',
              'defineProps',
              'defineEmits'
            ];
            vueApis.forEach((api) => {
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
                label: 'import vue',
                kind: monaco.languages.CompletionItemKind.Snippet,
                documentation: '导入 Vue 核心 API',
                insertText: "import { $1 } from 'vue'",
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
              },
              {
                label: 'const ref',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'const ${1:name} = ref(${2:value})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
              },
              {
                label: 'const reactive',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'const ${1:state} = reactive({\n  $2\n})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range
              },
              {
                label: 'watch',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: 'watch(${1:source}, (newVal, oldVal) => {\n  $2\n})',
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
          }

          // 3. Template 上下文补全
          if (inTemplate) {
            // Vue 指令
            const directives = [
              { label: 'v-if', text: 'v-if="${1:condition}"' },
              { label: 'v-else', text: 'v-else' },
              { label: 'v-else-if', text: 'v-else-if="${1:condition}"' },
              { label: 'v-for', text: 'v-for="(item, index) in ${1:list}" :key="${2:index}"' },
              { label: 'v-model', text: 'v-model="${1:value}"' },
              { label: 'v-bind', text: ':${1:prop}="${2:value}"' },
              { label: 'v-on', text: '@${1:event}="${2:handler}"' },
              { label: 'v-show', text: 'v-show="${1:condition}"' },
              { label: ':class', text: ':class="{ ${1:className}: ${2:condition} }"' },
              { label: ':style', text: ':style="{ ${1:prop}: ${2:value} }"' },
              { label: '@click', text: '@click="${1:handler}"' }
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
          }

          return { suggestions };
        }
      });
    }

    // 定义自定义主题
    monaco.editor.defineTheme('vue-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'regexp', foreground: 'D16969' },
        { token: 'operator', foreground: 'D4D4D4' },
        { token: 'tag', foreground: '569CD6' },
        { token: 'attribute.name', foreground: '9CDCFE' },
        { token: 'attribute.value', foreground: 'CE9178' },
        { token: 'delimiter', foreground: 'D4D4D4' },

        // 自定义 Vue 颜色
        { token: 'vue.directive', foreground: 'C586C0' }, // 紫色 v-if
        { token: 'vue.interpolation', foreground: 'FFD700' }, // 金色 {{ }}
        { token: 'js.function', foreground: 'DCDCAA' }, // 黄色函数
        { token: 'js.class', foreground: '4EC9B0' }, // 蓝绿色类名
        { token: 'js.control', foreground: 'C586C0' } // 紫色控制流
      ],
      colors: {
        'editor.background': '#000000' // 纯黑背景
      }
    });

    // 配置语言特性（自动闭合等）
    monaco.languages.setLanguageConfiguration('vue', {
      comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
      },
      brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
        ['<', '>']
      ],
      autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: ' "' },
        { open: "'", close: "'" },
        { open: '<', close: '>', notIn: ['string'] }
      ]
    });

    // 配置 Vue 高亮规则
    monaco.languages.setMonarchTokensProvider('vue', {
      defaultToken: '',
      tokenPostfix: '.vue',
      tokenizer: {
        root: [
          // 匹配顶级标签
          [/<template/, { token: 'tag', next: '@template' }],
          [/<script/, { token: 'tag', next: '@script' }],
          [/<style/, { token: 'tag', next: '@style' }],
          // 通用 HTML 标签
          [/<!--/, 'comment', '@comment'],
          [/(<)([\w-]+)/, ['delimiter', 'tag']],
          [/(<\/)([\w-]+)(>)/, ['delimiter', 'tag', 'delimiter']],
          [/(>)/, 'delimiter'],
          // 属性
          [/[\w-]+(?==)/, 'attribute.name'],
          [/"[^"]*"/, 'string'],
          [/'[^']*'/, 'string']
        ],

        template: [
          [/<\/template>/, { token: 'tag', next: '@root' }],
          // 插值 {{ }}
          [/\{\{/, { token: 'vue.interpolation', next: '@interpolation' }],
          // Vue 指令 (v-if, @click, :prop)
          [/\bv-[\w-]+/, 'vue.directive'],
          [/[:@][\w-]+/, 'vue.directive'],
          // 标签
          [/(<)([\w-]+)/, ['delimiter', 'tag']],
          [/(<\/)([\w-]+)(>)/, ['delimiter', 'tag', 'delimiter']],
          [/(>)/, 'delimiter'],
          // 属性
          [/[\w-]+(?==)/, 'attribute.name'],
          [/"[^"]*"/, 'string'],
          [/'[^']*'/, 'string']
        ],

        script: [
          [/<\/script>/, { token: 'tag', next: '@root' }],
          // 字符串
          [/"[^"]*"/, 'string'],
          [/'[^']*'/, 'string'],
          [/`[^`]*`/, 'string'],
          // 关键字
          [
            /\b(import|export|from|const|let|var|function|return|new|class|extends|implements|interface|type|public|private|protected|readonly|static|async|await|this|super|true|false|null|undefined|void|any|number|string|boolean)\b/,
            'keyword'
          ],
          [
            /\b(if|else|for|while|switch|case|break|default|try|catch|finally|throw)\b/,
            'js.control'
          ],
          // 数字
          [/\d+/, 'number'],
          // 函数调用
          [/[\w$]+(?=\()/, 'js.function'],
          // 类名 (大写开头)
          [/[A-Z][\w$]*/, 'js.class'],
          // 标识符
          [/[\w$]+/, 'identifier'],
          // 注释
          [/\/\/.*$/, 'comment'],
          [/\/\*/, 'comment', '@comment'],
          // 符号
          [/[{}()[\].,:;=]/, 'delimiter']
        ],

        style: [
          [/<\/style>/, { token: 'tag', next: '@root' }],
          // 选择器 (tag, .class, #id)
          [/[.#][\w-]+/, 'tag.class'],
          [/[\w-]+(?=\s*\{)/, 'tag'],
          // CSS 属性
          [/([\w-]+)(\s*)(:)/, ['attribute.name', '', 'delimiter']],
          // CSS 值
          [/([^;{}]+)(;)/, ['attribute.value', 'delimiter']],
          // 注释
          [/\/\*/, 'comment', '@comment'],
          // 符号
          [/[{}]/, 'delimiter']
        ],

        interpolation: [
          [/}}/, { token: 'vue.interpolation', next: '@pop' }],
          [/\b(true|false|null|undefined)\b/, 'keyword'],
          [/[\w$]+(?=\()/, 'js.function'],
          [/[\w$]+/, 'identifier'],
          [/"[^"]*"/, 'string'],
          [/'[^']*'/, 'string'],
          [/\d+/, 'number'],
          [/[!+\-*/%=<>?&|]/, 'delimiter']
        ],

        comment: [
          [/[^/*]+/, 'comment'],
          [/\*\//, 'comment', '@pop'],
          [/[/*]/, 'comment']
        ]
      }
    });
  }