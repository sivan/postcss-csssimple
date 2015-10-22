'use strict';

// var extend = require('extend');
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-csssimple', function() {
  // var defaults, options;
  //
  // defaults = {
  //  ie: 6
  // };
  // options = extend({}, defaults, opts);
  // console.log(options);

  return function(css) {
    var optimization = require('./lib/optimization/optimizations');
    var fallback = require('./lib/fallback/fallbacks');

    // 遍历 selectors
    css.walkRules(function(rule) {
      fallback.usePseudoElements(rule);
    });

    // 遍历 decl
    css.walkDecls(function(decl, i) {
      optimization.removeDisplay(decl);
      optimization.removeFloat(decl);
      fallback.useOverflowWrap(decl, i);
      fallback.useEllipsis(decl, i);
      fallback.useOpacity(decl, i);
      fallback.useRgbaBgColor(decl, i);
      fallback.useWillChange(decl, i);
      fallback.fixInlineBlock(decl, i);
      fallback.fixIe6DoubleMargin(decl, i);
      fallback.fixIe6Overflow(decl, i);
    });
  };
});
