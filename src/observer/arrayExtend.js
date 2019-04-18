const arrMethods = ['push', 'pop', 'shift', 'unshift'];
const arrayExtend = [];

arrMethods.forEach((method) => {
  const ORI_METHODS = Array.prototype[method];
  arrayExtend[method] = function() {
    console.log('i was be extend!')
    return ORI_METHODS.apply(this, arguments);
  }
})

export default arrayExtend;