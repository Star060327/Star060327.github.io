// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerVueComments(editor: any, monaco: any) {
  // 仅针对 vue 语言生效
  if (editor.getModel()?.getLanguageId() !== 'vue') return;
  // 拦截默认注释行为
  editor.addAction({
    id: 'vue-custom-comment',
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
        for (let i = startLine; i >= 1; i--) {
          const lineContent = model.getLineContent(i).trim();
          if (lineContent.startsWith('<template')) {
            context = 'template';
            break;
          } else if (lineContent.startsWith('<style')) {
            context = 'style';
            break;
          } else if (lineContent.startsWith('<script')) {
            context = 'script';
            break;
          }
        }

        // 2. 根据上下文确定注释符号
        let commentStart = '// ';
        let commentEnd = '';

        if (context === 'template') {
          commentStart = '<!-- ';
          commentEnd = ' -->';
        } else if (context === 'style') {
          commentStart = '/* ';
          commentEnd = ' */';
        }

        // 3. 遍历选区内的每一行进行处理
        for (let i = startLine; i <= endLine; i++) {
          const lineContent = model.getLineContent(i);
          const indent = lineContent.match(/^\s*/)?.[0] || ''; // 缩进
          const trimmedContent = lineContent.trim();

          // 检查是否已注释
          const isCommented =
            context === 'template' || context === 'style'
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
              // 移除 <!-- --> 或 /* */
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
        ed.executeEdits('vue-custom-comment', edits);
      }
    }
  });
}
