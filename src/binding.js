
function Binding() {
  this._subs = [];
}

Binding.prototype.addChild = function(key) {
  return this[key] || new Binding();
}

Binding.prototype.addSub = function(sub) {
  this._subs.push(sub);
}

export default Binding;