import textParse from '@/parser/text.js';
import Directive from '@/directive.js';

export function initElement (vm) {
  vm.el = document.querySelector(vm.$options.el)
  if (!vm.el) {
    console.warn('can not find element: ' + vm.$options.el)
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
export function compile (vm) {
  if (!vm.el) return
  _compileElement(vm.el, vm)
}

function _compileElement (element, vm) {
  element.childNodes.forEach((ele) => {
    switch (ele.nodeType) {
      // nodeType 1是元素节点
      case 1:
        _compileElement(ele, vm)
        break
      // nodeType 3是文本节点
      case 3:
        _compileTextNode(ele, vm)
        break
      default:
        break
    }
  })
}

function _compileTextNode (ele, vm) {
  // console.log(ele.nodeValue)
  const directives = textParse(ele.nodeValue)
  if (!directives) return
  console.log('directives', directives)
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
    // if (item.token) {
    //   _bindDirective(textEle, item.value, 'text', vm);
    //   _bindDirective('text', item.value, textEle, vm);
    // }
  })
  ele.parentNode.removeChild(ele);
}

function _bindDirective(el, value, type, vm) {
  const dir = new Directive(el, value, type, vm);
}
