import {
  parse,
  compileScript,
  compileStyle,
  compileTemplate,
} from "@vue/compiler-sfc";

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

self.onmessage = (e: MessageEvent) => {
  const { id, code, filename } = e.data as {
    id: string;
    code: string;
    filename: string;
  };

  try {
    const { descriptor, errors } = parse(code, { filename });
    if (errors.length > 0) {
      throw new Error(String(errors[0]));
    }

    const scopeId = hashString(filename).slice(0, 8);
    const css = descriptor.styles
      .map(
        (s) =>
          compileStyle({
            id: scopeId,
            filename,
            source: s.content,
            scoped: s.scoped,
          }).code,
      )
      .join("\n");

    const hasScriptContent =
      (descriptor.script?.content?.trim()?.length ?? 0) > 0 ||
      (descriptor.scriptSetup?.content?.trim()?.length ?? 0) > 0;
    const templateSource = descriptor.template?.content ?? "";
    const hasTemplate = templateSource.trim().length > 0;
    const isScoped = descriptor.styles.some((s) => s.scoped);

    if (!hasScriptContent) {
      if (!hasTemplate) {
        self.postMessage({ id, type: "SUCCESS", code: "export default {}", css });
        return;
      }

      const templateResult = compileTemplate({
        id: scopeId,
        filename,
        source: templateSource,
        scoped: isScoped,
      });
      if (templateResult.errors && templateResult.errors.length > 0) {
        throw new Error(String(templateResult.errors[0]));
      }

      const templateModuleCode = [
        templateResult.code,
        `const __default__ = {};`,
        `__default__.render = render;`,
        `export default __default__;`,
      ].join("\n");

      self.postMessage({ id, type: "SUCCESS", code: templateModuleCode, css });
      return;
    }

    const scriptResult = compileScript(descriptor, {
      id: scopeId,
      inlineTemplate: true,
    });

    self.postMessage({ id, type: "SUCCESS", code: scriptResult.content, css });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    self.postMessage({ id, type: "ERROR", message });
  }
};

