export function generateHtml(
  htmlFile: string,
  cssFile: string,
  jsFile: string,
  consoleScript: string
) {
  const combinedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <base target="_self" />
            <style>${cssFile}</style>
            ${consoleScript}
          </head>
          <body>
            ${htmlFile}
            <script>
              try {
                ${jsFile}
              } catch (err) {
                console.error(err);
              }
            </script>
          </body>
        </html>
      `;
  return combinedHtml;
}
