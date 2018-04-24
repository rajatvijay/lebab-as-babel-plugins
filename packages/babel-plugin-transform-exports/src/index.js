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
            console.log('m', m)
            console.log('named export');
          }
        }
      }
    }
  }

  function defaultExport({value}) {
    return t.exportDefaultDeclaration(value);
  }
}

// export default transformExports;