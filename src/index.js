import { _init } from './instance/init.js';
import { initElement, compile } from './instance/compile.js';
// import directives from '@/directive.js';
function Jue(options) {
  // 初始化，包括初始化observer，computed等
  _init(this, options);
}

Jue.prototype.$amount = function() {
  initElement(this);
  compile(this);
}

// Jue.options = {
//   directives,
// }

export default Jue;