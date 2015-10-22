/**
 * useWillChange
 * 通过 3D hack 兼容 will-change
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function useWillChange(decl, i) {
  var reBefore, declFlag;

  if ((decl.prop === 'will-change')) {
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');
    declFlag = {backfaceVisibility: false };
    decl.parent.each(function(neighbor) {
      if ((neighbor.prop === 'backface-visibility')) {
        declFlag.backfaceVisibility = true;
      }
    });

    if (!declFlag.backfaceVisibility) {
      insertDecl(decl, i, {
        raws: {
          before: reBefore
        },
        prop: 'backface-visibility',
        value: 'hidden'
      });
    }
  }
}

module.exports = useWillChange;
