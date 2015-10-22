/**
 * useOpacity
 * 转换 opacity 到 IE 支持的 filter 语法
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function useOpacity(decl, i) {
  var amount = Math.round(decl.value * 100);
  var reBefore;

  if (decl.prop === 'opacity') {
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');

    insertDecl(decl, i, {
      raws: {
        before: reBefore
      },
      prop: 'filter',
      value: 'alpha(opacity=' + amount + ')\\9'
    });
  }
}

module.exports = useOpacity;
