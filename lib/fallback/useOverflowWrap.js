/**
 * useOverflowWrap
 * 为早期浏览器转换 word-wrap
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function useOverflowWrap(decl, i) {
  var reBefore, declFlag;

  if ((decl.prop === 'overflow-wrap')) {
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');
    declFlag = { wordWrap: false };
    decl.parent.each(function(neighbor) {
      if ((neighbor.prop === 'word-wrap')) {
        declFlag.wordWrap = true;
      }
    });

    if (!declFlag.wordWrap) {
      insertDecl(decl, i, {
        raws: {
          before: reBefore
        },
        prop: 'word-wrap',
        value: decl.value
      });
    }
  }
}

module.exports = useOverflowWrap;
