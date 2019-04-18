import arrayExtend from './arrayExtend.js'

function Observer (value, type) {
  this.value = value

  Object.defineProperty(value, '$observe', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: this
  })

  if (type === 'array') {
    value.__proto__ = arrayExtend
    this.link(value)
  } else {
    this.walk(value)
  }
}

// link对数组里每个子项都变成observer子例
Observer.prototype.link = function (value) {
  value.forEach((obj) => {
    // this.walk(obj)
    this.observe(obj)
  })
}

// Object.hasOwnproperty()
Observer.prototype.walk = function (value) {
  // for in遍历一个对象的所有可遍历的熟悉，（包括自己也包括原型链上的）
  for (let key in value) {
    // 如果不是自己的属性就不管
    if (!value.hasOwnProperty(key)) return
    let val = value[key]
    this.observe(key, val)

    this.convert(key, val)
  }
}

// 这个函数主要判断当前这个this下的key值是否也是一个observer对象
// 如果是的话，就在这个observer子例（key)上绑定parent(this)，和parent
Observer.prototype.observe = function (key, val) {
  const ob = Observer.create(val)
  if (!ob) return
  ob.parent = {
    ob: this,
  key}
}

Observer.prototype.convert = function (key, val) {
  const ob = this
  Object.defineProperty(this.value, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log(`访问${key},值为${val}`)
      return val
    },
    set: function (newVal) {
      if (val === newVal) return
      val = newVal
      ob.notify('set', key, val)
    }
  })
}

Observer.prototype.on = function (event, func) {
  this.callbacks = this.callbacks || {}
  if (!this.callbacks[event]) {
    this.callbacks[event] = []
  }
  this.callbacks[event].push(func);
  return this; //链式调用
}

Observer.prototype.emit = function (event, key, value) {
  this.callbacks = this.callbacks || {}
  if (!this.callbacks[event]) return
  const cbs = this.callbacks[event].slice(0)
  cbs.forEach((cb) => {
    cb.apply(this, arguments)
  })
}

Observer.prototype.notify = function (event, path, value) {
  this.emit(event, path, value)
  const parent = this.parent
  if (!parent) return
  const { ob, key } = parent
  let parentPath

  // 为了兼容数组？
  if (path) {
    parentPath = `${key}.${path}`
  } else {
    parentPath = key
  }

  ob.notify(event, parentPath, value)
}

Observer.create = function (value) {
  if (Array.isArray(value)) {
    return new Observer(value, 'array')
  }
  if (typeof value === 'object') {
    return new Observer(value, 'object')
  }
}

export default Observer
