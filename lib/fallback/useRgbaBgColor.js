/**
 * useRgbaBgColor
 * background rgba 转换为 IE ARGB
 */
var utils = require('../utils');
var insertDecl = require('../insertDecl');

function useRgbaBgColor(decl, i) {
  var colorR, colorG, colorB, colorA, ARGB, reBefore;

  // 十六进制不足两位自动补 0
  function pad(str) {
    return str.length === 1 ? '0' + str : '' + str;
  }

  if ((decl.prop === 'background' || decl.prop === 'background-color') &&
    decl.value.match(utils.regRGBA)) {
    // rgba 转换为 AARRGGBB
    colorR = pad(parseInt(RegExp.$1, 10).toString(16));
    colorG = pad(parseInt(RegExp.$2, 10).toString(16));
    colorB = pad(parseInt(RegExp.$3, 10).toString(16));
    colorA = pad(parseInt(RegExp.$4 * 255, 10).toString(16));
    ARGB = '"' + '#' + colorA + colorR + colorG + colorB + '"';

    // 插入IE半透明滤镜
    reBefore = decl.raws.before.replace(utils.regBlankLine, '$1');
    insertDecl(decl, i, {
      raws: {
        before: reBefore
      },
      prop: 'filter',
      value: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=' + ARGB + ', endColorstr=' + ARGB + ')\\9'
    });
  }
}

module.exports = useRgbaBgColor;
