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
      if ((neighbor.prop === 'display') && (neighbor.value === 'inline-block')) {
        // 存在时删掉它
        neighbor.remove();
      }
    });
  }
}

module.exports = removeDisplay;
