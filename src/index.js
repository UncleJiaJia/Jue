import someInitMethods from './instance/init.js';
import { initElement, compile } from './instance/compile.js';
// import directives from '@/directive.js';
function Jue(options) {
  // 初始化，包括初始化observer，computed等
  this._init(options);
}

Jue.prototype = {
  constructor: Jue,
  ...someInitMethods,
}

Jue.prototype.$amount = function() {
  initElement(this);
  compile(this);
}

// Jue.options = {
//   directives,
// }

export default Jue;