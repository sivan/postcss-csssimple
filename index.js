var postcss = require('postcss');

module.exports = postcss.plugin('postcss-csssimple', function(opts) {
  var defaults = {};

  opts = opts || defaults;

  return function(css) {
    var regRGBA = /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d\.]+\s*)/gi;
    var regAllPseudo = /::(before|after|first-line|first-letter)/gi;
    var regBlankLine = /(\r\n|\n|\r)(\s*?\1)+/gi;

    /**
     * insertDecls
     * 在后面插入新的属性，并保持注释在当前行。如果传入多个新属性，则分别插入。
     */
    function insertDecl(decl, i, newDecls) {
      var next = decl.next();
      var declAfter;

      if (next && next.type === 'comment' && next.before.indexOf('\n') === -1) {
        declAfter = next;
      } else {
        declAfter = decl;
      }

      if (Object.prototype.toString.call(newDecls) === '[object Array]') {
        for (var index = 0, len = newDecls.length; index < len; index += 1) {
          decl.parent.insertAfter(declAfter, newDecls[index]);
        }
      } else {
        decl.parent.insertAfter(declAfter, newDecls);
      }
    }

    // 清理无用代码类
    /**
     * removeDisplay
     * 当存在 float: left|right & position: absolute|fixed 时无需写 display: block;
     */
    function removeDisplay(decl) {
      if (
          ((decl.prop === 'position') && (decl.value === 'absolute' || decl.value === 'fixed')) ||
          ((decl.prop === 'float') && (decl.value !== 'none'))
      ) {
        // 不存在 display: none 时删掉 display
        decl.parent.each(function(neighbor) {
          if ((neighbor.prop === 'display') && (neighbor.value === 'block' || neighbor.value === 'inline-block')) {
            //存在时删掉它
            neighbor.removeSelf();
          }
        });
      }
    }

    /**
     * removeFloat
     * 当存在 position: absolute|fixed, display: flex 时删除多余的 float
     */
    function removeFloat(decl) {
      if ((decl.prop === 'position') && (decl.value === 'absolute' || decl.value === 'fixed')) {
        decl.parent.each(function(neighbor) {
          if ((neighbor.prop === 'float') && (neighbor.prop !== 'none')) {
            neighbor.removeSelf();
          }
        });
      }
    }

    // 兼容处理类
    /**
     * usePseudoElements
     * 伪元素选择器只保留一个冒号，兼容低级浏览器。
     */
    function usePseudoElements(css) {
      if (css.selector.match(regAllPseudo)) {
        css.selector = css.selector.replace(/::/g, ':');
      }
    }

    /**
     * useEllipsis
     * 当使用 text-overflow: ellipsis; 时自动处理已保证显示省略号。
     */
    function useEllipsis(decl, i) {
      if (decl.prop === 'text-overflow' && decl.value === 'ellipsis') {
        var reBefore = decl.before.replace(regBlankLine, '$1');
        var declFlag = {
          overflow: false,
          whiteSpace: false
        };

        decl.parent.eachDecl(function(decl) {
          // 如果存在 overflow 且不等于 hidden, 增加 white-space
          if (decl.prop === 'overflow') {
            decl.value = 'hidden';
            declFlag.overflow = true;
          }

          if (decl.prop === 'white-space') {
            decl.value = 'nowrap';
            declFlag.whiteSpace = true;
          }
        });

        if (!declFlag.overflow && !declFlag.whiteSpace) {
          insertDecl(decl, i, [{
              before: reBefore,
              prop: 'overflow',
              value: 'hidden'
            },
            {
              before: reBefore,
              prop: 'white-space',
              value: 'nowrap'
            }
          ]);
        } else if (!declFlag.overflow) {
          insertDecl(decl, i, {
            before: reBefore,
            prop: 'overflow',
            value: 'hidden'
          });
        } else if (!declFlag.whiteSpace) {
          insertDecl(decl, i, {
            before: reBefore,
            prop: 'white-space',
            value: 'nowrap'
          });
        }
      }
    }

    /**
     * useOpacity
     * 转换 opacity 到 IE 支持的 filter 语法
     */
    function useOpacity(decl, i) {
      var amount = Math.round(decl.value * 100);

      if (decl.prop === 'opacity') {
        var reBefore = decl.before.replace(regBlankLine, '$1');

        insertDecl(decl, i, {
          before: reBefore,
          prop: 'filter',
          value: 'alpha(opacity=' + amount + ')\\9'
        });
      }
    }

    /**
     * useRgbaBgColor
     * background rgba 转换为 IE ARGB
     */
    function useRgbaBgColor(decl, i) {
      //十六进制不足两位自动补 0
      function pad(str) {
        return str.length === 1 ? '0' + str : '' + str;
      }

      if ((decl.prop === 'background' || decl.prop === 'background-color') &&
          decl.value.match(regRGBA)) {
        // rgba 转换为 AARRGGBB
        var colorR = pad(parseInt(RegExp.$1).toString(16));
        var colorG = pad(parseInt(RegExp.$2).toString(16));
        var colorB = pad(parseInt(RegExp.$3).toString(16));
        var colorA = pad(parseInt(RegExp.$4 * 255).toString(16));
        var ARGB = '"' + '#' + colorA + colorR + colorG + colorB + '"';

        // 插入IE半透明滤镜
        var reBefore = decl.before.replace(regBlankLine, '$1');
        insertDecl(decl, i, {
          before: reBefore,
          prop: 'filter',
          value: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=' + ARGB + ', endColorstr=' + ARGB + ')\\9'
        });
      }
    }

    // IE Bug 类
    //
    /**
     * fixInlineBlock
     * 当使用 display: inline-block; 时解决 IE6~7 Bug。
     */
    function fixInlineBlock(decl, i) {
      if (decl.prop === 'display' && decl.value === 'inline-block') {
        var reBefore = decl.before.replace(regBlankLine, '$1');
        var declFlag = {
          inline: false,
          zoom: false
        };

        decl.parent.each(function(neighbor) {
          // 有 *display: inline; 或 zoom: 1; 时就不插了
          if (neighbor.before.indexOf('*') !== -1 && neighbor.prop === 'display' && (neighbor.value === 'inline')) {
            declFlag.inline = true;
          }

          if (neighbor.prop === 'zoom' && (neighbor.value === '1')) {
            declFlag.zoom = true;
          }
        });

        if (!declFlag.inline) {
          insertDecl(decl, i, {
            before: reBefore,
            prop: '*display',
            value: 'inline'
          });
        }

        if (!declFlag.zoom) {
          insertDecl(decl, i, {
            before: reBefore,
            prop: '*zoom',
            value: 1
          });
        }
      }
    }

    /**
     * fixIe6DoubleMargin
     * 当存在 float: left|right & margin 不为 0 时增加 _display: inline; 以解决 IE6 双倍边距 bug。
     */
    function fixIe6DoubleMargin(decl, i) {
      if ((decl.prop === 'float') && (decl.value !== 'none')) {
        var reBefore = decl.before.replace(regBlankLine, '$1');

        decl.parent.each(function(neighbor) {
          if ((neighbor.prop === 'margin') && (neighbor.value !== '0')) {
            insertDecl(decl, i, {
              before: reBefore,
              prop: '_display',
              value: 'inline'
            });
          }
        });
      }
    }

    /**
     * fixIe6Overflow
     * 当存在 overflow: hidden 时增加 _zoom: 1; 以解决 IE6 overflow: hidden; 失效 bug。
     */
    function fixIe6Overflow(decl, i) {
      if ((decl.prop === 'overflow') && (decl.value === 'hidden')) {
        var reBefore = decl.before.replace(regBlankLine, '$1');
        var declFlag = {zoom: false};

        decl.parent.each(function(neighbor) {
          if ((neighbor.prop === 'zoom') && (neighbor.value === '1')) {
            declFlag.zoom = true;
          }
        });

        if (!declFlag.zoom) {
          insertDecl(decl, i, {
            before: reBefore,
            prop: '_zoom',
            value: 1
          });
        }
      }
    }

    //遍历 selectors
    css.eachRule(function(rule) {
      usePseudoElements(rule);
    });

    //遍历 decl
    css.eachDecl(function(decl, i) {
      removeDisplay(decl);
      removeFloat(decl);
      useEllipsis(decl, i);
      useOpacity(decl, i);
      useRgbaBgColor(decl, i);
      fixInlineBlock(decl, i);
      fixIe6DoubleMargin(decl, i);
      fixIe6Overflow(decl, i);
    });
  };
});
