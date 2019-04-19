import Observer from '@/observer/index.js';
import Binding from '@/binding.js';

export function _init(vm, options) {
  vm.$options = options;
  vm.$data = options.data || {};

  // 监听完对象，那就要初始化bindings和directive，
  // 为绑定元素和watch做准备
  initData(vm);

  initBindings(vm);
}

// 初始化数据，数据监听这一块
function initData(vm) {
  vm.observer = Observer.create(vm.$data);
  // vm.observer.on('set', (event, key, value) => {
  //   console.log(`set event was emit! ${key}:${value}`);
  // })
}

function initBindings(vm) {
  vm._rootBindings = new Binding();
  vm._getBinding = _getBinding;
  vm.observer.on('set', _updateBinding.bind(vm))
}

function _getBinding(path) {

  
}

// 执行当前path下面，vm._rootBindings的对应的path的watchs
// 上面绑定了this = vm，所以这里的vm === this
function _updateBinding() {
  // TODO
  _updateSelfBinding.apply(this, arguments);
  // _updateChildBinding.apply(this, arguments);
}

function _updateSelfBinding(event, path, value) {
  console.log(this, path);
  // let pathArray = path.split('.');

  // let r = this._rootBindings;
  // for (let i = 0; i < pathArray.length; i++) {
  //   let key = pathArray[i];
  //   if (!r[key]) return;
  //   r = r[key];
  // }

  // let subs = r._subs;
  // subs.forEach((watch) => {
  //   // cb??
  //   watch.cb();
  // })
}
