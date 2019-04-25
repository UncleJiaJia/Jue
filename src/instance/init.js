import Observer from '@/observer/index.js'
import Binding from '@/binding.js'
import Batcher from '@/batcher.js'

const batcher = new Batcher()
function _init (options) {
  this.$options = options
  this.$data = options.data || {}

  // 监听完对象，那就要初始化bindings和directive，
  // 为绑定元素和watch做准备
  this._initData()

  this._initBindings()
}

// 初始化数据，数据监听这一块
function _initData () {
  this.observer = Observer.create(this.$data)
// vm.observer.on('set', (event, key, value) => {
//   console.log(`set event was emit! ${key}:${value}`)
// })
}

function _initBindings () {
  this._rootBindings = new Binding()
  // this._getBinding = _getBinding
  this.observer.on('set', this._updateBinding.bind(this))
}

// 给个路径，返回路径对应的 bindings
function _getBinding (path) {
  const nameArr = path.split('.')
  let r = this._rootBindings
  nameArr.forEach((name) => {
    if (r[name]) {
      r = r[name]
    } else {
      r = r[name] = new Binding()
    }
  })
  // console.log(this._rootBindings , r)
  return r
}

// 执行当前path下面，vm._rootBindings的对应的path的watchs
// 上面绑定了this = vm，所以这里的vm === this
function _updateBinding () {
  this._updateSelfBinding(...arguments)
// _updateSelfBinding.apply(this, arguments)
// _updateChildBinding.apply(this, arguments)
}

function _updateSelfBinding (event, path, value) {
  // console.log(this, path)
  // 每次有监听的值改变，那么就会触发set function,
  // 最终执行这个函数。并且把改变的数据的路径传过来，
  // 这个函数做的就是解析这个路径，找到vm[path]下的_subs，
  // 然后佢更新_subs下的一系列watch
  // console.log('update', value)
  let pathArray = path.split('.')
  let r = this._rootBindings
  for (let i = 0; i < pathArray.length; i++) {
    let key = pathArray[i]
    if (!r[key]) return
    r = r[key]
  }

  let subs = r._subs
  subs.forEach((watch) => {
    // watch.update(value);
    batcher.nextTick(watch);
  });

  // let pathArray = path.split('.')

  // let r = this._rootBindings
  // for (let i = 0; i < pathArray.length; i++) {
  //   let key = pathArray[i]
  //   if (!r[key]) return
  //   r = r[key]
  // }

// let subs = r._subs
// subs.forEach((watch) => {
//   // cb??
//   watch.cb()
// })
}

export default {
  _init,
  _initData,
  _initBindings,
  _getBinding,
  _updateBinding,
_updateSelfBinding}
