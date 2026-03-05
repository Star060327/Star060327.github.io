import { type Monaco } from "@monaco-editor/react";

export const THEME_NAME = "playground-dark";

export function registerTheme(monaco: Monaco) {
  monaco.editor.defineTheme(THEME_NAME, {
    base: "vs-dark",
    inherit: true,
    rules: [
      // --- 基础通用 (General) ---
      { token: "", foreground: "#D4D4D4" }, // 默认文本
      { token: "comment", foreground: "#6A9955", fontStyle: "italic" },
      { token: "keyword", foreground: "#569CD6" }, // control keywords (if, return)
      { token: "keyword.control", foreground: "#C586C0" }, // 流程控制关键字在 VS Code 中偏紫
      { token: "storage", foreground: "#569CD6" }, // const, let, var
      { token: "storage.type", foreground: "#569CD6" },
      { token: "operator", foreground: "#D4D4D4" },
      { token: "string", foreground: "#CE9178" },
      { token: "number", foreground: "#B5CEA8" },
      { token: "regexp", foreground: "#D16969" },
      { token: "delimiter", foreground: "#D4D4D4" },

      // --- 变量与函数 (Variables & Functions) ---
      { token: "identifier", foreground: "#9CDCFE" }, // 普通变量：浅蓝
      { token: "variable", foreground: "#9CDCFE" },
      { token: "variable.parameter", foreground: "#9CDCFE" },
      { token: "variable.predefined", foreground: "#4FC1FF" }, // 内置变量 (window, document)
      { token: "function", foreground: "#DCDCAA" }, // 函数调用/定义：浅黄
      { token: "type", foreground: "#4EC9B0" }, // 类、接口、类型：蓝绿
      { token: "class", foreground: "#4EC9B0" },
      { token: "interface", foreground: "#4EC9B0" },

      // --- 属性与成员 (Properties) ---
      { token: "member", foreground: "#DCDCAA" }, // 方法
      { token: "property", foreground: "#9CDCFE" }, // 属性
      { token: "attribute.name", foreground: "#9CDCFE" },

      // --- HTML / XML / Vue Template ---
      { token: "tag", foreground: "#569CD6" }, // 标签名
      { token: "tag.tag-main", foreground: "#569CD6" },
      { token: "tag.id", foreground: "#DCDCAA" },
      { token: "tag.class", foreground: "#DCDCAA" },
      { token: "attribute.value", foreground: "#CE9178" },
      { token: "attribute.value.number", foreground: "#B5CEA8" },
      { token: "attribute.value.unit", foreground: "#B5CEA8" },
      { token: "attribute.value.html", foreground: "#CE9178" },
      { token: "attribute.value.xml", foreground: "#CE9178" },
      { token: "metatag", foreground: "#808080" }, // 自闭合标签斜杠等
      { token: "metatag.content.html", foreground: "#D4D4D4" },

      // --- CSS / LESS / SCSS ---
      { token: "keyword.scss", foreground: "#C586C0" },
      { token: "selector.css", foreground: "#ffd70b" },
      { token: "variable.scss", foreground: "#9CDCFE" },
      { token: "variable.variable.scss", foreground: "#9CDCFE" },
      { token: "property.scss", foreground: "#9CDCFE" },
      { token: "selector.scss", foreground: "#DCDCAA" },
      { token: "tag.scss", foreground: "#DCDCAA" },
      { token: "attribute.value.scss", foreground: "#CE9178" },
      { token: "keyword.css", foreground: "#C586C0" },
      { token: "variable.css", foreground: "#9CDCFE" },
      { token: "property.css", foreground: "#9CDCFE" },
      { token: "tag.css", foreground: "#ffd70b" },


      // --- JSON 
      { token: "string.key.json", foreground: "#9CDCFE" }, // JSON 键：浅蓝
      { token: "string.value.json", foreground: "#CE9178" }, // JSON 值：浅橙
      { token: "number.json", foreground: "#B5CEA8" },
      { token: "keyword.json", foreground: "#569CD6" }, // true/false/null


      // --- Vue / JSX 混合增强 ---
      { token: "vue.directive", foreground: "#C586C0" }, // v- 关键字偏紫
      { token: "jsx.tag", foreground: "#569CD6" },
      { token: "jsx.tag.component", foreground: "#4EC9B0" }, // React 组件：蓝绿
      { token: "jsx.bracket", foreground: "#808080" }, // < > 符号
    ],
    colors: {
      "editor.background": "#1E1E1E",
      "editor.foreground": "#D4D4D4",
      "editorCursor.foreground": "#AEAFAD",
      "editor.lineHighlightBackground": "#2F3337",
      "editorLineNumber.foreground": "#858585",
      "editorLineNumber.activeForeground": "#C6C6C6",
      "editorIndentGuide.background": "#404040",
      "editorIndentGuide.activeBackground": "#707070",
      "editorWhitespace.foreground": "#333333",
      "editor.selectionBackground": "#264F78",
      "editor.inactiveSelectionBackground": "#3A3D41",
      "editorWidget.background": "#252526",
      "editorWidget.border": "#454545",
      "editorSuggestWidget.background": "#252526",
      "editorSuggestWidget.border": "#454545",
      "editorSuggestWidget.selectedBackground": "#063B49",
      "peekViewResult.background": "#252526",
      "peekViewEditor.background": "#001F33",
      "peekViewTitle.background": "#001F33",
      "list.hoverBackground": "#2A2D2E",
      "list.activeSelectionBackground": "#094771",
      "list.activeSelectionForeground": "#FFFFFF",
    },
  });
}