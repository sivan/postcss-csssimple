/**
 * removeFloat
 * 当存在 position: absolute|fixed, display: flex 时删除多余的 float
 */
function removeFloat(decl) {
  if ((decl.prop === 'position') && (decl.value === 'absolute' || decl.value === 'fixed')) {
    decl.parent.each(function(neighbor) {
      if ((neighbor.prop === 'float') && (neighbor.prop !== 'none')) {
        neighbor.remove();
      }
    });
  }
}

module.exports = removeFloat;
