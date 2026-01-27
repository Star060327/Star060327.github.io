import { u as x, r as m, j as t, C as g, c as y, a as v, b } from './index-PyI2GaQq.js';
import { C as f } from './index-uIceEDn8.js';
import { T as N } from './useTypewriter-B6I_Sbak.js';
import { u as C } from './useScrollRestore-CN6MUNdt.js';
import { a as $ } from './avatar-D-wMb5lU.js';
import { d as o, C as S } from './data-52bNwguq.js';
import { F as P } from './index-izJe2MVJ.js';
import { m as c } from './proxy-BFWg7Ckl.js';
const k = '_layout_n6imd_1',
  E = '_blog_n6imd_15',
  w = '_pagenation_n6imd_45',
  D = '_date_n6imd_77',
  F = '_btn_n6imd_107',
  I = '_icon_n6imd_116',
  L = '_activePage_n6imd_121',
  R = '_sumup_n6imd_124',
  a = {
    'layout-main-container': '_layout-main-container_n6imd_1',
    layout: k,
    blog: E,
    'blog-left': '_blog-left_n6imd_33',
    pagenation: w,
    'blog-content': '_blog-content_n6imd_55',
    'blog-tag': '_blog-tag_n6imd_68',
    date: D,
    btn: F,
    icon: I,
    activePage: L,
    sumup: R,
    'sumup-top': '_sumup-top_n6imd_144',
    'sumup-content': '_sumup-content_n6imd_145',
    'sumup-top-avatar': '_sumup-top-avatar_n6imd_154',
    'sumup-top-list': '_sumup-top-list_n6imd_166',
    'layout-main': '_layout-main_n6imd_1',
    'layout-main-content': '_layout-main-content_n6imd_222',
    'layout-main-content-header': '_layout-main-content-header_n6imd_228',
    'scroll-indicator': '_scroll-indicator_n6imd_256'
  },
  h = [
    { id: 0, title: 'HTML', count: 0 },
    { id: 1, title: 'CSS', count: 0 },
    { id: 2, title: 'JavaScript', count: 0 },
    { id: 3, title: 'TypeScript', count: 0 },
    { id: 4, title: 'Vue', count: 0 },
    { id: 5, title: 'React', count: 0 },
    { id: 6, title: '面试', count: 0 },
    { id: 7, title: 'md渲染', count: 1 }
  ],
  T = [
    { id: 0, count: o.length, content: '归档' },
    { id: 1, count: h.length, content: '分类' },
    { id: 2, count: 0, content: '标签' }
  ],
  l = 6;
function A() {
  const e = () => {
    const s = document.getElementById('content-start');
    s && s.scrollIntoView({ behavior: 'smooth' });
  };
  return t.jsx(t.Fragment, {
    children: t.jsxs('div', {
      className: a['layout-main'],
      children: [
        t.jsx(P, {}),
        t.jsx('div', {
          className: a['layout-main-content'],
          children: t.jsxs('div', {
            className: a['layout-main-content-header'],
            children: [
              t.jsx(c.h1, {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, ease: 'easeOut' },
                children: "Star'Blog"
              }),
              t.jsx(c.p, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.5, duration: 0.8 },
                children: t.jsx(N, { text: '种一棵树最好的时间是十年前，其次是现在。', speed: 100 })
              })
            ]
          })
        }),
        t.jsx(c.div, {
          className: a['scroll-indicator'],
          onClick: e,
          initial: { opacity: 0 },
          animate: { opacity: 0.7 },
          transition: { delay: 2, duration: 1 },
          children: t.jsx(b, {})
        })
      ]
    })
  });
}
function Z() {
  const e = x();
  C();
  const [s, r] = m.useState(1),
    d = m.useRef(o.length < 6 ? 1 : Math.ceil(o.length / l));
  function u(n) {
    (r(n),
      requestAnimationFrame(() => {
        const i = document.getElementById('content-start');
        i && i.scrollIntoView({ behavior: 'smooth' });
      }));
  }
  const p = o.slice((s - 1) * l, s * l);
  function _(n) {
    n === '归档' && e('/file');
  }
  return t.jsx(t.Fragment, {
    children: t.jsx(f, {
      children: t.jsxs('div', {
        className: a['layout-main-container'],
        children: [
          t.jsx(A, {}),
          t.jsx('div', {
            id: 'content-start',
            className: a.layout,
            children: t.jsxs('div', {
              className: a.blog,
              children: [
                t.jsxs('div', {
                  className: a.sumup,
                  children: [
                    t.jsxs('header', {
                      className: a['sumup-top'],
                      children: [
                        t.jsxs('div', {
                          className: a['sumup-top-avatar'],
                          children: [
                            t.jsx('img', { src: $, alt: '头像' }),
                            t.jsx('h2', { children: '徐维斌' })
                          ]
                        }),
                        t.jsx('ul', {
                          className: a['sumup-top-list'],
                          children: T.map((n) =>
                            t.jsxs(
                              'li',
                              {
                                onClick: () => _(n.content),
                                children: [
                                  t.jsx('span', { children: n.count }),
                                  t.jsx('span', { children: n.content })
                                ]
                              },
                              `${n.id}-${n.content}`
                            )
                          )
                        })
                      ]
                    }),
                    t.jsxs('div', {
                      className: a['sumup-content'],
                      children: [
                        t.jsx('h3', { children: '分类' }),
                        t.jsx('ul', {
                          children: h.map((n) =>
                            t.jsxs(
                              'li',
                              {
                                children: [
                                  t.jsx('span', { children: n.title }),
                                  t.jsx('span', { children: n.count })
                                ]
                              },
                              `${n.id}-${n.title}`
                            )
                          )
                        })
                      ]
                    })
                  ]
                }),
                t.jsxs('div', {
                  className: a['blog-left'],
                  children: [
                    t.jsx('ul', {
                      className: a['blog-content'],
                      children: p.map((n) =>
                        t.jsxs(
                          'li',
                          {
                            onClick: () => e(n.path),
                            children: [
                              t.jsx('h3', { children: n.title }),
                              t.jsxs('div', {
                                className: a['blog-tag'],
                                children: [
                                  t.jsx('div', { children: n.tags ? n.tags.join(', ') : n.tags }),
                                  t.jsxs('span', {
                                    className: a.date,
                                    children: [
                                      t.jsx(S, { style: { width: 16, height: 16 } }),
                                      ' ',
                                      n.date
                                    ]
                                  })
                                ]
                              }),
                              t.jsx('p', { children: n.excerpt })
                            ]
                          },
                          `${n.id}-${n.title}`
                        )
                      )
                    }),
                    t.jsxs('ul', {
                      className: a.pagenation,
                      children: [
                        t.jsx('li', {
                          children: t.jsx('button', {
                            className: a.btn,
                            disabled: s === 1,
                            onClick: () => u(s - 1),
                            children: t.jsx(g, { className: a.icon })
                          })
                        }),
                        Array.from({ length: d.current }).map((n, i) =>
                          t.jsx(
                            'li',
                            {
                              className: y(i + 1 === s && a.activePage),
                              onClick: (j) => {
                                (j.preventDefault(), r(i + 1));
                              },
                              children: i + 1
                            },
                            `${n}-${i}-${n}`
                          )
                        ),
                        t.jsx('li', {
                          children: t.jsx('button', {
                            className: a.btn,
                            disabled: s === d.current,
                            onClick: () => u(s + 1),
                            children: t.jsx(v, { className: a.icon })
                          })
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          })
        ]
      })
    })
  });
}
export { Z as default };
