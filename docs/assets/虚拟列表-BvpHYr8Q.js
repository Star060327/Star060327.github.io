import{j as n}from"./index-NJjM6JL3.js";function i(e){const s={code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(s.p,{children:"在前端开发中，一次性渲染10万条数据会导致页面卡顿甚至崩溃，虚拟列表（Virtual List）和时间切片是解决该问题的核心方案。本文聚焦虚拟列表的实现原理、核心痛点及极致优化手段。"}),`
`,n.jsx(s.h2,{children:"一、定高虚拟列表（基础版）"}),`
`,n.jsxs(s.p,{children:["虚拟列表的核心是",n.jsx(s.strong,{children:"只渲染当前视野内的数据"}),"，通过计算滚动位置实现“假滚动”效果，核心逻辑："]}),`
`,n.jsx(s.h3,{children:"核心实现要点"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"滚动容器撑高"}),"：创建一个空的“占位盒子”，高度 = 总数据量 × 单个列表项高度，模拟完整列表的滚动条；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"可视区数量计算"}),"：",n.jsx(s.code,{children:"可视区最大渲染数 = Math.ceil(可视区高度 / 单个列表项高度)"}),"；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"偏移量计算"}),"：",n.jsx(s.code,{children:"偏移量 = 顶部不可见项索引 × 单个列表项高度"}),"，其中 ",n.jsx(s.code,{children:"顶部不可见项索引 = Math.floor(滚动距离 / 单个列表项高度)"}),"；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"缓冲区优化"}),"：为避免快速滚动时的空白，上下各预留1个缓冲项：",`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["起始索引：",n.jsx(s.code,{children:"Math.max(0, 顶部不可见项索引 - 1)"})]}),`
`,n.jsxs(s.li,{children:["结束索引：",n.jsx(s.code,{children:"Math.min(总数据量 - 1, 起始索引 + 可视区最大渲染数 + 1)"})]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(s.h2,{children:"二、不定高虚拟列表（进阶版）"}),`
`,n.jsxs(s.p,{children:["不定高场景下，固定高度计算会导致定位偏移，需通过",n.jsx(s.strong,{children:"真实高度跟踪 + 动态修正"}),"解决："]}),`
`,n.jsx(s.h3,{children:"核心方案"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"首次预估高度"}),"：初始化时给所有列表项设置预估高度，避免页面空白；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"真实高度监听"}),"：使用 ",n.jsx(s.code,{children:"ResizeObserver"})," 监听列表项的尺寸变化，记录每个项的真实高度到高度缓存数组；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"快速索引查找"}),"：基于滚动位置 ",n.jsx(s.code,{children:"scrollTop"}),"，通过",n.jsx(s.strong,{children:"二分查找"}),"快速定位可视区起始索引；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"滚动位置修正"}),"：当列表项高度变化时，重新计算后续项的 ",n.jsx(s.code,{children:"top/bottom"}),"，并修正滚动位置以保证体验一致。"]}),`
`]}),`
`,n.jsx(s.h2,{children:"三、滚动过快导致闪烁的解决方案"}),`
`,n.jsx(s.h3,{children:"闪烁的本质"}),`
`,n.jsx(s.p,{children:"可视区域渲染/更新速度跟不上滚动速度，核心诱因："}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsx(s.li,{children:"DOM 销毁/创建频繁：滚动时频繁操作 DOM，浏览器来不及渲染；"}),`
`,n.jsx(s.li,{children:"定位计算延迟：滚动事件触发频率高，索引/偏移量计算滞后；"}),`
`,n.jsxs(s.li,{children:["重绘重排过多：用 ",n.jsx(s.code,{children:"top/margin"})," 控制偏移，触发频繁回流。"]}),`
`]}),`
`,n.jsx(s.h3,{children:"优化手段"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"DOM 复用池"}),"：提前创建一批备用 DOM 节点，滚动时仅更新内容，不销毁重建，减少 DOM 操作成本；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"滚动事件防抖+节流"}),"：控制计算频率（如 16ms/次，匹配 60fps 刷新率），避免主线程阻塞；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"GPU 加速"}),"：用 ",n.jsx(s.code,{children:"transform: translateY()"})," 替代 ",n.jsx(s.code,{children:"top/margin"})," 控制偏移，触发 GPU 加速，减少回流（可配合 ",n.jsx(s.code,{children:"will-change: transform"})," 提示浏览器优化）；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"预渲染缓冲区"}),"：可视区外提前渲染 2~3 个列表项，视觉上消除空白间隙。"]}),`
`]}),`
`,n.jsx(s.h2,{children:"四、动态高度虚拟列表完整方案"}),`
`,n.jsx(s.h3,{children:"核心痛点"}),`
`,n.jsx(s.p,{children:"静态高度计算导致的定位偏移（如长文本换行、图片加载后高度变化）。"}),`
`,n.jsx(s.h3,{children:"分步实现"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"初始化预估高度"}),"：首次渲染用预估高度计算 ",n.jsx(s.code,{children:"startIndex"})," 和 ",n.jsx(s.code,{children:"translateY"}),"，保证初始渲染不卡顿；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"真实高度缓存"}),"：列表项渲染完成后，通过 ",n.jsx(s.code,{children:"offsetHeight"})," 获取真实高度，更新到 ",n.jsx(s.code,{children:"heightCache"})," 数组；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"缓存高度计算"}),"：滚动时从 ",n.jsx(s.code,{children:"heightCache"})," 取真实高度计算累计高度，保证定位精准；"]}),`
`,n.jsxs(s.li,{children:[n.jsx(s.strong,{children:"边界处理"}),"：",`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["数据增删时同步重置 ",n.jsx(s.code,{children:"heightCache"}),"，避免缓存错位；"]}),`
`,n.jsxs(s.li,{children:["监听窗口 ",n.jsx(s.code,{children:"resize"})," 事件，重新计算可视区范围，避免内容截断。"]}),`
`]}),`
`]}),`
`]}),`
`,n.jsx(s.h2,{children:"五、三大核心优化手段：防抖 + rAF + transform"}),`
`,n.jsxs(s.p,{children:["这三个手段从",n.jsx(s.strong,{children:"减少无效计算、保证渲染时机、降低布局成本"}),"三个维度解决卡顿问题："]}),`
`,n.jsx(s.h3,{children:"1. 防抖：减少高频滚动的无效计算"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"解决问题：滚动事件触发频率过高，导致重复计算；"}),`
`,n.jsx(s.li,{children:"实现方式：给滚动事件绑定防抖函数，平衡响应速度与性能；"}),`
`,n.jsx(s.li,{children:"核心目标：避免无意义的索引/偏移量计算。"}),`
`]}),`
`,n.jsx(s.h3,{children:"2. requestAnimationFrame (rAF)：对齐屏幕刷新节奏"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"核心问题：DOM 操作时机与屏幕刷新不同步，导致跳帧/闪烁；"}),`
`,n.jsxs(s.li,{children:["实现方式：",`
`,n.jsxs(s.ul,{children:[`
`,n.jsx(s.li,{children:"滚动时仅标记“需要更新列表”，不立即操作 DOM；"}),`
`,n.jsxs(s.li,{children:["将 DOM 创建/更新逻辑放入 ",n.jsx(s.code,{children:"requestAnimationFrame"})," 回调；"]}),`
`,n.jsx(s.li,{children:"注意：纯计算逻辑无需放入 rAF，仅修改 DOM 样式/内容的操作需要；"}),`
`]}),`
`]}),`
`,n.jsx(s.li,{children:"核心目标：保证 DOM 更新与屏幕刷新率（60fps）同步，避免掉帧。"}),`
`]}),`
`,n.jsx(s.h3,{children:"3. transform：合成层优化定位"}),`
`,n.jsxs(s.ul,{children:[`
`,n.jsxs(s.li,{children:["核心问题：用 ",n.jsx(s.code,{children:"top/margin"})," 控制偏移会频繁触发重排，性能开销大；"]}),`
`,n.jsxs(s.li,{children:["实现方式：用 ",n.jsx(s.code,{children:"transform: translateY()"})," 替代 ",n.jsx(s.code,{children:"top/margin"}),"，仅触发浏览器合成层优化，不触发布局/绘制；"]}),`
`,n.jsx(s.li,{children:"核心目标：将布局操作转化为合成操作，降低性能开销，提升滚动流畅度。"}),`
`]}),`
`,n.jsx(s.h2,{children:"六、rAF 优化虚拟列表渲染的具体实现"}),`
`,n.jsx(s.h3,{children:"核心问题"}),`
`,n.jsx(s.p,{children:"快速滚动时，大量 DOM 操作集中在一帧内，导致主线程阻塞、掉帧。"}),`
`,n.jsx(s.h3,{children:"实现思路"}),`
`,n.jsxs(s.ol,{children:[`
`,n.jsxs(s.li,{children:[`
`,n.jsx(s.p,{children:"监听滚动事件，标记“需要更新列表”并记录目标索引范围；"}),`
`]}),`
`,n.jsxs(s.li,{children:[`
`,n.jsxs(s.p,{children:["不立即更新 DOM，而是通过 ",n.jsx(s.code,{children:"requestAnimationFrame"})," 批量处理："]}),`
`,n.jsx(s.pre,{children:n.jsx(s.code,{className:"language-javascript",children:`let isUpdating = false;
const listContainer = document.getElementById('list-container');

// 滚动监听
listContainer.addEventListener('scroll', () => {
  if (!isUpdating) {
    requestAnimationFrame(() => {
      // 计算可视区索引范围
      const { startIndex, endIndex } = calculateVisibleRange();
      // 更新列表 DOM
      updateListDOM(startIndex, endIndex);
      isUpdating = false;
    });
    isUpdating = true;
  }
});

// 计算可视区范围
function calculateVisibleRange() {
  const scrollTop = listContainer.scrollTop;
  const viewportHeight = listContainer.clientHeight;
  // 基于 heightCache 计算 startIndex/endIndex
  // ... 省略具体计算逻辑
  return { startIndex, endIndex };
}

// 更新列表 DOM（复用节点 + 仅更新内容）
function updateListDOM(startIndex, endIndex) {
  // ... 省略 DOM 复用/更新逻辑
}
`})}),`
`]}),`
`]})]})}function r(e={}){const{wrapper:s}=e.components||{};return s?n.jsx(s,{...e,children:n.jsx(i,{...e})}):i(e)}export{r as default};
