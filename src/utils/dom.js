
const PRE = 'j-';

function attr(node, key) {
  const preKye = PRE + key;
  const value = node.getAttribute(preKye);
  console.log(value);
  if (value) {
    node.removeAttribute(preKye);
    return value;
  }
}

export default {
  attr,
}