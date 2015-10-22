/**
 * useEllipsis
 * 当使用 text-overflow: ellipsis; 时自动处理以保证显示省略号。
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function useEllipsis(decl, i) {
  var reBefore, declFlag;

  if (decl.prop === 'text-overflow' && decl.value === 'ellipsis') {
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');
    declFlag = {
      overflow: false,
      whiteSpace: false
    };

    decl.parent.walkDecls(function(declRule) {
      // 如果存在 overflow 且不等于 hidden, 增加 white-space
      if (declRule.prop === 'overflow') {
        declRule.value = 'hidden';
        declFlag.overflow = true;
      }

      if (declRule.prop === 'white-space') {
        declRule.value = 'nowrap';
        declFlag.whiteSpace = true;
      }
    });

    if (!declFlag.overflow && !declFlag.whiteSpace) {
      insertDecl(decl, i, [
        {
          raws: {
            before: reBefore
          },
          prop: 'overflow',
          value: 'hidden'
        },
        {
          raws: {
            before: reBefore
          },
          prop: 'white-space',
          value: 'nowrap'
        }
      ]);
    } else if (!declFlag.overflow) {
      insertDecl(decl, i, {
        raws: {
          before: reBefore
        },
        prop: 'overflow',
        value: 'hidden'
      });
    } else if (!declFlag.whiteSpace) {
      insertDecl(decl, i, {
        raws: {
          before: reBefore
        },
        prop: 'white-space',
        value: 'nowrap'
      });
    }
  }
}

module.exports = useEllipsis;
