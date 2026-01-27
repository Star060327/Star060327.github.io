// 自动补全建议
export interface SuggestItem {
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

// 编译后的文件
export interface CompiledFile {
  code: string;
  css?: string;
  error?: string;
}
// 路径转换后的文件
export interface FileCache {
  code: string;
  css?: string;
  blobUrl: string;
}
