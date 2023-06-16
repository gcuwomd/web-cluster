import { Card } from 'antd'
import '../scss/article.scss'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Toc from '../components/sider/Toc'

// @ts-ignore
const article = `# this

- this 用于访问当前方法的所属对象

\`\`\`js
const obj = {
  foo: "bar",
  fn: function () {
    console.log(this); // 指向当前方法的所属对象，即 obj
    console.log(this === obj); // true
  },
};
obj.fn();

document.onclick = function () {
  console.log(this); // 指向当前方法的所属对象 ，即 document
};
\`\`\`

## 普通函数的 this

- 普通函数下 this 不受函数定义环境的影响，而是取决于函数被谁调用

\`\`\`js
function showThis() {
  console.log(this);
}
/**
 * 在这里这个函数直接执行，而不是被某个对象调用
 * 在非严格模式下，执行该函数会输出 window 对象
 * 在严格模式下输出 undefined
 */
showThis();

let arr = [1, 2, 3];
arr.fn = showThis;
// 这里被数组 arr 调用，因此 showThis 函数会输出 arr 数组
arr.fn();

/**
 * 在浏览器环境中， setTimeout 方法属于 window 对象，因此 showThis 函数输出 window
 * 在 node 环境下,在全局作用域下执行 setTimeout，this 指向一个空对象，在 setTimeout 内部，this 会被绑定到一个新创建的 Timeout 对象上
 */
setTimeout(showThis, 1000);

/**
 * 将函数 f 当成构造函数，那么构造函数内部的 this 指向的就是实例化出来的对象 obj
 */

let _this;
function f() {
  _this = this;
}

let obj = new f();
console.log(_this === obj); // true
\`\`\`

## 箭头函数的 this

- 箭头函数的 this 取决于定义的环境 ( 箭头函数外的 this 指向谁，箭头函数中的 this 就指向谁)
- 箭头函数本身没有 this

\`\`\`js
console.log(this); // window
const fn = () => console.log(this); // window

function clickFn() {
  console.log(this);
}

document.onclick = clickFn; // 输出 document 对象

document.onclick = fn; // 输出 window 对象

const obj = {
  getThis: function () {
    return this;
  },
  t: this,
  arrowFn: () => this,
};
// getThis 是 obj 对象内的一个普通函数，obj.getThis() 是由 obj 调用，因此 this 输出 obj 对象本身
console.log(obj.getThis());
/**
 * t: this,这里的 this 代表 obj 这个对象所属的对象
 * 在浏览器环境下，上面定义的 obj 是在全局作用域下定义的，因此属于 window 对象，因此输出 window
 *
 * 在 node 环境下，这里的 this 指向 undefined
 */

console.log(t);
// 箭头函数的 this 于 t：this 的情况相同
console.log(arrowFn());

function A() {
  this.t = this;
  this.arrowFn = () => this;
  this.getThis = function () {
    return this;
  };
}

const objA = new A();
// 上面说到过，构造函数的 this 指向实例化出来的对象本身
console.log(objA.t); // objA
// 箭头函数的 this 取决于外层环境的 this 指向，外层函数的 this 指向实例化的对象本身，因此箭头函数的 this 也指向实例化出来的对象本身
console.log(objA.arrowFn());

console.log(objA.getThis()); // getThis 方法由 objA 对象调用，因此输出 objA 本身
\`\`\`

## 修改 this 的指向

- 使用 \`call()、apply()、bind()\` 可以修改普通函数的 this 指向

\`\`\`js
class People {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  getInfo() {
    return \`\${this.name}，\${this.gender}，今年 \${this.age} 岁\`;
  }
  setName(name) {
    this.name = name;
  }
}

const xiaoming = new People("小明", 18, "男");
const xiaopeng = new People("小鹏", 16, "女");

console.log(xiaoming.getInfo()); // 小明，男，今年 18 岁
/**
 * 下面三个都输出：
 * 小鹏，女，今年 16 岁
 * 其中 call 和 apply 方法是自执行的，bind 方法不是自执行的
 * call 和 apply 用法相似，只是传参方式不同
 */
console.log(xiaoming.getInfo.call(xiaopeng));
console.log(xiaoming.getInfo.apply(xiaopeng));
console.log(xiaoming.getInfo.bind(xiaopeng)());

// 这里虽然调用的是 xiaoming 对象的 setName 方法，但是 this 指向被修改为 xiaopeng，因此修改的是 xiaopeng 的名字； 小鹏 -> 小朋
xiaoming.setName.call(xiaopeng,'小朋');
console.log(xiaopeng)
// apply 和 call 的不同在于参数的传递采用数组的形式
xiaopeng.setName.apply(xiaoming,['晓明'])
console.log(xiaoming)
// bind 的参数传递与 call 相同，但是它不是自执行的
xiaoming.setName.bind(xiaopeng,"小鹏")()
console.log(xiaopeng)

\`\`\`

箭头函数本身没有 \`this\`，在箭头函数内部使用的 \`this\`，来自箭头函数定义所在作用域所指向的 \`this\`，在定义好箭头函数之后，该箭头函数所访问的 \`this\` 已近确定了，因此无法使用 \`call、apply 或者 bind\` 来改变箭头函数 \`this\` 的指向

---
`

const ArticlePage = () => {

  return (
    <>
      <div className="max-w-192 mt-5 mb-20">
        <Card>
          <article id='article'>
            <ReactMarkdown
              children={article}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <Prism
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={okaidia}
                      language={match[1]}
                      PreTag="div"
                      showLineNumbers
                    />
                  ) : (
                    <code className={className}>{children}</code>
                  )
                }
              }}
              
            ></ReactMarkdown>
          </article>
        </Card>
      </div>
      <div className='w-48'>
        <Toc />
      </div>
    </>
  )
}

export default ArticlePage
