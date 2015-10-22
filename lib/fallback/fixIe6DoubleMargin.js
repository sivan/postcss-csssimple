/**
 * fixIe6DoubleMargin
 * 当存在 float: left|right & margin 不为 0 时增加 _display: inline; 以解决 IE6 双倍边距 bug。
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function fixIe6DoubleMargin(decl, i) {
  var reBefore;

  if ((decl.prop === 'float') && (decl.value !== 'none')) {
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');
    decl.parent.each(function(neighbor) {
      if ((neighbor.prop === 'margin') && (neighbor.value !== '0')) {
        insertDecl(decl, i, {
          raws: {
            before: reBefore
          },
          prop: '_display',
          value: 'inline'
        });
      }
    });
  }
}

module.exports = fixIe6DoubleMargin;
