import { fullReplaceDocument } from './documentWrapper/documentWrapper';
import { addWindowToLocalStorage } from './documentWrapper/windowWrapper';


export default function transform(file, api) {
  const jscode = api.jscodeshift;
  const root = jscode(file.source);


  fullReplaceDocument(root, jscode);
  addWindowToLocalStorage(root, jscode);

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

