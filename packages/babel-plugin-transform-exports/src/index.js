import {matchDefaultExports, matchNamedExports} from "./helpers";

module.exports = function (babel) {
  const {types: t} = babel;
  return {
    visitor: {
      ExpressionStatement: function(path) {
        if (path.parent.type === 'Program') {
          let m;
          if ((m = matchDefaultExports(path.node))) {
            path.replaceWith(defaultExport(m));
          } else if ((m = matchNamedExports(path.node))) {
            let transforms = namedExport(m);
            if (transforms) {
              path.replaceWith(namedExport(m));
            }
          }
        }
      }
    }
  }

  function defaultExport({value}) {
    return t.exportDefaultDeclaration(value);
  }

  function namedExport({id, value}) {
    if (t.isFunctionExpression(value) || t.isArrowFunctionExpression(value)) {
      if (compatibleIdentifiers(id, value.id)) {
        return t.exportNamedDeclaration(
          t.functionDeclaration(id, value.params, value.body),
          [t.exportSpecifier(id, id)]
        )
      }
      return false;
    } else if (t.isClassExpression(value)) {
      if (compatibleIdentifiers(id, value.id)) {
        return t.exportNamedDeclaration(
          t.classDeclaration(id, null, value.body, []),
          [t.exportSpecifier(id, id)]
        )
      }
      return false;
    } else if (t.isIdentifier(value)) {
      return t.exportNamedDeclaration(
        null,
        [t.exportSpecifier(value, id)]
      )
    } else {
      return t.exportNamedDeclaration(
        t.variableDeclaration('var', [t.variableDeclarator(id, value)]),
        [t.exportSpecifier(id, id)]
      )
    }
  }

  function compatibleIdentifiers(id1, id2) {
    return !id1 || !id2 || id1.name === id2.name;
  }
}

// export default transformExports;