import { type Monaco } from "@monaco-editor/react";
import { type SuggestItem } from "../../types/index";
import { registerTheme } from "./theme";

const reactApis = [
  "useState",
  "useEffect",
  "useContext",
  "useReducer",
  "useCallback",
  "useMemo",
  "useRef",
  "useImperativeHandle",
  "useLayoutEffect",
  "useDebugValue",
  "useSyncExternalStore",
  "useTransition",
  "useDeferredValue",
  "useId",
  "useInsertionEffect",
];

const directives = [
  { label: "onClick", text: "onClick={${1:handler}}" },
  { label: "onChange", text: "onChange={${1:handler}}" },
  { label: "className", text: 'className="${1:class}"' },
  { label: "style", text: "style={{ $1 }}" },
  { label: "ref", text: "ref={${1:ref}}" },
  { label: "key", text: "key={${1:key}}" },
];

const TAGS_DOUBLE = [
  "div",
  "span",
  "p",
  "button",
  "h1",
  "h2",
  "h3",
  "ul",
  "li",
  "form",
  "a",
  "section",
  "article",
  "nav",
  "header",
  "footer",
];
const TAGS_SINGLE = ["img", "input", "br", "hr", "meta", "link"];

// 挂在前
export function handleReactEditorWillMount(monaco: Monaco) {
  // 注册主题
  registerTheme(monaco);
  // 注册 jsx 语言（如果尚未注册）
  if (
    !monaco.languages
      .getLanguages()
      .some((lang: { id: string }) => lang.id === "jsx")
  ) {
    // 注册 jsx 语言
    monaco.languages.register({ id: "jsx" });
  }

  // 配置 JSX 高亮
  monaco.languages.setMonarchTokensProvider("jsx", {
    defaultToken: "",
    tokenPostfix: ".jsx",
    keywords: [
      "break",
      "case",
      "catch",
      "class",
      "continue",
      "const",
      "constructor",
      "debugger",
      "default",
      "delete",
      "do",
      "else",
      "export",
      "extends",
      "false",
      "finally",
      "for",
      "from",
      "function",
      "get",
      "if",
      "import",
      "in",
      "instanceof",
      "let",
      "new",
      "null",
      "return",
      "set",
      "super",
      "switch",
      "symbol",
      "this",
      "throw",
      "true",
      "try",
      "typeof",
      "undefined",
      "var",
      "void",
      "while",
      "with",
      "yield",
      "async",
      "await",
      "of",
    ],
    operators: [
      "<=",
      ">=",
      "==",
      "!==",
      "===",
      "!=",
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
    ],
    symbols: /[=><!~?:&|+\-*/^%]+/,
    escapes:
      /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    tokenizer: {
      root: [
        [/{\/\*/, "comment", "@jsxComment"],
        // JSX 标签
        [
          /(<)([a-zA-Z0-9-]+)/,
          [{ token: "delimiter" }, { token: "tag", next: "@jsxAttributes" }],
        ],
        [/\{/, { token: "delimiter.bracket", next: "@jsExpression" }],
        // Identifiers and Keywords
        [
          /[a-zA-Z_$][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],
        // Whitespace & Comments (JS context)
        { include: "@whitespace" },

        // Delimiters
        [/[{}()[\]]/, "@brackets"],
        [/[<>](?!@symbols)/, "@brackets"], // Matches < or > that are NOT part of symbols (like <=)

        // Symbols
        [
          /@symbols/,
          {
            cases: {
              "@operators": "operator",
              "@default": "",
            },
          },
        ],

        // Numbers
        [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
        [/\d+/, "number"],

        // Strings
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
      ],

      // JSX Attributes State (Attributes + Closing Tag matching)
      jsxAttributes: [
        [/[a-zA-Z0-9-]+/, "attribute.name"],
        [/"/, { token: "attribute.value", next: "@attrValueDouble" }],
        [/'/, { token: "attribute.value", next: "@attrValueSingle" }],
        [/{/, { token: "delimiter", next: "@jsExpression" }], // JS Expression inside attributes
        [/>/, { token: "delimiter", next: "@jsxBody" }], // End of opening tag -> Go to Body
        [/\/>/, { token: "delimiter", next: "@pop" }], // Self-closing -> Pop

        // Closing tag match (returned from jsxBody)
        // Correctly splits tokens: </ name >
        [
          /(<\/)([a-zA-Z0-9-]+)(>)/,
          [
            { token: "delimiter" },
            { token: "tag" },
            { token: "delimiter", next: "@pop" },
          ],
        ],
        [/[ \t\r\n]+/, ""],
      ],

      // JSX Body State (Content between tags)
      jsxBody: [
        // 闭合标签
        [/(?=<\/\s*[a-zA-Z0-9-]+\s*>)/, { token: "", next: "@pop" }],

        // Nested JSX
        [
          /(<)([a-zA-Z0-9-]+)/,
          [{ token: "delimiter" }, { token: "tag", next: "@jsxAttributes" }],
        ],

        // JS Expression inside body
        [/{/, { token: "delimiter", next: "@jsExpression" }],

        // Text (NOT comments) - // is treated as text here
        [/[^<{]+/, ""],
      ],

      // JS Expression State (inside {})
      jsExpression: [
        [/\/\/.*$/, "comment"],
        [/\/\*/, "comment", "@blockComment"], // 在大括号内发现注释，跳转
        [/}/, { token: "delimiter.bracket", next: "@pop" }], // 遇到右大括号，退出 JS 逻辑区
        // Recurse to root-like JS rules
        { include: "@root" },
      ],
      // 属性值 - 双引号
      attrValueDouble: [
        [/"/, { token: "attribute.value", next: "@pop" }],
        [/[^"]+/, "attribute.value"],
      ],
      // 属性值 - 单引号
      attrValueSingle: [
        [/'/, { token: "attribute.value", next: "@pop" }],
        [/[^']+/, "attribute.value"],
      ],
      // 字符串 - 双引号
      stringDouble: [
        [/[^\\"]+/, "string"],
        [/\\./, "string.escape"],
        [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
      // 字符串 - 单引号
      stringSingle: [
        [/[^\\']+/, "string"],
        [/\\./, "string.escape"],
        [/'/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],
      // 字符串 - 反引号
      stringBacktick: [
        [/[^\\`$]+/, "string"],
        [/\\./, "string.escape"],
        [/`/, { token: "string.quote", bracket: "@close", next: "@pop" }],
      ],

      // jsx 注释 {/* ... */}
      jsxComment: [
        [/\*\/}/, "comment", "@pop"],
        [/[^*]+/, "comment"],
        [/[*]/, "comment"],
      ],

      // 普通 JS 块注释 /* ... */
      blockComment: [
        [/\*\//, "comment", "@pop"],
        [/[^*]+/, "comment"],
        [/[*]/, "comment"],
      ],

      // 空白符 & 注释 (JSX 上下文)
      whitespace: [
        [/[ \t\r\n]+/, "white"],
        [/\/\*/, "comment", "@blockComment"],
        [/\/\/.*$/, "comment"],
      ],
    },
  });

  // 注册自动补全提示
  monaco.languages.registerCompletionItemProvider("jsx", {
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

      reactApis.forEach((api) => {
        suggestions.push({
          label: api,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: api,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

      suggestions.push(
        {
          label: "import react",
          kind: monaco.languages.CompletionItemKind.Snippet,
          documentation: "导入 React 核心 API",
          insertText: "import { $1 } from 'react'",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "const useState",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText:
            "const [${1:state}, ${2:setState}] = useState(${3:initialValue})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "const useEffect",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "useEffect(() => {\n  $1\n}, [$2])",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "const useContext",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "const ${1:contextValue} = useContext(${2:context})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
        {
          label: "log",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "console.log(${1:message})",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        },
      );

      directives.forEach((d) => {
        suggestions.push({
          label: d.label,
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: d.text,
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range,
        });
      });

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
          label: tag + " (self-closing)",
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

  // 配置 JSX 语言特性（自动闭合等）
  monaco.languages.setLanguageConfiguration("jsx", {
    comments: {
      // lineComment: "//", // 关闭行注释，强制使用块注释，以支持 JSX {/* */}
      blockComment: ["{/*", "*/}"],
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      { open: "`", close: "`" },
      { open: "<", close: ">", notIn: ["string"] },
      { open: "{/*", close: "*/}" },
    ],
  });
}
