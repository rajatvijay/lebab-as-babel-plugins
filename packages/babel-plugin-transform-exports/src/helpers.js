import {matches, extract, extractAny} from "f-matches";

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
    right: extractAny('value')
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
    right: extractAny('value')
  }
});