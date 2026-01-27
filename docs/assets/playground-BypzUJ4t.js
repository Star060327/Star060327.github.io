import { j as o } from './index-PyI2GaQq.js';
function i(n) {
  const e = { h1: 'h1', ...n.components },
    { Playground: t, VuePlayground: r } = e;
  return (
    t || s('Playground'),
    r || s('VuePlayground'),
    o.jsxs(o.Fragment, {
      children: [
        o.jsx(e.h1, { children: 'playground 渲染效果展示' }),
        `
`,
        o.jsx(t, {}),
        `
`,
        o.jsx(r, {})
      ]
    })
  );
}
function u(n = {}) {
  const { wrapper: e } = n.components || {};
  return e ? o.jsx(e, { ...n, children: o.jsx(i, { ...n }) }) : i(n);
}
function s(n, e) {
  throw new Error(
    'Expected component `' +
      n +
      '` to be defined: you likely forgot to import, pass, or provide it.'
  );
}
export { u as default };
