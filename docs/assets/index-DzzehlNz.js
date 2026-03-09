import {
  u as y,
  a as f,
  r as l,
  j as t,
  C as v,
  c as b,
  b as N,
  d as C
} from './index-cKcMP2r-.js';
import { C as S } from './index-Chq_vUlP.js';
import { T as P } from './useTypewriter-BBeqK0Sa.js';
import { u as w } from './useScrollRestore-zFj7vSmD.js';
import { a as $ } from './avatar-D-wMb5lU.js';
import { d as c, C as E } from './data-BKVBUmT7.js';
import { F as I } from './index-CEMeywI4.js';
import { m as r } from './proxy-I7AbdgW-.js';
const T = '_layout_n6imd_1',
  k = '_blog_n6imd_15',
  L = '_pagenation_n6imd_45',
  D = '_date_n6imd_77',
  F = '_btn_n6imd_107',
  R = '_icon_n6imd_116',
  A = '_activePage_n6imd_121',
  B = '_sumup_n6imd_124',
  a = {
    'layout-main-container': '_layout-main-container_n6imd_1',
    layout: T,
    blog: k,
    'blog-left': '_blog-left_n6imd_33',
    pagenation: L,
    'blog-content': '_blog-content_n6imd_55',
    'blog-tag': '_blog-tag_n6imd_68',
    date: D,
    btn: F,
    icon: R,
    activePage: A,
    sumup: B,
    'sumup-top': '_sumup-top_n6imd_144',
    'sumup-content': '_sumup-content_n6imd_145',
    'sumup-top-avatar': '_sumup-top-avatar_n6imd_154',
    'sumup-top-list': '_sumup-top-list_n6imd_166',
    'layout-main': '_layout-main_n6imd_1',
    'layout-main-content': '_layout-main-content_n6imd_222',
    'layout-main-content-header': '_layout-main-content-header_n6imd_228',
    'scroll-indicator': '_scroll-indicator_n6imd_256'
  },
  p = [
    { id: 0, title: 'HTML', count: 0 },
    { id: 1, title: 'CSS', count: 0 },
    { id: 2, title: 'JavaScript', count: 1 },
    { id: 3, title: 'TypeScript', count: 0 },
    { id: 4, title: 'Vue', count: 0 },
    { id: 5, title: 'React', count: 0 },
    { id: 6, title: '技术', count: 2 },
    { id: 7, title: 'md渲染', count: 1 }
  ],
  M = [
    { id: 0, count: c.length, content: '归档' },
    { id: 1, count: p.length, content: '分类' },
    { id: 2, count: 0, content: '标签' }
  ],
  d = 6;
function V() {
  const e = () => {
    const i = document.getElementById('content-start');
    i && i.scrollIntoView({ behavior: 'smooth' });
  };
  return t.jsx(t.Fragment, {
    children: t.jsxs('div', {
      className: a['layout-main'],
      children: [
        t.jsx(I, {}),
        t.jsx('div', {
          className: a['layout-main-content'],
          children: t.jsxs('div', {
            className: a['layout-main-content-header'],
            children: [
              t.jsx(r.h1, {
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, ease: 'easeOut' },
                children: "Star'Blog"
              }),
              t.jsx(r.p, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.5, duration: 0.8 },
                children: t.jsx(P, { text: '种一棵树最好的时间是十年前，其次是现在。', speed: 100 })
              })
            ]
          })
        }),
        t.jsx(r.div, {
          className: a['scroll-indicator'],
          onClick: e,
          initial: { opacity: 0 },
          animate: { opacity: 0.7 },
          transition: { delay: 2, duration: 1 },
          children: t.jsx(C, {})
        })
      ]
    })
  });
}
function K() {
  const e = y(),
    i = f();
  w();
  const [s, u] = l.useState(1),
    m = l.useRef(c.length < 6 ? 1 : Math.ceil(c.length / d));
  function h(n) {
    (u(n),
      requestAnimationFrame(() => {
        const o = document.getElementById('content-start');
        o && o.scrollIntoView({ behavior: 'smooth' });
      }));
  }
  const _ = c.slice((s - 1) * d, s * d);
  function j(n) {
    n === '归档' && e('/file');
  }
  function x() {
    sessionStorage.setItem('curPosition', window.scrollY.toString());
  }
  return (
    l.useEffect(() => {
      if (i.pathname === '/') {
        const n = sessionStorage.getItem('curPosition');
        n &&
          setTimeout(() => {
            window.scrollTo({ top: Number(n), behavior: 'smooth' });
          }, 0);
      }
    }, [i.pathname]),
    t.jsx(t.Fragment, {
      children: t.jsx(S, {
        children: t.jsxs('div', {
          className: a['layout-main-container'],
          children: [
            t.jsx(V, {}),
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
                            children: M.map((n) =>
                              t.jsxs(
                                'li',
                                {
                                  onClick: () => j(n.content),
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
                            children: p.map((n) =>
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
                        children: _.map((n) =>
                          t.jsxs(
                            'li',
                            {
                              onClick: () => {
                                (e(n.path), x());
                              },
                              children: [
                                t.jsx('h3', { children: n.title }),
                                t.jsxs('div', {
                                  className: a['blog-tag'],
                                  children: [
                                    t.jsx('div', { children: n.tags ? n.tags.join(', ') : n.tags }),
                                    t.jsxs('span', {
                                      className: a.date,
                                      children: [
                                        t.jsx(E, { style: { width: 16, height: 16 } }),
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
                              onClick: () => h(s - 1),
                              children: t.jsx(v, { className: a.icon })
                            })
                          }),
                          Array.from({ length: m.current }).map((n, o) =>
                            t.jsx(
                              'li',
                              {
                                className: b(o + 1 === s && a.activePage),
                                onClick: (g) => {
                                  (g.preventDefault(), u(o + 1));
                                },
                                children: o + 1
                              },
                              `${n}-${o}-${n}`
                            )
                          ),
                          t.jsx('li', {
                            children: t.jsx('button', {
                              className: a.btn,
                              disabled: s === m.current,
                              onClick: () => h(s + 1),
                              children: t.jsx(N, { className: a.icon })
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
    })
  );
}
export { K as default };
