import { e as a, u as i, j as t } from './index-cKcMP2r-.js';
import { C as s } from './index-Chq_vUlP.js';
import { F as r } from './index-CEMeywI4.js';
import { m as n } from './proxy-I7AbdgW-.js';
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const c = [
    ['path', { d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', key: '5wwlr5' }],
    [
      'path',
      {
        d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
        key: 'r6nss1'
      }
    ]
  ],
  d = a('house', c),
  l = '_notFoundContainer_76dof_1',
  m = '_content_76dof_14',
  p = '_errorCode_76dof_21',
  y = '_title_76dof_36',
  _ = '_description_76dof_47',
  u = '_homeButton_76dof_54',
  o = { notFoundContainer: l, content: m, errorCode: p, title: y, description: _, homeButton: u },
  C = () => {
    const e = i();
    return t.jsx(s, {
      children: t.jsxs('div', {
        className: o.notFoundContainer,
        children: [
          t.jsx(r, {}),
          t.jsxs('div', {
            className: o.content,
            children: [
              t.jsx(n.div, {
                className: o.errorCode,
                initial: { opacity: 0, scale: 0.5, rotate: -10 },
                animate: { opacity: 1, scale: 1, rotate: 0 },
                transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.2 },
                children: '404'
              }),
              t.jsx(n.h2, {
                className: o.title,
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4 },
                children: '哎呀，页面迷路了！'
              }),
              t.jsx(n.p, {
                className: o.description,
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.5 },
                children:
                  '您寻找的页面可能已被移除、重命名或暂时不可用。 别担心，您可以返回首页继续探索。'
              }),
              t.jsxs(n.button, {
                className: o.homeButton,
                onClick: () => e('/'),
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.95 },
                transition: { delay: 0.6 },
                children: [t.jsx(d, {}), ' 返回首页']
              })
            ]
          })
        ]
      })
    });
  };
export { C as default };
