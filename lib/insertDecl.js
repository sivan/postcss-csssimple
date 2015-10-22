/**
 * insertDecls
 * 在后面插入新的属性，并保持注释在当前行。如果传入多个新属性，则分别插入。
 */
module.exports = function(decl, index, newDecls) {
  var next = decl.next();
  var declAfter, i, len;

  if (next && next.type === 'comment' && next.raws.before.indexOf('\n') === -1) {
    declAfter = next;
  } else {
    declAfter = decl;
  }

  if (Object.prototype.toString.call(newDecls) === '[object Array]') {
    for (i = 0, len = newDecls.length; i < len; i += 1) {
      decl.parent.insertAfter(declAfter, newDecls[i]);
    }
  } else {
    decl.parent.insertAfter(declAfter, newDecls);
  }
};
