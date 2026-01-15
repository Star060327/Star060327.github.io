import { r as d, u, j as s } from './index-BR_q8tzi.js';
import { I as h, a5 as f, a4 as j } from './index-BFRsOrW6.js';
import { u as p } from './useScrollRestore-CJovq5Fo.js';
import { d as m, T as x } from './data-C7fG0xXe.js';
import './proxy-D6zHmpbh.js';
var g = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d: 'M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z'
        }
      }
    ]
  },
  name: 'calendar',
  theme: 'outlined'
};
function v() {
  return (
    (v = Object.assign
      ? Object.assign.bind()
      : function (a) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (a[r] = n[r]);
          }
          return a;
        }),
    v.apply(this, arguments)
  );
}
const N = (a, t) => d.createElement(h, v({}, a, { ref: t, icon: g })),
  w = d.forwardRef(N);
var y = {
  icon: {
    tag: 'svg',
    attrs: { viewBox: '64 64 896 896', focusable: 'false' },
    children: [
      {
        tag: 'path',
        attrs: {
          d: 'M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 000 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM459.7 834.7L189.3 564.3 589 164.6 836 188l23.4 247-399.7 399.7zM680 256c-48.5 0-88 39.5-88 88s39.5 88 88 88 88-39.5 88-88-39.5-88-88-88zm0 120c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z'
        }
      }
    ]
  },
  name: 'tag',
  theme: 'outlined'
};
function _() {
  return (
    (_ = Object.assign
      ? Object.assign.bind()
      : function (a) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (a[r] = n[r]);
          }
          return a;
        }),
    _.apply(this, arguments)
  );
}
const O = (a, t) => d.createElement(h, _({}, a, { ref: t, icon: y })),
  z = d.forwardRef(O),
  M = '_w_scbbv_9',
  R = '_header_scbbv_13',
  T = '_subtitle_scbbv_23',
  E = '_count_scbbv_42',
  H = '_label_scbbv_48',
  I = '_timeline_scbbv_53',
  L = '_info_scbbv_129',
  $ = '_title_scbbv_133',
  C = '_meta_scbbv_140',
  D = '_date_scbbv_147',
  P = '_tag_scbbv_152',
  V = '_arrow_scbbv_159',
  e = {
    'file-container': '_file-container_scbbv_1',
    w: M,
    header: R,
    subtitle: T,
    'stats-container': '_stats-container_scbbv_29',
    'stat-item': '_stat-item_scbbv_35',
    count: E,
    label: H,
    timeline: I,
    'year-group': '_year-group_scbbv_67',
    'year-title': '_year-title_scbbv_71',
    'article-list': '_article-list_scbbv_94',
    'article-item': '_article-item_scbbv_99',
    'article-card': '_article-card_scbbv_117',
    info: L,
    title: $,
    meta: C,
    date: D,
    tag: P,
    arrow: V
  };
function G() {
  p();
  const a = u(),
    t = d.useMemo(() => {
      const c = new Map();
      [...m]
        .sort((l, i) => new Date(i.date).getTime() - new Date(l.date).getTime())
        .forEach((l) => {
          const i = l.date.split('-')[0];
          (c.has(i) || c.set(i, []), c.get(i)?.push(l));
        });
      const b = [];
      return (
        c.forEach((l, i) => {
          b.push({ year: i, list: l });
        }),
        b.sort((l, i) => Number(i.year) - Number(l.year))
      );
    }, []),
    n = m.length,
    r = new Set(m.flatMap((c) => c.tags)).size;
  return s.jsx(f, {
    children: s.jsx('div', {
      className: e['file-container'],
      children: s.jsxs('div', {
        className: e.w,
        children: [
          s.jsxs('div', {
            className: e.header,
            children: [
              s.jsx('h1', { children: '文章归档' }),
              s.jsx('p', {
                className: e.subtitle,
                children: s.jsx(x, { text: '时间的足迹，成长的见证' })
              }),
              s.jsxs('div', {
                className: e['stats-container'],
                children: [
                  s.jsxs('div', {
                    className: e['stat-item'],
                    children: [
                      s.jsx('span', { className: e.count, children: n }),
                      s.jsx('span', { className: e.label, children: '文章总数' })
                    ]
                  }),
                  s.jsxs('div', {
                    className: e['stat-item'],
                    children: [
                      s.jsx('span', { className: e.count, children: r }),
                      s.jsx('span', { className: e.label, children: '标签总数' })
                    ]
                  })
                ]
              })
            ]
          }),
          s.jsx('div', {
            className: e.timeline,
            children: t.map((c) =>
              s.jsxs(
                'div',
                {
                  className: e['year-group'],
                  children: [
                    s.jsx('div', { className: e['year-title'], children: c.year }),
                    s.jsx('div', {
                      className: e['article-list'],
                      children: c.list.map((o) =>
                        s.jsx(
                          'div',
                          {
                            className: e['article-item'],
                            children: s.jsxs('div', {
                              className: e['article-card'],
                              onClick: () => a(o.path),
                              children: [
                                s.jsxs('div', {
                                  className: e.info,
                                  children: [
                                    s.jsx('div', { className: e.title, children: o.title }),
                                    s.jsxs('div', {
                                      className: e.meta,
                                      children: [
                                        s.jsxs('span', {
                                          className: e.date,
                                          children: [s.jsx(w, {}), o.date]
                                        }),
                                        s.jsxs('span', {
                                          className: e.tag,
                                          children: [s.jsx(z, {}), ' ', o.tags.join(', ')]
                                        })
                                      ]
                                    })
                                  ]
                                }),
                                s.jsx('div', { className: e.arrow, children: s.jsx(j, {}) })
                              ]
                            })
                          },
                          o.id
                        )
                      )
                    })
                  ]
                },
                c.year
              )
            )
          })
        ]
      })
    })
  });
}
export { G as default };
