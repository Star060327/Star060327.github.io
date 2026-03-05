import { type Monaco } from "@monaco-editor/react";
import { type SuggestItem } from "../../types/index";
import { registerTheme } from "./theme";

// vue初始化
const VUE_SFC = [
  {
    label: "vueInit",
    documentation: "初始化 Vue SFC 结构",
    insertText: [
      "<script setup>",
      "import { ref } from 'vue'",
      "",
      "</script>",
      "",
      "<template>",
      "  <div>",
      "    $0",
      "  </div>",
      "</template>",
      "",
      "<style scoped>",
      "",
      "</style>",
      "",
    ].join("\n"),
  },
  {
    label: "template",
    insertText: "<template>\n  $0\n</template>",
  },
  {
    label: "script setup",
    insertText: "<script setup>\n  $0\n</script>",
  },
  {
    label: "style",
    insertText: "<style>\n  $0\n</style>",
  },
];
// vue api
const VUE_APIS = [
  "ref",
  "reactive",
  "computed",
  "watch",
  "watchEffect",
  "onMounted",
  "onUnmounted",
  "nextTick",
  "defineProps",
  "defineEmits",
  "onBeforeMount",
  "onBeforeUpdate",
  "onUpdated",
  "onBeforeUnmount",
  "onErrorCaptured",
  "provide",
  "inject",
];
// vue脚本片段
const VUE_SCRIPT_SNIPPETS = [
  {
    label: "import vue",
    insertText: "import { $1 } from 'vue'",
  },
  {
    label: "const ref",
    insertText: "const ${1:name} = ref(${2:value})",
  },
  {
    label: "const reactive",
    insertText: "const ${1:state} = reactive({\n  $2\n})",
  },
  {
    label: "watch",
    insertText: "watch(${1:source}, (newVal, oldVal) => {\n  $2\n})",
  },
  {
    label: "log",
    insertText: "console.log(${1:message})",
  },
];
// vue指令
const VUE_DIRECTIVES = [
  { label: "v-if", text: 'v-if="${1:condition}"' },
  { label: "v-else", text: "v-else" },
  { label: "v-else-if", text: 'v-else-if="${1:condition}"' },
  {
    label: "v-for",
    text: 'v-for="(item, index) in ${1:list}" :key="${2:index}"',
  },
  { label: "v-model", text: 'v-model="${1:value}"' },
  { label: "v-bind", text: ':${1:prop}="${2:value}"' },
  { label: "v-on", text: '@${1:event}="${2:handler}"' },
  { label: "v-show", text: 'v-show="${1:condition}"' },
  { label: ":class", text: ':class="{ ${1:className}: ${2:condition} }"' },
  { label: ":style", text: ':style="{ ${1:prop}: ${2:value} }"' },
  { label: "@click", text: '@click="${1:handler}"' },
];
// 双标签
const TAGS_DOUBLE = [
  "div",
  "span",
  "p",
  "button",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "li",
  "form",
  "a",
  "section",
  "article",
  "nav",
  "header",
  "footer",
  "table",
  "thead",
  "tbody",
  "tr",
  "td",
  "th",
  "select",
  "option",
  "label",
  "textarea",
];
// 单标签
const TAGS_SINGLE = ["img", "input", "br", "hr", "meta", "link"];

// 编辑器挂载前配置主题和语言
export function handleVueEditorWillMount(monaco: Monaco) {
  // 注册主题
  registerTheme(monaco);

  // 1. 注册 Vue 语言
  if (
    !monaco.languages
      .getLanguages()
      .some((lang: { id: string }) => lang.id === "vue")
  ) {
    monaco.languages.register({ id: "vue" });
  }

  // 2. 配置 Vue 的 Monarch Tokenizer
  // 这里我们混合了 HTML, CSS, JS/TS 的规则来实现 SFC 高亮
  monaco.languages.setMonarchTokensProvider("vue", {
    defaultToken: "",
    tokenPostfix: ".vue",

    // 引入常用关键字
    keywords: [
      "abstract",
      "any",
      "as",
      "async",
      "await",
      "boolean",
      "break",
      "case",
      "catch",
      "class",
      "const",
      "constructor",
      "continue",
      "debugger",
      "declare",
      "default",
      "delete",
      "do",
      "else",
      "enum",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "from",
      "function",
      "get",
      "if",
      "implements",
      "import",
      "in",
      "infer",
      "instanceof",
      "interface",
      "is",
      "keyof",
      "let",
      "module",
      "namespace",
      "never",
      "new",
      "null",
      "number",
      "object",
      "package",
      "private",
      "protected",
      "public",
      "readonly",
      "require",
      "return",
      "set",
      "static",
      "string",
      "super",
      "switch",
      "symbol",
      "this",
      "throw",
      "true",
      "try",
      "type",
      "typeof",
      "undefined",
      "unique",
      "unknown",
      "var",
      "void",
      "while",
      "with",
      "yield",
    ],

    // 操作符
    operators: [
      "<=",
      ">=",
      "==",
      "!=",
      "===",
      "!==",
      "=>",
      "+",
      "-",
      "**",
      "*",
      "/",
      "%",
      "++",
      "--",
      "<<",
      "<<<",
      ">>",
      ">>>",
      "&",
      "|",
      "^",
      "!",
      "~",
      "&&",
      "||",
      "?",
      ":",
      "=",
      "+=",
      "-=",
      "*=",
      "/=",
      "%=",
      "<<=",
      ">>=",
      ">>>=",
      "&=",
      "|=",
      "^=",
      "@",
    ],

    // 常用 HTML 标签
    tagNames: [
      "html",
      "body",
      "head",
      "div",
      "span",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "img",
      "button",
      "form",
      "input",
      "textarea",
      "label",
      "select",
      "option",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "template",
      "script",
      "style",
      "router-link",
      "router-view",
    ],

    // 符号
    symbols: /[=><!~?:&|+\-*/^%]+/,

    tokenizer: {
      root: [
        // 1. Script 标签 (JS/TS)
        [
          /<script\s*lang="ts"\s*>/,
          { token: "tag", next: "@scriptEmbedded.ts" },
        ],
        [
          /<script(\s+(setup|lang="ts"))*>/,
          { token: "tag", next: "@scriptEmbedded.js" },
        ],

        // 2. Style 标签 (CSS)
        [/<style(\s+scoped)?>/, { token: "tag", next: "@styleEmbedded" }],

        // 3. Template (HTML)
        [/<template>/, { token: "tag", next: "@templateEmbedded" }],

        // Comments in Root
        [/<!--/, "comment", "@commentHTML"],

        // 根级别的 HTML 标签 (Fallback if outside template)
        [/<([a-zA-Z0-9-]+)/, { token: "tag", next: "@tag" }],
        [/<\/\s*([a-zA-Z0-9-]+)\s*>/, { token: "tag" }],

        // 普通文本
        [/[^<]+/, ""],
      ],

      // --- Script 内容 (简单模拟 JS/TS 高亮) ---
      "scriptEmbedded.js": [
        [/<\/script>/, { token: "tag", next: "@pop" }],
        { include: "@jsContent" },
      ],
      "scriptEmbedded.ts": [
        [/<\/script>/, { token: "tag", next: "@pop" }],
        { include: "@jsContent" },
      ],

      jsContent: [
        [
          /[a-zA-Z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],
        [/[{}]/, "delimiter.bracket"],
        [/[[\]]/, "delimiter.array"],
        [/[()]/, "delimiter.parenthesis"],

        // 字符串
        [/"([^"\\]|\\.)*$/, "string.invalid"],
        [
          /"/,
          { token: "string.quote", bracket: "@open", next: "@stringDouble" },
        ],
        [
          /'/,
          { token: "string.quote", bracket: "@open", next: "@stringSingle" },
        ],
        [
          /`/,
          { token: "string.quote", bracket: "@open", next: "@stringBacktick" },
        ],

        // 注释
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@commentJS"],

        // 数字
        [/\d+/, "number"],
      ],

      // --- Style 内容 (简单模拟 CSS 高亮) ---
      styleEmbedded: [
        // 1. 优先级最高：匹配 style 闭合标签
        [/<\/style>/, { token: "tag", next: "@pop" }],

        // 2. 注释：多行注释 /* */（优先匹配，避免 * 被拆分）
        [/\/\*/, "comment", "@commentJS"],
        [/\/\/.*/, "comment"], // 补充：CSS 单行注释（部分预处理器支持）

        // 3. CSS 特殊关键字：@规则（@media/@import/@keyframes）
        [/@[a-zA-Z-]+/, "keyword.css"],

        // 4. 选择器相关（精准匹配，避免和属性名混淆）
        [/[a-zA-Z0-9_-]+\s*\{/, "selector.css"], // 标签选择器（div/span）
        [/#[a-zA-Z0-9_-]+/, "selector.css"], // ID 选择器（#app）
        [/\.[a-zA-Z0-9_-]+/, "selector.css"], // 类选择器（.btn）
        [/:[a-zA-Z-]+/, "selector.css"], // 伪类/伪元素（:hover/:after）
        [/[a-zA-Z0-9_-]+\s*>/, "tag.css"], // 后代选择器（div>span）
        [/[a-zA-Z0-9_-]+\s*\+/, "tag.css"], // 相邻选择器（div+span）
        [/[a-zA-Z0-9_-]+\s*~/, "tag.css"], // 兄弟选择器（div~span）

        // 5. CSS 属性名（优先于值匹配，避免被值规则覆盖）
        [/[a-zA-Z-]+\s*:/, "property.css"], // 属性名（font-size: / color:）

        // 6. 数值/单位（精准匹配，避免和普通值混淆）
        [/[-+]?\d+(\.\d+)?(px|em|rem|%|vw|vh|deg)/, "number"], // 带单位的数值（16px/2rem）
        [/[-+]?\d+(\.\d+)?/, "number"], // 纯数字（0.5/100）

        // 7. 字符串（单/双引号包裹的值）
        [/".*?"/, "string"], // 双引号字符串（"Microsoft YaHei"）
        [/'.*?'/, "string"], // 单引号字符串（'Arial'）

        // 8. 运算符/分隔符（规范 Token 命名）
        [/[{}]/, "delimiter.bracket"], // 大括号
        [/[()]/, "delimiter.parenthesis"], // 小括号
        [/[*+~>]/, "operator"], // 运算符（*+~>）
        [/;/, "delimiter.semicolon"], // 分号（属性结束符）
        [/:/, "delimiter.colon"], // 冒号（补充：非属性名的冒号）

        // 9. 普通值（模糊规则，放最后，避免覆盖精准规则）
        [/[a-zA-Z0-9_-]+/, "attribute.value"], // 普通值（red/block/flex）

        // 10. 剩余符号（兜底，避免漏匹配）
        [/[^\s]+/, ""],
      ],

      // --- Template 内容 (HTML) ---
      templateEmbedded: [
        [/<\/template>/, { token: "tag", next: "@pop" }],
        [/<!--/, "comment", "@commentHTML"], // HTML comments
        [/<([a-zA-Z0-9-]+)/, { token: "tag", next: "@tag" }],
        [/<\/\s*([a-zA-Z0-9-]+)\s*>/, { token: "tag" }],
        [/{{/, { token: "delimiter", next: "@interpolation" }],
        [/[^<]+/, ""],
      ],

      // --- Vue 插值 {{ ... }} ---
      interpolation: [
        [/}}/, { token: "delimiter", next: "@pop" }],
        { include: "@jsContent" },
      ],

      // --- HTML 标签属性处理 ---
      tag: [
        [/[ \t\r\n]+/, ""],
        [
          /[a-zA-Z0-9-@:]+/, // Allow @click, :bind
          {
            cases: {
              "@default": "attribute.name",
            },
          },
        ],
        [
          /"/,
          { token: "attribute.value", bracket: "@open", next: "@attrValue" },
        ],
        [/>/, { token: "tag", next: "@pop" }],
        [/\/>/, { token: "tag", next: "@pop" }],
      ],

      attrValue: [
        [/"/, { token: "attribute.value", bracket: "@close", next: "@pop" }],
        [/[^"]+/, "attribute.value"],
      ],

      stringDouble: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
      stringSingle: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
      stringBacktick: [
        [/[^\\`$]+/, "string"],
        [/\\./, "string.escape"],
        [/`/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],

      commentJS: [
        [/\*\//, "comment", "@pop"],
        [/[^*]+/, "comment"],
        [/[*]/, "comment"],
      ],

      commentHTML: [
        [/-->/, "comment", "@pop"],
        [/[^-]+/, "comment"],
        [/-/, "comment"],
      ],
    },
  });

  // 3. 注册自动补全提示
  monaco.languages.registerCompletionItemProvider("vue", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provideCompletionItems: (model: any, position: any) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      const suggestions: SuggestItem[] = [];

      // Vue 结构初始化
      VUE_SFC.forEach((item) => {
        suggestions.push({
          label: item.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: item.documentation,
          insertText: item.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

      // Vue API
      VUE_APIS.forEach((api) => {
        suggestions.push({
          label: api,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: api,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

      // 脚本片段
      VUE_SCRIPT_SNIPPETS.forEach((s) => {
        suggestions.push({
          label: s.label,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: s.insertText,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

      // 指令
      VUE_DIRECTIVES.forEach((d) => {
        suggestions.push({
          label: d.label,
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: d.text,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

      // 标签
      TAGS_DOUBLE.forEach((tag) => {
        suggestions.push({
          label: tag,
          kind: monaco.languages.CompletionItemKind.Tag,
          insertText: `<${tag}>$0</${tag}>`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

      TAGS_SINGLE.forEach((tag) => {
        suggestions.push({
          label: tag,
          kind: monaco.languages.CompletionItemKind.Tag,
          insertText: `<${tag} />`,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

      return { suggestions };
    },
  });

  // 4. 配置语言特性
  monaco.languages.setLanguageConfiguration("vue", {
    // 注释
    comments: {
      lineComment: "",
      blockComment: ["", ""],
    },
    // 回车与缩进控制
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
      ["<", ">"],
    ],
    // 自动闭合括号
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
      { open: "<", close: ">", notIn: ["string"] },
      { open: "<!--", close: "-->" },
    ],
  });
}
