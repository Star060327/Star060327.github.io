import { j as n } from './index-cKcMP2r-.js';
function r(o) {
  const e = {
    code: 'code',
    h1: 'h1',
    h2: 'h2',
    li: 'li',
    ol: 'ol',
    p: 'p',
    pre: 'pre',
    ...o.components
  };
  return n.jsxs(n.Fragment, {
    children: [
      n.jsx(e.h1, { children: '6种继承方式' }),
      `
`,
      n.jsx(e.h2, { children: '原型链继承：' }),
      `
`,
      n.jsx(e.p, {
        children:
          '原理：直接利用原型链特征实现的继承，让构造函数的prototype（它本质也是一个对象，也是有__proto__属性的）指向另一个构造函数的实例。仅通过修改构造函数的prototype'
      }),
      `
`,
      n.jsx(e.pre, {
        children: n.jsx(e.code, {
          className: 'language-js',
          children: `function Person() \r
{  this.hand = 2}\r
function YellowRace() { }\r
YellowRace.prototype = new Person()\r
//等价于  YellowRace.prototype.__proto__ = new Person()\r
//其实就是子类的原型对象的对象原型指向父类的实例对象\r
const xiaoming = new YellowRace()\r
console.log(xiaoming.hand) 
`
        })
      }),
      `
`,
      n.jsx(e.p, { children: '弊端：' }),
      `
`,
      n.jsxs(e.ol, {
        children: [
          `
`,
          n.jsx(e.li, { children: '创建实例时不能传参数' }),
          `
`,
          n.jsx(e.li, {
            children:
              '如果原型的属性是引用数据类型，所有的实例都会共享这个属性（引用数据类型在堆里），某个实例的修改可能影响其他实例。\\'
          }),
          `
`
        ]
      }),
      `
`,
      n.jsx(e.h2, { children: '盗用构造函数：' }),
      `
`,
      n.jsx(e.p, {
        children:
          '盗用构造函数也叫作“对象伪装”或者“经典继承”，原理就是通过在子类中调用父类构造函数实现上下文的绑定。'
      }),
      `
`,
      n.jsx(e.pre, {
        children: n.jsx(e.code, {
          className: 'language-js',
          children: `function Person(eyes) \r
{  this.eyes = eyes  \r
this.colors = ['white', 'yellow', 'black']\r
\r
}\r
function YellowRace() \r
{  \r
Person.call(this, 'black') \r
//console.log(this)\r
// 调用构造函数并传参\r
}\r
const xiaoming = new YellowRace()\r
xiaoming.colors.push('green')\r
console.log(xiaoming.colors) \r
// ['white', 'yellow', 'black', 'green']\r
console.log(xiaoming.eyes) \r
// black\r
const laowang = new YellowRace()\r
console.log(laowang.colors) \r
// ['white', 'yellow', 'black']\r
console.log(laowang.eyes) \r
// black
`
        })
      }),
      `
`,
      n.jsx(e.p, { children: '弊端：' }),
      `
`,
      n.jsxs(e.ol, {
        children: [
          `
`,
          n.jsx(e.li, {
            children:
              'YellowRace构造函数、xiaoming和laowang实例都没有和Person的原型对象产生联系，因此子类不能访问父类原型上定义的方法，所有的父类都必须采用构造函数模式。'
          }),
          `
`,
          n.jsx(e.li, {
            children:
              '由于父类必须在构造函数中定义方法，通过盗用构造函数继承的方法本质上都变成了实例自己的方法，不是公共的方法，因此失去了复用性。'
          }),
          `
`
        ]
      }),
      `
`,
      n.jsx(e.h2, { children: '组合继承：' }),
      `
`,
      n.jsx(e.p, {
        children:
          '组合继承的原理就是先通过盗用构造函数实现上下文绑定和传参，然后再使用原型链继承的手段将子构造函数的prototype指向父构造函数的实例，代码如下：'
      }),
      `
`,
      n.jsx(e.pre, {
        children: n.jsx(e.code, {
          className: 'language-js',
          children: `function Person(eyes) {  \r
    this.eyes = eyes  \r
    this.colors = ['white', 'yellow', 'black']\r
}\r
Person.prototype.getEyes = function () {  \r
    return this.eyes\r
  }\r
function YellowRace() {  \r
Person.call(this, 'black')   //1\r
// 调用构造函数并传参\r
}\r
YellowRace.prototype = new Person()   //2 \r
// 再次调用构造函数\r
const xiaoming = new YellowRace()\r
xiaoming.colors.push('green')\r
const laowang = new YellowRace()\r
console.log(xiaoming.colors) \r
// ['white', 'yellow', 'black', 'green']\r
console.log(laowang.colors) \r
// ['white', 'yellow', 'black']\r
console.log(xiaoming.getEyes()) // black
`
        })
      }),
      `
`,
      n.jsx(e.p, {
        children:
          '但组合继承还是有一个小小的缺点，那就是在实现的过程中调用了两次Person构造函数（一次是yelloRace这个构造函数内部调用，另一次是进行原型的链接），有一定程度上的性能浪费。这个缺点在最后的寄生式组合继承可以改善。'
      }),
      `
`,
      n.jsx(e.h2, { children: '原型式继承：' }),
      `
`,
      n.jsx(e.p, {
        children: `原理：如果你有一个已知的对象，想在它的基础上再创建一个新对象，那么你只需要把已知对象传给object函数即可。\r
创建完成后，新对象的__proto__指向所传参数。`
      }),
      `
`,
      n.jsx(e.pre, {
        children: n.jsx(e.code, {
          className: 'language-js',
          children: `const object = function (o)\r
 {  \r
 function F() { }  \r
 F.prototype = o     //传入的参数（是个对象）作为原型对象（新对象）的对象原型（__proto__）\r
  return new F()}\r
  //整个就理解为新创建对象的原型对象指向参数对象\r
  const xiaoming = { \r
   eyes: 'black', \r
    colors: ['white', 'yellow', 'black']\r
    }\r
    const laowang = object(xiaoming)\r
    console.log(laowang.eyes) // black\r
    console.log(laowang.colors) // ['white', 'yellow', 'black']复制代码
`
        })
      }),
      `
`,
      n.jsx(e.p, {
        children:
          'ES5新增了一个方法Object.create()将原型式继承规范化了。相比于上述的object()方法，Object.create()可以接受两个参数，第一个参数是作为新对象原型的对象，第二个参数也是个对象，里面放入需要给新对象增加的属性（可选）。第二个参数与Object.defineProperties()方法的第二个参数是一样的，每个新增的属性都通过自己的属性描述符来描述，以这种方式添加的属性会遮蔽原型上的同名属性。当Object.create()只传入第一个参数时，功效与上述的object()方法是相同的。'
      }),
      `
`,
      n.jsx(e.pre, {
        children: n.jsx(e.code, {
          className: 'language-js',
          children: `const xiaoming = {\r
  eyes: 'black', \r
   colors: ['white', 'yellow', 'black']}\r
const laowang = Object.create(xiaoming, {  name: {    value: '老王',    writable: false,    enumerable: true,    configurable: true  },  \r
age: {    value: '32',    writable: true,    enumerable: true,    configurable: false  }})\r
console.log(laowang.eyes) // black\r
console.log(laowang.colors) // ['white', 'yellow', 'black']\r
console.log(laowang.name) // 老王\r
console.log(laowang.age) // 32\r
\r
const obj = Object.create(o)  //这个的意思就是obj的__proto__指向o，obj是对象
`
        })
      }),
      `
`,
      n.jsx(e.p, { children: '缺点：' }),
      `
`,
      n.jsxs(e.ol, {
        children: [
          `
`,
          n.jsx(e.li, {
            children: '不能传参，使用手写的object()不能传，但使用Object.create()是可以传参的。'
          }),
          `
`,
          n.jsx(e.li, { children: '原对象中的引用类型的属性会被新对象共享。' }),
          `
`
        ]
      }),
      `
`,
      n.jsx(e.h2, { children: '寄生式继承：' }),
      `
`,
      n.jsx(e.p, {
        children: '它的思想就是在原型式继承的基础上以某种方式增强对象，然后返回这个对象。'
      }),
      `
`,
      n.jsx(e.pre, {
        children: n.jsx(e.code, {
          className: 'language-js',
          children: `function inherit(o) \r
{  let clone = Object.create(o) \r
     clone.sayHi = function () { \r
     // 增强对象    \r
     console.log('Hi')  \r
     } \r
  return clone\r
  }\r
 const xiaoming = { \r
  eyes: 'black', \r
  colors: ['white', 'yellow', 'black']\r
  }\r
  const laowang = inherit(xiaoming)\r
  console.log(laowang.eyes) // black\r
  console.log(laowang.colors) // ['white', 'yellow', 'black']\r
  laowang.sayHi() // Hi
`
        })
      }),
      `
`,
      n.jsx(e.h2, { children: '寄生组合继承：' }),
      `
`,
      n.jsx(e.p, {
        children: `基本思路就是使用寄生式继承来继承父类的原型对象，然后将返回的新对象赋值给子类的原型对象。\r
而且Person只需调用一次`
      }),
      `
`,
      n.jsx(e.pre, {
        children: n.jsx(e.code, {
          className: 'language-js',
          children: `//寄生式继承\r
function Person(eyes) \r
{  this.eyes = eyes  \r
    this.colors = ['white', 'yellow', 'black']\r
}\r
\r
function YellowRace() {  Person.call(this, 'black') // 调用构造函数并传参继承属性   *1\r
}\r
\r
inherit( Person ,YellowRace) // 寄生式继承，不用第二次调用构造函数\r
const xiaoming = new YellowRace()\r
xiaoming.colors.push('green')\r
const laowang = new YellowRace()\r
console.log(xiaoming.colors)\r
console.log(laowang.colors)\r
console.log(xiaoming.getEyes())\r
核心逻辑：\r
function inherit(Father, Son) { //继承父亲的方法\r
//核心思路是我们自己创造这个prototype对象来填充son的prototype，而不是直接new一个person\r
//减少了不必要的浪费  传参传父类的原型对象就是为了不调用父亲的实例而继承父亲的方法\r
const prototype = Object.create(Father.prototype) // 这个对象此时的__proto__就是Father.prototype   可以理解为prototype对象的对象原型就是父亲的原型对象\r
console.log(prototype.__proto__)\r
prototype.constructor = Son // 将获取的副本的constructor指向子类，js中构造函数的原型对象含有一默认属性constructor指向自身\r
console.log(prototype.__proto__)\r
Son.prototype = prototype // 将修改好的prototype填充son.prototype\r
}\r
//里面其实就三行代码\r
//1.自己构建一个变量接收父亲的prototype\r
//2.变量加入了原型链，开始和son关联，直接constructor双向即可
`
        })
      }),
      `
`,
      n.jsx(e.p, {
        children: '继承的本质就是子类通过原型链继承父亲的方法，通过构造函数调用继承父类的属性'
      })
    ]
  });
}
function c(o = {}) {
  const { wrapper: e } = o.components || {};
  return e ? n.jsx(e, { ...o, children: n.jsx(r, { ...o }) }) : r(o);
}
export { c as default };
