const tokenReg = /\{\{(.+?)\}\}/g

const textParse = function (text) {
  // 边界情况处理
  if (text.trim() === '' || !tokenReg.test(text)) return null;

  // 这条的话是保证 正则重新重头开始去匹配text文本
  tokenReg.lastIndex = 0;
  const parsedArr = []
  let done = false
  let sIndex = 0, lIndex = 0;

  while(!done) {
    let match = tokenReg.exec(text)
    if (match) {
      lIndex = match.index;
      let beforeText = text.slice(sIndex, lIndex);
      if (beforeText) {
        parsedArr.push({ value: beforeText });
      }
      sIndex = tokenReg.lastIndex;
      parsedArr.push({
        token: true,
        value: match[1],
      })
    } else {
      let beforeText = text.slice(sIndex);
      if (beforeText) {
        parsedArr.push({ value: beforeText })
      }
      done = true;
    }
  }
  return parsedArr;
}

export default textParse
