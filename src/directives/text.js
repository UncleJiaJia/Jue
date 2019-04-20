function update(newVal, oldVal) {
  // 如果两个值一样的就不更新
  if (oldVal && newVal === oldVal) return;

  // this 指向 Directive实例，实例有绑定元素，
  this.el.nodeValue = newVal;
}

export default {
  update
}