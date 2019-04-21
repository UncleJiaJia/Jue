import directives from '@/directives/index.js';
import Watch from '@/watch.js';

function Directive(el, expression, type, vm) {
  this.el = el;
  this.expression = expression;
  mixinDireMethod(this, type);
  this.watch = new Watch(vm, expression, this._update, this);
  // this.watch.value = this.vm[expression]的值
  this._update(this.watch.value);
}

// 先手动更新一下当前节点，初始化初始值，即将user.name ==> 'somebody name';
Directive.prototype._update = function (newVal, oldVal) {
  this.update(newVal, oldVal);
}

function mixinDireMethod(target, type) {
  const ori_obj = directives[type];
  for (let key in ori_obj) {
    if (ori_obj.hasOwnProperty(key)) {
      target[key] = ori_obj[key];
    }
  }
}

export default Directive;