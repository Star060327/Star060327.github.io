// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerReactComments(editor: any, monaco: any) {
  // 仅针对 vue 语言生效
  if (editor.getModel()?.getLanguageId() !== 'jsx') return;
  // 拦截默认注释行为
  editor.addAction({
    id: 'jsx-custom-comment',
    label: 'Toggle Comment',
    // 绑定快捷键 Ctrl+/ 和 Cmd+/
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash],
    // 优先级略高于默认值
    precondition: null,
    keybindingContext: null,
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    run: (ed: any) => {
      const model = ed.getModel();
      const selections = ed.getSelections();
      if (!model || !selections) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const edits: any[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selections.forEach((selection: any) => {
        const startLine = selection.startLineNumber; // 选中区域的起始行号
        const endLine = selection.endLineNumber; // 结束行号

        // 1. 判断上下文
        let context = 'script'; // 默认为 script

        // 简单的上下文推断：向上扫描寻找线索
        for (let i = startLine; i >= 1; i--) {
          const lineContent = model.getLineContent(i).trim();

          // 如果找到 HTML 标签开头，或者是 return (，通常意味着进入了 JSX
          if (
            lineContent.startsWith('<') ||
            lineContent.match(/^return\s*\(\s*$/) ||
            lineContent.endsWith('return (')
          ) {
            context = 'html';
            // 进一步检查：如果行尾是 {，可能又进入了 JS 表达式
            if (lineContent.endsWith('{')) {
              context = 'script';
            }
            break;
          }

          // 如果找到 script 关键字，或者是 } 结尾（通常是代码块结束），意味着是 script
          // 但是要注意 JSX 中的 } 也可能是表达式结束。
          // 这里主要依靠 function/const 等强关键字
          if (
            lineContent.match(/^(function|const|let|var|import|export|class|if|for|while|switch)/)
          ) {
            context = 'script';
            break;
          }

          // 如果是单纯的 } 结尾，很难判断，暂且忽略，继续向上找
        }

        // 特殊情况修正：如果当前行就在 { ... } 内部，上面的逻辑可能会误判。
        // 但对于简单的 Playground 代码，上面的 heuristic 已经比只有 function/return 强很多了。

        // 2. 根据上下文确定注释符号
        let commentStart = '// ';
        let commentEnd = '';

        if (context === 'html') {
          commentStart = '{/* ';
          commentEnd = ' */}';
        }

        // 3. 遍历选区内的每一行进行处理
        for (let i = startLine; i <= endLine; i++) {
          const lineContent = model.getLineContent(i);
          const indent = lineContent.match(/^\s*/)?.[0] || ''; // 缩进
          const trimmedContent = lineContent.trim();

          // 检查是否已注释
          const isCommented =
            context === 'html'
              ? trimmedContent.startsWith(commentStart.trim()) &&
                trimmedContent.endsWith(commentEnd.trim())
              : trimmedContent.startsWith(commentStart.trim());

          if (isCommented) {
            // --- 取消注释 ---
            let newText = lineContent;
            if (context === 'script') {
              // 移除 //
              newText = lineContent.replace(commentStart.trim(), '').replace(/^\s+/, indent);
            } else {
              // 移除 { /* */ }
              // 简单处理：移除开头和结尾的标记
              const inner = trimmedContent
                .substring(
                  commentStart.trim().length,
                  trimmedContent.length - commentEnd.trim().length
                )
                .trim();
              newText = indent + inner;
            }

            edits.push({
              range: new monaco.Range(i, 1, i, lineContent.length + 1),
              text: newText
            });
          } else {
            // --- 添加注释 ---
            // 忽略空行
            if (trimmedContent.length === 0) continue;

            const newText = indent + commentStart + trimmedContent + commentEnd;
            edits.push({
              range: new monaco.Range(i, 1, i, lineContent.length + 1),
              text: newText
            });
          }
        }
      });

      // 4. 执行编辑
      if (edits.length > 0) {
        ed.executeEdits('jsx-custom-comment', edits);
      }
    }
  });
}
