// 批处理方法

function Batcher() {
  // 判断
  this.has = {};
  this.tasks = [];
  this.wait = false;
  // this.initNextTick();
}


Batcher.prototype.push = function(watch) {
  const mark = watch.expression;
  // 如果tasks队列中已经有这个watch了,就不重复push这个队列了，
  if (this.has[mark]) return;
  this.tasks.push(watch);
  this.has[mark] = true;
}

Batcher.prototype.nextTick = function(watch) {
  // promise.resolve.then(), mutationObserver setImmediate, setTimeout, 
  this.push(watch);
  // 保证只有一个异步任务（micro, macro在任务队列中）
  if (this.wait) return;
  this.wait = true;
  let self = this;
  let next = function() {
    self.runTask();
  };
  if (typeof Promise !== 'undefined' && Promise.toString().indexOf('[native code]' !== -1)) {
    Promise.resolve().then(next);
  } else if (setTimeout) {
    setTimeout(next, 4);
  }
}


Batcher.prototype.runTask = function () {
  if (this.tasks.length === 0) return;
  this.tasks.forEach((watch) => {
    watch.update();
  })
  this.tasks = [];
  this.wait = false;
  this.has = {};
}

export default Batcher;