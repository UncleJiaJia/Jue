

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
function Watch(el, expression, update, vm) {
  this.el = el;
  this.expression = expression;
  this.vm = vm;
  this.isDep = false; // 用来判断是否放到__binddingWatch里，防止重复放置
  this.getter = transExpressionToFunc(expression);
  this.get();
  this.addDeps();
}

/**
 * 获得当前vm实例下面对应的[expression]的值，如vm.user.name
 */
Watch.prototype.get = function() {
  this.value = this.getter.call(this.vm, this,vm);
}

Watch.prototype.addDeps = function() {
  if (this.isDep) return;
  let vm = this.vm;
  
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