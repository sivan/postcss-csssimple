/**
 * usePseudoElements
 * 伪元素选择器只保留一个冒号，兼容低级浏览器。
 */
var utils = require('../utils');

function usePseudoElements(cssRule) {
  if (cssRule.selector.match(utils.regAllPseudo)) {
    cssRule.selector = cssRule.selector.replace(/::/g, ':');
  }
}

module.exports = usePseudoElements;
