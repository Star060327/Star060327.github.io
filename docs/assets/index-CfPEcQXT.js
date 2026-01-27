const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/md-DM-jPg6p.js',
      'assets/index-PyI2GaQq.js',
      'assets/index-pi9srB3x.css',
      'assets/playground-BypzUJ4t.js',
      'assets/虚拟列表-CQRzrEIB.js'
    ])
) => i.map((i) => d[i]);
import {
  d as k,
  f as R,
  u as w,
  r as a,
  j as t,
  N as A,
  m as I,
  c as T,
  _ as h
} from './index-PyI2GaQq.js';
import { C as L } from './index-uIceEDn8.js';
import { u as O } from './useScrollRestore-CN6MUNdt.js';
import { d as x, C as P } from './data-52bNwguq.js';
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const S = [
    ['path', { d: 'm12 19-7-7 7-7', key: '1l729n' }],
    ['path', { d: 'M19 12H5', key: 'x3x0zl' }]
  ],
  M = k('arrow-left', S),
  z = '_w_166ug_16',
  D = '_loading_166ug_74',
  B = '_active_166ug_134',
  l = {
    'blog-container': '_blog-container_166ug_1',
    w: z,
    'blog-header': '_blog-header_166ug_34',
    'blog-meta': '_blog-meta_166ug_41',
    'blog-meta-date': '_blog-meta-date_166ug_50',
    'blog-meta-skill': '_blog-meta-skill_166ug_54',
    'blog-content': '_blog-content_166ug_61',
    loading: D,
    'blog-outline': '_blog-outline_166ug_79',
    'outline-title': '_outline-title_166ug_104',
    'blog-outline-item': '_blog-outline-item_166ug_117',
    active: B,
    'blog-back': '_blog-back_166ug_157',
    'blog-back-icon': '_blog-back-icon_166ug_172'
  },
  v = Object.assign({
    '../../posts/md.mdx': () => h(() => import('./md-DM-jPg6p.js'), __vite__mapDeps([0, 1, 2])),
    '../../posts/playground.mdx': () =>
      h(() => import('./playground-BypzUJ4t.js'), __vite__mapDeps([3, 1, 2])),
    '../../posts/虚拟列表.mdx': () =>
      h(() => import('./虚拟列表-CQRzrEIB.js'), __vite__mapDeps([4, 1, 2]))
  }),
  j = {};
for (const c of Object.keys(v)) {
  const r = c.normalize('NFC').replace('../../posts/', '').replace('.mdx', '');
  j[r] = a.lazy(v[c]);
}
const Y = () => {
  O();
  const { '*': c } = R(),
    _ = w(),
    [r, b] = a.useState(''),
    [i, N] = a.useState([]),
    d = a.useRef(null),
    u = a.useRef(null),
    [m, C] = a.useState(x.find((e) => e.path === c)),
    f = c ? j[decodeURIComponent(c).normalize('NFC')] : null;
  if (
    (a.useEffect(() => {
      const e = '/content/' + c;
      (C(x.find((o) => o.path === e)), console.log(m));
    }, [c]),
    a.useEffect(() => {
      if (!d.current) return;
      const e = () => {
        const n = Array.from(d.current.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((s) => ({
          id: s.id || `heading-${Math.random().toString(36).substring(2, 9)}`,
          level: Number(s.nodeName.charAt(1)),
          text: s.textContent || ''
        }));
        (Array.from(d.current.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach((s, g) => {
          s.id || (s.id = n[g].id);
        }),
          N((s) => (s.length === n.length && s.every((g, p) => g.text === n[p].text) ? s : n)));
      };
      e();
      const o = new MutationObserver(e);
      return (o.observe(d.current, { childList: !0, subtree: !0 }), () => o.disconnect());
    }, [c]),
    a.useEffect(() => {
      if (i.length === 0) return;
      const e = new IntersectionObserver(
        (o) => {
          o.forEach((n) => {
            n.isIntersecting && b(n.target.id);
          });
        },
        { rootMargin: '-10% 0% -80% 0%' }
      );
      return (
        i.forEach((o) => {
          const n = document.getElementById(o.id);
          n && e.observe(n);
        }),
        () => e.disconnect()
      );
    }, [i]),
    a.useEffect(() => {
      if (!r || !u.current) return;
      const o = requestAnimationFrame(() => {
        if (!u.current) return;
        const n = u.current.querySelector(`.${l.active}`);
        if (n instanceof HTMLElement) {
          const s = u.current,
            g = s.getBoundingClientRect(),
            E =
              n.getBoundingClientRect().top -
              g.top +
              s.scrollTop -
              s.clientHeight / 2 +
              n.clientHeight / 2;
          s.scrollTo({ top: Math.max(0, E), behavior: 'smooth' });
        }
      });
      return () => {
        o && cancelAnimationFrame(o);
      };
    }, [r]),
    !f)
  )
    return t.jsx(A, { to: '/not-found' });
  const y = (e, o) => {
    (e.preventDefault(), b(o));
    const n = document.getElementById(o);
    n &&
      requestAnimationFrame(() => {
        (console.log(window.scrollY), console.log(n.getBoundingClientRect().top));
        const s = n.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: s, behavior: 'smooth' });
      });
  };
  return t.jsx(L, {
    children: t.jsxs('div', {
      className: l['blog-container'],
      children: [
        t.jsxs('div', {
          className: l.w,
          children: [
            t.jsxs('header', {
              className: l['blog-header'],
              children: [
                t.jsx('h1', { children: m?.title }),
                t.jsxs('div', {
                  className: l['blog-meta'],
                  children: [
                    t.jsxs('span', {
                      className: l['blog-meta-date'],
                      children: [t.jsx(P, { style: { width: 16, height: 16 } }), ' ', m?.date]
                    }),
                    m?.tags.map((e, o) =>
                      t.jsx('div', { className: l['blog-meta-skill'], children: e }, e + o + '')
                    )
                  ]
                })
              ]
            }),
            t.jsx('button', {
              className: l['blog-back'],
              onClick: (e) => {
                (e.preventDefault(), _('/'));
              },
              children: t.jsx(M, { className: l['blog-back-icon'] })
            }),
            t.jsx('div', {
              className: l['blog-content'],
              ref: d,
              children: t.jsx(a.Suspense, {
                fallback: t.jsx('div', { className: l.loading, children: '加载中...' }),
                children: t.jsx(f, { components: I })
              })
            })
          ]
        }),
        i.length > 0 &&
          t.jsxs('nav', {
            className: l['blog-outline'],
            ref: u,
            children: [
              t.jsx('div', { className: l['outline-title'], children: '目录' }),
              t.jsx('ul', {
                children: i.map((e) =>
                  t.jsx(
                    'li',
                    {
                      className: T(l['blog-outline-item'], { [l.active]: r === e.id }),
                      style: { paddingLeft: `${(e.level - 1) * 0.8}rem` },
                      children: t.jsx('a', {
                        href: `#${e.id}`,
                        onClick: (o) => y(o, e.id),
                        title: e.text,
                        children: e.text
                      })
                    },
                    e.id
                  )
                )
              })
            ]
          })
      ]
    })
  });
};
export { Y as default };
