

import Observer from '@/observer/index.js';

/**
 * 初始化这个Watch类的时候，主要做几件事
 * A、获得当前vm实例下面对应的[expression]的值，如vm.user.name
 * B、将watch放进vm实例__bindingWatch下面对应的[expression]里，
 * C、执行一下update,首次更新节点的值
 * 
 * @param {Element} el 元素节点
 * @param {String} expression 指令 如 user.name 
 * @param {function} update 当前这个元素的更新方法
 * @param {*} vm vm实例
 */
function Watch(vm, expression, update, ctx) {
  // this.el = el;
  this.expression = expression;
  this.vm = vm;
  this.ctx = ctx;
  this.cb = update;
  this.isDep = {}; // 用来判断是否放到__binddingWatch里，防止重复放置
  this.getter = transExpressionToFunc(expression);
  this.addDeps(this.expression);
  this.get();
  // this.update();
}

/**
 * 获得当前vm实例下面对应的[expression]的值，如vm.user.name
 */
Watch.prototype.get = function() {
  this.beforeGetter();
  this.value = this.getter.call(this.vm, this.vm.$data);
  this.afterGetter();
  // console.log('get()', this.value);
}

Watch.prototype.beforeGetter = function () {
  Observer.emitGet = true;
  this.vm.current_watch = this;
}

Watch.prototype.afterGetter = function () {
  Observer.emitGet = false;
  this.vm.current_watch = null;
}

Watch.prototype.addDeps = function(path) {
  if (this.isDep[path]) return;
  this.isDep[path] = true;
  let vm = this.vm;
  let binding = vm._getBinding(path);
  binding.addSub(this);
}

Watch.prototype.update = function(value) {
  let oldValue = this.value;
  this.get();
  // this.value = this.getter.call(this.vm, this.vm.$data);
  // this.value = value;
  console.log(this.value, oldValue);
  this.cb.call(this.ctx, this.value, oldValue);
}

/**
 * @param {String} user.name;
 * @return {Function} 一个参数为o,返回o.user.name的值的函数
 */
function transExpressionToFunc(expression) {
  // ['user', 'name']
  const params = expression.split('.');
  let funcStr = 'if (o !== null ';
  let path = 'o';
  params.forEach((par) => {
    path += '.' + par;
    funcStr += ` && ${path} !== null`
  });
  funcStr += `) { return ${path} }`;
  return new Function('o', funcStr);
}

export default Watch;