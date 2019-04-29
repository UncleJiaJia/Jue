import textParse from '@/parser/text.js';
import Directive from '@/directive.js';
import DomUtils from '@/utils/dom.js';

// 这个指令集是按照优先级的，比如说，for的指令比if高
const privateAttrs = [
  'if',
]

function initElement () {
  this.el = document.querySelector(this.$options.el)
  if (!this.el) {
    console.warn('can not find element: ' + this.$options.el)
  }
}

/* 
  这个函数要遍历当前实例下所绑定的vm的元素的所有子元素
  然后判断类型，根据不同的类型做不同的处理
  A、先判断元素类型 和 text类型，
    如果是元素类型，继续遍历，直到text类型
    如果是text类型，根据正则抓取{{}}中的path,
    生成watch,链接 该元素和watch
*/
function compile () {
  if (!this.el) return
  this._compileNode(this.el);
  // this._compileElement(this.el)
}

function _compileNode(node) {
  switch (node.nodeType) {
    case 1:
      this._compileElement(node);
      break;
    case 3:
      this._compileTextNode(node);
      break;
    default:
      return;
  }
  // console.log('compileNode', this);
}


function _compileElement (node) {
  // 这个方法用来判断当前这个 Element元素节点是否有设置了特性
  let hasAttributes = node.hasAttributes();
  // 如果有特性，并且有自定义特性，就不接着走了
  if (hasAttributes && this._checkPrivateAttr(node)) {
    return;
  }

  if (node.hasChildNodes()) {
    Array.from(node.childNodes).forEach(this._compileNode, this);
  }
}

function _compileTextNode (ele) {
  const directives = textParse(ele.nodeValue)
  if (!directives) return
  // TODO 
  // 遍历directives, 如果子项有token这个字段，
  // 则代表这个子项是一个text指令，那么new一个指令（Directive)
  // 是先生成一个element再把element传进Directive生成一个指令,
  // 还是在new 一个指令的情况下，生成一个element
  // 然后指令里面，要存 
  // A、当前的元素，B、当前的vm实例，
  // C、融合当前指令类型的所对应的方法
  directives.forEach((item) => {
    const textEle = document.createTextNode(item.value);
    ele.parentNode.appendChild(textEle);
    if (item.token) {
      this._bindDirective(textEle, item.value, 'text', this);
      // _bindDirective('text', item.value, textEle, vm);
    }
  })
  // console.log('compileTextNode', this);
  ele.parentNode.removeChild(ele);
}

function _bindDirective(el, discriptor, type, vm) {
  const dir = new Directive(el, discriptor, type, vm);
}


function _checkPrivateAttr(node) {
  for (let i = 0; i < privateAttrs.length; i++) {
    const dir = privateAttrs[i];
    const value = DomUtils.attr(node, dir);
    if (value) {
      // this._bindDirective(node, value, dir, this);
      return true;
    }
  }
}

export default {
  _bindDirective,
  _compileElement,
  _compileTextNode,
  _compileNode,
  _checkPrivateAttr,
  compile,
  initElement
}