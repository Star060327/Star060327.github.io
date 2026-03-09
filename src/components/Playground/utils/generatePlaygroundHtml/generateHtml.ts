import { IMPORT_JS_MAP } from './data';

export function generateHtml(
  htmlFile: string,
  cssFile: string,
  jsFile: string,
  consoleScript: string
) {
  const importMapTag = `
    <script type="importmap">
      { "imports": ${JSON.stringify(IMPORT_JS_MAP)} }
    </script>
  `;
  const combinedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <base target="_self" />
            <style>${cssFile}</style>
            ${importMapTag}
            ${consoleScript}
          </head>
          <body>
            ${htmlFile}
            <script type="module">
              ${jsFile}
            </script>
          </body>
        </html>
      `;
  return combinedHtml;
}
