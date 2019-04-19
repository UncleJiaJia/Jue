import directives from '@/directives/index.js';
import Watch from '@/watch.js';

function Directive(el, expression, type, vm) {
  this.el = el;
  this.expression = expression;
  mixinDireMethod(this, type);
  this.watch = new Watch(el, expression, this._update, vm);
  this._update();
}

// 先手动更新一下当前节点，初始化初始值，即将user.name ==> 'somebody name';
Directive.prototype._update = function (value) {
  this.update(value);
}

function mixinDireMethod(target, type) {
  const ori_obj = directives[type];
  for (let key in ori_obj) {
    if (ori_obj.hasOwnProperty(key)) {
      target[key] = ori_obj[key];
    }
  }
  console.log(target);
}

export default Directive;