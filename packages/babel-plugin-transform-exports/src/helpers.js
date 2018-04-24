import {matches} from "f-matches";

/**
 * Utility for extracting values during matching with matches()
 *
 * @param {String} fieldName The name to give for the value
 * @param {Function|Object} matcher Optional matching function or pattern for matches()
 * @param {Object} obj The object to be tested and captured.
 * @return {Boolean|Object} False when no match found.
 */
export function extract(fieldName, matcher) {
  return (ast) => {
    const extractedFields = {[fieldName]: ast};

    if (typeof matcher === 'object') {
      matcher = matches(matcher);
    }

    if (typeof matcher === 'function') {
      const result = matcher(ast);
      if (typeof result === 'object') {
        return Object.assign(extractedFields, result);
      }
      if (!result) {
        return false;
      }
    }

    return extractedFields;
  };
}


const isExports = matches({
  type: 'Identifier',
  name: 'exports'
});

const isModuleExports = matches({
  type: 'MemberExpression',
  computed: false,
  object: {
    type: 'Identifier',
    name: 'module'
  },
  property: isExports
});

export const matchDefaultExports = matches({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    operator: '=',
    left: isModuleExports,
    right: extract('value')
  },
});

export const matchNamedExports = matches({
  type: 'ExpressionStatement',
  expression: {
    type: 'AssignmentExpression',
    operator: '=',
    left: {
      type: 'MemberExpression',
      computed: false,
      object: (ast) => isExports(ast) || isModuleExports(ast),
      property: extract('id', {
        type: 'Identifier'
      })
    },
    right: extract('value')
  }
});