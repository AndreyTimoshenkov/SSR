import { addInjectionStatement, importDocument, importInject, replaceDocument, hasDocument } from './documentWrapper/documentWrapper';

export default function transform(file, api) {
  const jscode = api.jscodeshift;
  const root = jscode(file.source);

  if (!isComponentFile(root, jscode)) { return; }
  if (!hasDocument(root, jscode)) { return; }

  importDocument(root, jscode);
  importInject(root, jscode);
  addInjectionStatement(root, jscode);
  replaceDocument(root);

  return root.toSource(root);
}

function isComponentFile(root, j) {
  return root.find(j.ClassDeclaration)
    .filter(path => path.node.decorators && path.node.decorators.some(decorator =>
      decorator.expression.callee &&
      decorator.expression.callee.name === 'Component'
    ))
    .size() > 0;
}