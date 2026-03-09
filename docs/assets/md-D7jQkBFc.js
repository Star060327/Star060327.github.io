import { j as s } from './index-cKcMP2r-.js';
function n(l) {
  const e = {
    a: 'a',
    annotation: 'annotation',
    blockquote: 'blockquote',
    code: 'code',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    hr: 'hr',
    img: 'img',
    input: 'input',
    li: 'li',
    mark: 'mark',
    math: 'math',
    mfrac: 'mfrac',
    mi: 'mi',
    mn: 'mn',
    mo: 'mo',
    mrow: 'mrow',
    msqrt: 'msqrt',
    msubsup: 'msubsup',
    msup: 'msup',
    ol: 'ol',
    p: 'p',
    path: 'path',
    pre: 'pre',
    semantics: 'semantics',
    span: 'span',
    strong: 'strong',
    svg: 'svg',
    table: 'table',
    tbody: 'tbody',
    td: 'td',
    th: 'th',
    thead: 'thead',
    tr: 'tr',
    ul: 'ul',
    ...l.components
  };
  return s.jsxs(s.Fragment, {
    children: [
      s.jsx(e.h1, { children: 'Markdown 渲染效果展示' }),
      `
`,
      s.jsx(e.p, {
        children:
          '这篇文章展示了我们博客平台强大的 Markdown 渲染能力。让我们一起来看看各种元素的渲染效果！ 🚀'
      }),
      `
`,
      s.jsx(e.h2, { children: '代码高亮' }),
      `
`,
      s.jsx(e.p, { children: s.jsx(e.mark, { children: '11' }) }),
      `
`,
      s.jsx(e.h3, { children: 'JavaScript 代码' }),
      `
`,
      s.jsx(e.pre, {
        children: s.jsx(e.code, {
          className: 'language-javascript',
          meta: '{2,5-6}',
          children: `// React 函数组件示例
const BlogPost = ({ title, content }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('组件已挂载');
    return () => console.log('组件将卸载');
  }, []);

  return (
    <article className="blog-post">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPost;
`
        })
      }),
      `
`,
      s.jsx(e.pre, {
        children: s.jsx(e.code, {
          className: 'language-javascript',
          children: `console.log('这是 JavaScript 代码中的控制台输出');
`
        })
      }),
      `
`,
      s.jsx(e.pre, {
        children: s.jsx(e.code, {
          className: 'language-python',
          children: `print("这是 Python 代码中的输出")
`
        })
      }),
      `
`,
      s.jsx(e.pre, {
        children: s.jsx(e.code, {
          className: 'language-python',
          children: `# 数据分析示例
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

def analyze_data(data_path):
    """分析数据并返回统计信息"""
    df = pd.read_csv(data_path)

    # 基本统计信息
    stats = {
        'shape': df.shape,
        'missing_values': df.isnull().sum(),
        'data_types': df.dtypes
    }

    return stats

# 使用示例
if __name__ == "__main__":
    result = analyze_data('data.csv')
    print(f"数据形状: {result['shape']}")
`
        })
      }),
      `
`,
      s.jsx(e.h2, { children: '数学公式' }),
      `
`,
      s.jsx(e.h3, { children: '行内公式' }),
      `
`,
      s.jsxs(e.p, {
        children: [
          '这是一个行内公式：',
          s.jsxs(e.span, {
            className: 'katex',
            children: [
              s.jsx(e.span, {
                className: 'katex-mathml',
                children: s.jsx(e.math, {
                  xmlns: 'http://www.w3.org/1998/Math/MathML',
                  children: s.jsxs(e.semantics, {
                    children: [
                      s.jsxs(e.mrow, {
                        children: [
                          s.jsx(e.mi, { children: 'E' }),
                          s.jsx(e.mo, { children: '=' }),
                          s.jsx(e.mi, { children: 'm' }),
                          s.jsxs(e.msup, {
                            children: [
                              s.jsx(e.mi, { children: 'c' }),
                              s.jsx(e.mn, { children: '2' })
                            ]
                          })
                        ]
                      }),
                      s.jsx(e.annotation, { encoding: 'application/x-tex', children: 'E = mc^2' })
                    ]
                  })
                })
              }),
              s.jsxs(e.span, {
                className: 'katex-html',
                'aria-hidden': 'true',
                children: [
                  s.jsxs(e.span, {
                    className: 'base',
                    children: [
                      s.jsx(e.span, { className: 'strut', style: { height: '0.6833em' } }),
                      s.jsx(e.span, {
                        className: 'mord mathnormal',
                        style: { marginRight: '0.05764em' },
                        children: 'E'
                      }),
                      s.jsx(e.span, { className: 'mspace', style: { marginRight: '0.2778em' } }),
                      s.jsx(e.span, { className: 'mrel', children: '=' }),
                      s.jsx(e.span, { className: 'mspace', style: { marginRight: '0.2778em' } })
                    ]
                  }),
                  s.jsxs(e.span, {
                    className: 'base',
                    children: [
                      s.jsx(e.span, { className: 'strut', style: { height: '0.8141em' } }),
                      s.jsx(e.span, { className: 'mord mathnormal', children: 'm' }),
                      s.jsxs(e.span, {
                        className: 'mord',
                        children: [
                          s.jsx(e.span, { className: 'mord mathnormal', children: 'c' }),
                          s.jsx(e.span, {
                            className: 'msupsub',
                            children: s.jsx(e.span, {
                              className: 'vlist-t',
                              children: s.jsx(e.span, {
                                className: 'vlist-r',
                                children: s.jsx(e.span, {
                                  className: 'vlist',
                                  style: { height: '0.8141em' },
                                  children: s.jsxs(e.span, {
                                    style: { top: '-3.063em', marginRight: '0.05em' },
                                    children: [
                                      s.jsx(e.span, {
                                        className: 'pstrut',
                                        style: { height: '2.7em' }
                                      }),
                                      s.jsx(e.span, {
                                        className: 'sizing reset-size6 size3 mtight',
                                        children: s.jsx(e.span, {
                                          className: 'mord mtight',
                                          children: '2'
                                        })
                                      })
                                    ]
                                  })
                                })
                              })
                            })
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          '，爱因斯坦的质能方程。'
        ]
      }),
      `
`,
      s.jsx(e.h3, { children: '块级公式' }),
      `
`,
      s.jsx(e.p, { children: '二次方程的解：' }),
      `
`,
      s.jsx(e.span, {
        className: 'katex-display',
        children: s.jsxs(e.span, {
          className: 'katex',
          children: [
            s.jsx(e.span, {
              className: 'katex-mathml',
              children: s.jsx(e.math, {
                xmlns: 'http://www.w3.org/1998/Math/MathML',
                display: 'block',
                children: s.jsxs(e.semantics, {
                  children: [
                    s.jsxs(e.mrow, {
                      children: [
                        s.jsx(e.mi, { children: 'x' }),
                        s.jsx(e.mo, { children: '=' }),
                        s.jsxs(e.mfrac, {
                          children: [
                            s.jsxs(e.mrow, {
                              children: [
                                s.jsx(e.mo, { children: '−' }),
                                s.jsx(e.mi, { children: 'b' }),
                                s.jsx(e.mo, { children: '±' }),
                                s.jsx(e.msqrt, {
                                  children: s.jsxs(e.mrow, {
                                    children: [
                                      s.jsxs(e.msup, {
                                        children: [
                                          s.jsx(e.mi, { children: 'b' }),
                                          s.jsx(e.mn, { children: '2' })
                                        ]
                                      }),
                                      s.jsx(e.mo, { children: '−' }),
                                      s.jsx(e.mn, { children: '4' }),
                                      s.jsx(e.mi, { children: 'a' }),
                                      s.jsx(e.mi, { children: 'c' })
                                    ]
                                  })
                                })
                              ]
                            }),
                            s.jsxs(e.mrow, {
                              children: [
                                s.jsx(e.mn, { children: '2' }),
                                s.jsx(e.mi, { children: 'a' })
                              ]
                            })
                          ]
                        })
                      ]
                    }),
                    s.jsx(e.annotation, {
                      encoding: 'application/x-tex',
                      children: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'
                    })
                  ]
                })
              })
            }),
            s.jsxs(e.span, {
              className: 'katex-html',
              'aria-hidden': 'true',
              children: [
                s.jsxs(e.span, {
                  className: 'base',
                  children: [
                    s.jsx(e.span, { className: 'strut', style: { height: '0.4306em' } }),
                    s.jsx(e.span, { className: 'mord mathnormal', children: 'x' }),
                    s.jsx(e.span, { className: 'mspace', style: { marginRight: '0.2778em' } }),
                    s.jsx(e.span, { className: 'mrel', children: '=' }),
                    s.jsx(e.span, { className: 'mspace', style: { marginRight: '0.2778em' } })
                  ]
                }),
                s.jsxs(e.span, {
                  className: 'base',
                  children: [
                    s.jsx(e.span, {
                      className: 'strut',
                      style: { height: '2.2764em', verticalAlign: '-0.686em' }
                    }),
                    s.jsxs(e.span, {
                      className: 'mord',
                      children: [
                        s.jsx(e.span, { className: 'mopen nulldelimiter' }),
                        s.jsx(e.span, {
                          className: 'mfrac',
                          children: s.jsxs(e.span, {
                            className: 'vlist-t vlist-t2',
                            children: [
                              s.jsxs(e.span, {
                                className: 'vlist-r',
                                children: [
                                  s.jsxs(e.span, {
                                    className: 'vlist',
                                    style: { height: '1.5904em' },
                                    children: [
                                      s.jsxs(e.span, {
                                        style: { top: '-2.314em' },
                                        children: [
                                          s.jsx(e.span, {
                                            className: 'pstrut',
                                            style: { height: '3em' }
                                          }),
                                          s.jsxs(e.span, {
                                            className: 'mord',
                                            children: [
                                              s.jsx(e.span, { className: 'mord', children: '2' }),
                                              s.jsx(e.span, {
                                                className: 'mord mathnormal',
                                                children: 'a'
                                              })
                                            ]
                                          })
                                        ]
                                      }),
                                      s.jsxs(e.span, {
                                        style: { top: '-3.23em' },
                                        children: [
                                          s.jsx(e.span, {
                                            className: 'pstrut',
                                            style: { height: '3em' }
                                          }),
                                          s.jsx(e.span, {
                                            className: 'frac-line',
                                            style: { borderBottomWidth: '0.04em' }
                                          })
                                        ]
                                      }),
                                      s.jsxs(e.span, {
                                        style: { top: '-3.677em' },
                                        children: [
                                          s.jsx(e.span, {
                                            className: 'pstrut',
                                            style: { height: '3em' }
                                          }),
                                          s.jsxs(e.span, {
                                            className: 'mord',
                                            children: [
                                              s.jsx(e.span, { className: 'mord', children: '−' }),
                                              s.jsx(e.span, {
                                                className: 'mord mathnormal',
                                                children: 'b'
                                              }),
                                              s.jsx(e.span, {
                                                className: 'mspace',
                                                style: { marginRight: '0.2222em' }
                                              }),
                                              s.jsx(e.span, { className: 'mbin', children: '±' }),
                                              s.jsx(e.span, {
                                                className: 'mspace',
                                                style: { marginRight: '0.2222em' }
                                              }),
                                              s.jsx(e.span, {
                                                className: 'mord sqrt',
                                                children: s.jsxs(e.span, {
                                                  className: 'vlist-t vlist-t2',
                                                  children: [
                                                    s.jsxs(e.span, {
                                                      className: 'vlist-r',
                                                      children: [
                                                        s.jsxs(e.span, {
                                                          className: 'vlist',
                                                          style: { height: '0.9134em' },
                                                          children: [
                                                            s.jsxs(e.span, {
                                                              className: 'svg-align',
                                                              style: { top: '-3em' },
                                                              children: [
                                                                s.jsx(e.span, {
                                                                  className: 'pstrut',
                                                                  style: { height: '3em' }
                                                                }),
                                                                s.jsxs(e.span, {
                                                                  className: 'mord',
                                                                  style: { paddingLeft: '0.833em' },
                                                                  children: [
                                                                    s.jsxs(e.span, {
                                                                      className: 'mord',
                                                                      children: [
                                                                        s.jsx(e.span, {
                                                                          className:
                                                                            'mord mathnormal',
                                                                          children: 'b'
                                                                        }),
                                                                        s.jsx(e.span, {
                                                                          className: 'msupsub',
                                                                          children: s.jsx(e.span, {
                                                                            className: 'vlist-t',
                                                                            children: s.jsx(
                                                                              e.span,
                                                                              {
                                                                                className:
                                                                                  'vlist-r',
                                                                                children: s.jsx(
                                                                                  e.span,
                                                                                  {
                                                                                    className:
                                                                                      'vlist',
                                                                                    style: {
                                                                                      height:
                                                                                        '0.7401em'
                                                                                    },
                                                                                    children:
                                                                                      s.jsxs(
                                                                                        e.span,
                                                                                        {
                                                                                          style: {
                                                                                            top: '-2.989em',
                                                                                            marginRight:
                                                                                              '0.05em'
                                                                                          },
                                                                                          children:
                                                                                            [
                                                                                              s.jsx(
                                                                                                e.span,
                                                                                                {
                                                                                                  className:
                                                                                                    'pstrut',
                                                                                                  style:
                                                                                                    {
                                                                                                      height:
                                                                                                        '2.7em'
                                                                                                    }
                                                                                                }
                                                                                              ),
                                                                                              s.jsx(
                                                                                                e.span,
                                                                                                {
                                                                                                  className:
                                                                                                    'sizing reset-size6 size3 mtight',
                                                                                                  children:
                                                                                                    s.jsx(
                                                                                                      e.span,
                                                                                                      {
                                                                                                        className:
                                                                                                          'mord mtight',
                                                                                                        children:
                                                                                                          '2'
                                                                                                      }
                                                                                                    )
                                                                                                }
                                                                                              )
                                                                                            ]
                                                                                        }
                                                                                      )
                                                                                  }
                                                                                )
                                                                              }
                                                                            )
                                                                          })
                                                                        })
                                                                      ]
                                                                    }),
                                                                    s.jsx(e.span, {
                                                                      className: 'mspace',
                                                                      style: {
                                                                        marginRight: '0.2222em'
                                                                      }
                                                                    }),
                                                                    s.jsx(e.span, {
                                                                      className: 'mbin',
                                                                      children: '−'
                                                                    }),
                                                                    s.jsx(e.span, {
                                                                      className: 'mspace',
                                                                      style: {
                                                                        marginRight: '0.2222em'
                                                                      }
                                                                    }),
                                                                    s.jsx(e.span, {
                                                                      className: 'mord',
                                                                      children: '4'
                                                                    }),
                                                                    s.jsx(e.span, {
                                                                      className: 'mord mathnormal',
                                                                      children: 'a'
                                                                    }),
                                                                    s.jsx(e.span, {
                                                                      className: 'mord mathnormal',
                                                                      children: 'c'
                                                                    })
                                                                  ]
                                                                })
                                                              ]
                                                            }),
                                                            s.jsxs(e.span, {
                                                              style: { top: '-2.8734em' },
                                                              children: [
                                                                s.jsx(e.span, {
                                                                  className: 'pstrut',
                                                                  style: { height: '3em' }
                                                                }),
                                                                s.jsx(e.span, {
                                                                  className: 'hide-tail',
                                                                  style: {
                                                                    minWidth: '0.853em',
                                                                    height: '1.08em'
                                                                  },
                                                                  children: s.jsx(e.svg, {
                                                                    xmlns:
                                                                      'http://www.w3.org/2000/svg',
                                                                    width: '400em',
                                                                    height: '1.08em',
                                                                    viewBox: '0 0 400000 1080',
                                                                    preserveAspectRatio:
                                                                      'xMinYMin slice',
                                                                    children: s.jsx(e.path, {
                                                                      d: `M95,702
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l0 -0
c5.3,-9.3,12,-14,20,-14
H400000v40H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M834 80h400000v40h-400000z`
                                                                    })
                                                                  })
                                                                })
                                                              ]
                                                            })
                                                          ]
                                                        }),
                                                        s.jsx(e.span, {
                                                          className: 'vlist-s',
                                                          children: '​'
                                                        })
                                                      ]
                                                    }),
                                                    s.jsx(e.span, {
                                                      className: 'vlist-r',
                                                      children: s.jsx(e.span, {
                                                        className: 'vlist',
                                                        style: { height: '0.1266em' },
                                                        children: s.jsx(e.span, {})
                                                      })
                                                    })
                                                  ]
                                                })
                                              })
                                            ]
                                          })
                                        ]
                                      })
                                    ]
                                  }),
                                  s.jsx(e.span, { className: 'vlist-s', children: '​' })
                                ]
                              }),
                              s.jsx(e.span, {
                                className: 'vlist-r',
                                children: s.jsx(e.span, {
                                  className: 'vlist',
                                  style: { height: '0.686em' },
                                  children: s.jsx(e.span, {})
                                })
                              })
                            ]
                          })
                        }),
                        s.jsx(e.span, { className: 'mclose nulldelimiter' })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      }),
      `
`,
      s.jsx(e.p, { children: '傅里叶变换：' }),
      `
`,
      s.jsx(e.span, {
        className: 'katex-display',
        children: s.jsxs(e.span, {
          className: 'katex',
          children: [
            s.jsx(e.span, {
              className: 'katex-mathml',
              children: s.jsx(e.math, {
                xmlns: 'http://www.w3.org/1998/Math/MathML',
                display: 'block',
                children: s.jsxs(e.semantics, {
                  children: [
                    s.jsxs(e.mrow, {
                      children: [
                        s.jsx(e.mi, { children: 'F' }),
                        s.jsx(e.mo, { stretchy: 'false', children: '(' }),
                        s.jsx(e.mi, { children: 'ω' }),
                        s.jsx(e.mo, { stretchy: 'false', children: ')' }),
                        s.jsx(e.mo, { children: '=' }),
                        s.jsxs(e.msubsup, {
                          children: [
                            s.jsx(e.mo, { children: '∫' }),
                            s.jsxs(e.mrow, {
                              children: [
                                s.jsx(e.mo, { children: '−' }),
                                s.jsx(e.mi, { mathvariant: 'normal', children: '∞' })
                              ]
                            }),
                            s.jsx(e.mi, { mathvariant: 'normal', children: '∞' })
                          ]
                        }),
                        s.jsx(e.mi, { children: 'f' }),
                        s.jsx(e.mo, { stretchy: 'false', children: '(' }),
                        s.jsx(e.mi, { children: 't' }),
                        s.jsx(e.mo, { stretchy: 'false', children: ')' }),
                        s.jsxs(e.msup, {
                          children: [
                            s.jsx(e.mi, { children: 'e' }),
                            s.jsxs(e.mrow, {
                              children: [
                                s.jsx(e.mo, { children: '−' }),
                                s.jsx(e.mi, { children: 'i' }),
                                s.jsx(e.mi, { children: 'ω' }),
                                s.jsx(e.mi, { children: 't' })
                              ]
                            })
                          ]
                        }),
                        s.jsx(e.mi, { children: 'd' }),
                        s.jsx(e.mi, { children: 't' })
                      ]
                    }),
                    s.jsx(e.annotation, {
                      encoding: 'application/x-tex',
                      children: 'F(\\omega) = \\int_{-\\infty}^{\\infty} f(t)e^{-i\\omega t} dt'
                    })
                  ]
                })
              })
            }),
            s.jsxs(e.span, {
              className: 'katex-html',
              'aria-hidden': 'true',
              children: [
                s.jsxs(e.span, {
                  className: 'base',
                  children: [
                    s.jsx(e.span, {
                      className: 'strut',
                      style: { height: '1em', verticalAlign: '-0.25em' }
                    }),
                    s.jsx(e.span, {
                      className: 'mord mathnormal',
                      style: { marginRight: '0.13889em' },
                      children: 'F'
                    }),
                    s.jsx(e.span, { className: 'mopen', children: '(' }),
                    s.jsx(e.span, {
                      className: 'mord mathnormal',
                      style: { marginRight: '0.03588em' },
                      children: 'ω'
                    }),
                    s.jsx(e.span, { className: 'mclose', children: ')' }),
                    s.jsx(e.span, { className: 'mspace', style: { marginRight: '0.2778em' } }),
                    s.jsx(e.span, { className: 'mrel', children: '=' }),
                    s.jsx(e.span, { className: 'mspace', style: { marginRight: '0.2778em' } })
                  ]
                }),
                s.jsxs(e.span, {
                  className: 'base',
                  children: [
                    s.jsx(e.span, {
                      className: 'strut',
                      style: { height: '2.3846em', verticalAlign: '-0.9703em' }
                    }),
                    s.jsxs(e.span, {
                      className: 'mop',
                      children: [
                        s.jsx(e.span, {
                          className: 'mop op-symbol large-op',
                          style: {
                            marginRight: '0.44445em',
                            position: 'relative',
                            top: '-0.0011em'
                          },
                          children: '∫'
                        }),
                        s.jsx(e.span, {
                          className: 'msupsub',
                          children: s.jsxs(e.span, {
                            className: 'vlist-t vlist-t2',
                            children: [
                              s.jsxs(e.span, {
                                className: 'vlist-r',
                                children: [
                                  s.jsxs(e.span, {
                                    className: 'vlist',
                                    style: { height: '1.4143em' },
                                    children: [
                                      s.jsxs(e.span, {
                                        style: {
                                          top: '-1.7881em',
                                          marginLeft: '-0.4445em',
                                          marginRight: '0.05em'
                                        },
                                        children: [
                                          s.jsx(e.span, {
                                            className: 'pstrut',
                                            style: { height: '2.7em' }
                                          }),
                                          s.jsx(e.span, {
                                            className: 'sizing reset-size6 size3 mtight',
                                            children: s.jsxs(e.span, {
                                              className: 'mord mtight',
                                              children: [
                                                s.jsx(e.span, {
                                                  className: 'mord mtight',
                                                  children: '−'
                                                }),
                                                s.jsx(e.span, {
                                                  className: 'mord mtight',
                                                  children: '∞'
                                                })
                                              ]
                                            })
                                          })
                                        ]
                                      }),
                                      s.jsxs(e.span, {
                                        style: { top: '-3.8129em', marginRight: '0.05em' },
                                        children: [
                                          s.jsx(e.span, {
                                            className: 'pstrut',
                                            style: { height: '2.7em' }
                                          }),
                                          s.jsx(e.span, {
                                            className: 'sizing reset-size6 size3 mtight',
                                            children: s.jsx(e.span, {
                                              className: 'mord mtight',
                                              children: s.jsx(e.span, {
                                                className: 'mord mtight',
                                                children: '∞'
                                              })
                                            })
                                          })
                                        ]
                                      })
                                    ]
                                  }),
                                  s.jsx(e.span, { className: 'vlist-s', children: '​' })
                                ]
                              }),
                              s.jsx(e.span, {
                                className: 'vlist-r',
                                children: s.jsx(e.span, {
                                  className: 'vlist',
                                  style: { height: '0.9703em' },
                                  children: s.jsx(e.span, {})
                                })
                              })
                            ]
                          })
                        })
                      ]
                    }),
                    s.jsx(e.span, { className: 'mspace', style: { marginRight: '0.1667em' } }),
                    s.jsx(e.span, {
                      className: 'mord mathnormal',
                      style: { marginRight: '0.10764em' },
                      children: 'f'
                    }),
                    s.jsx(e.span, { className: 'mopen', children: '(' }),
                    s.jsx(e.span, { className: 'mord mathnormal', children: 't' }),
                    s.jsx(e.span, { className: 'mclose', children: ')' }),
                    s.jsxs(e.span, {
                      className: 'mord',
                      children: [
                        s.jsx(e.span, { className: 'mord mathnormal', children: 'e' }),
                        s.jsx(e.span, {
                          className: 'msupsub',
                          children: s.jsx(e.span, {
                            className: 'vlist-t',
                            children: s.jsx(e.span, {
                              className: 'vlist-r',
                              children: s.jsx(e.span, {
                                className: 'vlist',
                                style: { height: '0.8747em' },
                                children: s.jsxs(e.span, {
                                  style: { top: '-3.113em', marginRight: '0.05em' },
                                  children: [
                                    s.jsx(e.span, {
                                      className: 'pstrut',
                                      style: { height: '2.7em' }
                                    }),
                                    s.jsx(e.span, {
                                      className: 'sizing reset-size6 size3 mtight',
                                      children: s.jsxs(e.span, {
                                        className: 'mord mtight',
                                        children: [
                                          s.jsx(e.span, {
                                            className: 'mord mtight',
                                            children: '−'
                                          }),
                                          s.jsx(e.span, {
                                            className: 'mord mathnormal mtight',
                                            style: { marginRight: '0.03588em' },
                                            children: 'iω'
                                          }),
                                          s.jsx(e.span, {
                                            className: 'mord mathnormal mtight',
                                            children: 't'
                                          })
                                        ]
                                      })
                                    })
                                  ]
                                })
                              })
                            })
                          })
                        })
                      ]
                    }),
                    s.jsx(e.span, { className: 'mord mathnormal', children: 'd' }),
                    s.jsx(e.span, { className: 'mord mathnormal', children: 't' })
                  ]
                })
              ]
            })
          ]
        })
      }),
      `
`,
      s.jsx(e.h2, { children: '表格展示' }),
      `
`,
      s.jsx(e.h3, { children: '技术栈对比' }),
      `
`,
      s.jsxs(e.table, {
        children: [
          s.jsx(e.thead, {
            children: s.jsxs(e.tr, {
              children: [
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '框架' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '语言' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '性能' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '学习曲线' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '生态系统' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '推荐指数' })
              ]
            })
          }),
          s.jsxs(e.tbody, {
            children: [
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'React' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'JavaScript' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐⭐' })
                ]
              }),
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'Vue.js' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'JavaScript' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐' })
                ]
              }),
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'Angular' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'TypeScript' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐' })
                ]
              }),
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'Svelte' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'JavaScript' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '⭐⭐⭐⭐' })
                ]
              })
            ]
          })
        ]
      }),
      `
`,
      s.jsx(e.h3, { children: '项目进度表' }),
      `
`,
      s.jsxs(e.table, {
        children: [
          s.jsx(e.thead, {
            children: s.jsxs(e.tr, {
              children: [
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '阶段' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '开始日期' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '结束日期' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '状态' }),
                s.jsx(e.th, { style: { textAlign: 'left' }, children: '负责人' })
              ]
            })
          }),
          s.jsxs(e.tbody, {
            children: [
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '需求分析' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '2024-01-01' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '2024-01-07' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '✅ 完成' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '张三' })
                ]
              }),
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: 'UI 设计' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '2024-01-08' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '2024-01-15' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '✅ 完成' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '李四' })
                ]
              }),
              s.jsxs(e.tr, {
                children: [
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '前端开发' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '2024-01-16' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '2024-02-15' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '🔄 进行中' }),
                  s.jsx(e.td, { style: { textAlign: 'left' }, children: '王五' })
                ]
              })
            ]
          })
        ]
      }),
      `
`,
      s.jsx(e.h2, { children: '引用块' }),
      `
`,
      s.jsxs(e.blockquote, {
        children: [
          `
`,
          s.jsx(e.p, { children: s.jsx(e.strong, { children: '重要提示' }) }),
          `
`,
          s.jsx(e.p, {
            children: '这是一个重要的引用块。它可以用来突出显示重要信息、警告或者引用他人的话。'
          }),
          `
`,
          s.jsx(e.p, { children: '引用块支持多行内容，并且可以包含其他 Markdown 元素。' }),
          `
`
        ]
      }),
      `
`,
      s.jsxs(e.blockquote, {
        children: [
          `
`,
          s.jsxs(e.p, { children: ['📖 ', s.jsx(e.strong, { children: '学习建议' })] }),
          `
`,
          s.jsx(e.p, { children: '在学习新技术时，建议采用以下步骤：' }),
          `
`,
          s.jsxs(e.ol, {
            children: [
              `
`,
              s.jsx(e.li, { children: '理解基本概念' }),
              `
`,
              s.jsx(e.li, { children: '动手实践' }),
              `
`,
              s.jsx(e.li, { children: '阅读官方文档' }),
              `
`,
              s.jsx(e.li, { children: '参与社区讨论' }),
              `
`
            ]
          }),
          `
`
        ]
      }),
      `
`,
      s.jsx(e.h2, { children: '列表' }),
      `
`,
      s.jsx(e.h3, { children: '无序列表' }),
      `
`,
      s.jsxs(e.ul, {
        children: [
          `
`,
          s.jsxs(e.li, {
            children: ['🎯 ', s.jsx(e.strong, { children: '目标明确' }), '：设定清晰的学习目标']
          }),
          `
`,
          s.jsxs(e.li, {
            children: ['📅 ', s.jsx(e.strong, { children: '计划合理' }), '：制定可执行的学习计划']
          }),
          `
`,
          s.jsxs(e.li, {
            children: ['💪 ', s.jsx(e.strong, { children: '持续练习' }), '：通过实践巩固知识']
          }),
          `
`,
          s.jsxs(e.li, {
            children: ['🤝 ', s.jsx(e.strong, { children: '交流分享' }), '：与他人交流学习心得']
          }),
          `
`,
          s.jsxs(e.li, {
            children: ['📈 ', s.jsx(e.strong, { children: '持续改进' }), '：根据反馈调整学习方法']
          }),
          `
`
        ]
      }),
      `
`,
      s.jsx(e.h3, { children: '有序列表' }),
      `
`,
      s.jsxs(e.ol, {
        children: [
          `
`,
          s.jsxs(e.li, {
            children: [
              '准备阶段',
              `
`,
              s.jsxs(e.ul, {
                children: [
                  `
`,
                  s.jsx(e.li, {
                    children:
                      '确定学习目标 长度测试salkdjlakjldjasldjalsjdlkasjdlasjldkjasljdlkasjdlkjasldjlkasjdklasjlkdjas'
                  }),
                  `
`,
                  s.jsx(e.li, { children: '收集学习资料' }),
                  `
`,
                  s.jsx(e.li, { children: '制定时间计划' }),
                  `
`
                ]
              }),
              `
`
            ]
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              '学习阶段',
              `
`,
              s.jsxs(e.ul, {
                children: [
                  `
`,
                  s.jsx(e.li, { children: '理论学习' }),
                  `
`,
                  s.jsx(e.li, { children: '实践操作' }),
                  `
`,
                  s.jsx(e.li, { children: '问题记录' }),
                  `
`
                ]
              }),
              `
`
            ]
          }),
          `
`,
          s.jsxs(e.li, {
            children: [
              '巩固阶段',
              `
`,
              s.jsxs(e.ul, {
                children: [
                  `
`,
                  s.jsx(e.li, { children: '知识总结' }),
                  `
`,
                  s.jsx(e.li, { children: '项目实战' }),
                  `
`,
                  s.jsx(e.li, { children: '经验分享' }),
                  `
`
                ]
              }),
              `
`
            ]
          }),
          `
`
        ]
      }),
      `
`,
      s.jsx(e.h3, { children: '任务列表' }),
      `
`,
      s.jsxs(e.ul, {
        className: 'contains-task-list',
        children: [
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', checked: !0, disabled: !0 }),
              ' ',
              '完成 Markdown 渲染器优化'
            ]
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', checked: !0, disabled: !0 }),
              ' ',
              '添加代码高亮功能'
            ]
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [
              s.jsx(e.input, { type: 'checkbox', checked: !0, disabled: !0 }),
              ' ',
              '支持数学公式渲染'
            ]
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [s.jsx(e.input, { type: 'checkbox', disabled: !0 }), ' ', '添加图片懒加载']
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [s.jsx(e.input, { type: 'checkbox', disabled: !0 }), ' ', '实现全文搜索']
          }),
          `
`,
          s.jsxs(e.li, {
            className: 'task-list-item',
            children: [s.jsx(e.input, { type: 'checkbox', disabled: !0 }), ' ', '优化移动端体验']
          }),
          `
`
        ]
      }),
      `
`,
      s.jsx(e.h2, { children: '链接和图片' }),
      `
`,
      s.jsx(e.p, { children: '这里有一些有用的链接：' }),
      `
`,
      s.jsxs(e.ul, {
        children: [
          `
`,
          s.jsx(e.li, {
            children: s.jsx(e.a, { href: 'https://react.dev', children: 'React 官方文档' })
          }),
          `
`,
          s.jsx(e.li, {
            children: s.jsx(e.a, { href: 'https://nextjs.org', children: 'Next.js 文档' })
          }),
          `
`,
          s.jsx(e.li, {
            children: s.jsx(e.a, { href: 'https://tailwindcss.com', children: 'Tailwind CSS' })
          }),
          `
`
        ]
      }),
      `
`,
      s.jsx(e.p, {
        children: s.jsx(e.img, {
          src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          alt: '图片演示'
        })
      }),
      `
`,
      s.jsx(e.h2, { children: '分隔线' }),
      `
`,
      s.jsx(e.hr, {}),
      `
`,
      s.jsx(e.h2, { children: '行内代码' }),
      `
`,
      s.jsxs(e.p, {
        children: [
          '在 JavaScript 中，你可以使用 ',
          s.jsx(e.mark, { children: 'const' }),
          ' 关键字声明常量，使用 ',
          s.jsx(e.mark, { children: 'let' }),
          ' 声明变量。React 组件通常使用 ',
          s.jsx(e.mark, { children: 'useState' }),
          ' 和 ',
          s.jsx(e.mark, { children: 'useEffect' }),
          ' 钩子来管理状态和副作用。 ',
          s.jsx(e.mark, {
            children: '这是长度测试aksjdlasjdlkashdalsjdlkasjdlkasjdoiqwjlkasnxlkas'
          })
        ]
      }),
      `
`,
      s.jsx(e.h2, { children: 'Emoji 支持' }),
      `
`,
      s.jsx(e.p, { children: '我们的博客平台支持 emoji! 🤩 🚀 ❤️' }),
      `
`,
      s.jsx(e.p, { children: '你可以使用各种 emoji 来让文章更生动：' }),
      `
`,
      s.jsxs(e.ul, {
        children: [
          `
`,
          s.jsx(e.li, { children: '技术相关： 💻 ⚙️ 🔧 🔨' }),
          `
`,
          s.jsx(e.li, { children: '情感表达： 😂 🤔 😢 😌' }),
          `
`,
          s.jsx(e.li, { children: '状态指示： ✅ ❌ ⚠️ ℹ️' }),
          `
`
        ]
      }),
      `
`,
      s.jsx(e.h1, { children: '总结' }),
      `
`,
      s.jsx(e.hr, {}),
      `
`,
      s.jsx(e.p, { children: '通过这篇文章，我们展示了博客平台强大的Markdown渲染能力：' }),
      `
`,
      s.jsxs(e.ol, {
        children: [
          `
`,
          s.jsxs(e.li, {
            children: [s.jsx(e.strong, { children: '代码高亮' }), '：支持多种编程语言的语法高亮']
          }),
          `
`,
          s.jsxs(e.li, {
            children: [s.jsx(e.strong, { children: '数学公式' }), '：支持LaTeX格式的数学公式渲染']
          }),
          `
`,
          s.jsxs(e.li, {
            children: [s.jsx(e.strong, { children: '表格' }), '：美观的表格样式和响应设计']
          }),
          `
`,
          s.jsxs(e.li, {
            children: [s.jsx(e.strong, { children: '列表' }), '：支持有序、无序和任务列表']
          }),
          `
`,
          s.jsxs(e.li, {
            children: [s.jsx(e.strong, { children: 'Emoji' }), '：丰富的表情符号支持']
          }),
          `
`
        ]
      }),
      `
`,
      s.jsx(e.p, { children: '这些功能让我们能够创建更加丰富和专业的技术博客内容！🎉' })
    ]
  });
}
function a(l = {}) {
  const { wrapper: e } = l.components || {};
  return e ? s.jsx(e, { ...l, children: s.jsx(n, { ...l }) }) : n(l);
}
export { a as default };
