/**
 * fixIe6Overflow
 * 当存在 overflow: hidden 时增加 _zoom: 1; 以解决 IE6 overflow: hidden; 失效 bug。
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function fixIe6Overflow(decl, i) {
  var reBefore, declFlag;

  if ((decl.prop === 'overflow') && (decl.value === 'hidden')) {
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');
    declFlag = {zoom: false};
    decl.parent.each(function(neighbor) {
      if ((neighbor.prop === 'zoom') && (neighbor.value === '1')) {
        declFlag.zoom = true;
      }
    });

    if (!declFlag.zoom) {
      insertDecl(decl, i, {
        raws: {
          before: reBefore
        },
        prop: '_zoom',
        value: 1
      });
    }
  }
}

module.exports = fixIe6Overflow;
