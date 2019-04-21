import someInitMethods from './instance/init.js';
import someCompileMethods from './instance/compile.js';
// import directives from '@/directive.js';
function Jue(options) {
  // 初始化，包括初始化observer，computed等
  this._init(options);
  this.$amount();
}

Jue.prototype = {
  constructor: Jue,
  ...someInitMethods,
  ...someCompileMethods
}

Jue.prototype.$amount = function() {
  this.initElement();
  this.compile();
  // console.log(this);
}

// Jue.options = {
//   directives,
// }

export default Jue;