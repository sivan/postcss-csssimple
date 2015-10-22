/**
 * fixInlineBlock
 * 当使用 display: inline-block; 时解决 IE6~7 Bug。
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function fixInlineBlock(decl, i) {
  var reBefore, declFlag;
  if (decl.prop === 'display' && decl.value === 'inline-block') {
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');
    declFlag = {
      inline: false,
      zoom: false
    };

    decl.parent.each(function(neighbor) {
      // 有 *display: inline; 或 zoom: 1; 时就不插了
      if (neighbor.raws.before.indexOf('*') !== -1 &&
        neighbor.prop === 'display' &&
        neighbor.value === 'inline') {
        declFlag.inline = true;
      }

      if (neighbor.prop === 'zoom' && (neighbor.value === '1')) {
        declFlag.zoom = true;
      }
    });

    if (!declFlag.inline) {
      insertDecl(decl, i, {
        raws: {
          before: reBefore
        },
        prop: '*display',
        value: 'inline'
      });
    }

    if (!declFlag.zoom) {
      insertDecl(decl, i, {
        raws: {
          before: reBefore
        },
        prop: '*zoom',
        value: 1
      });
    }
  }
}

module.exports = fixInlineBlock;
