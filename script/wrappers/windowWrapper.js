import { importInject } from './documentWrapper';
import { addWindowInjectionStatement } from './localStorageWrapper';

export function hasWindow(root, jscode) {
  return root.find(jscode.Identifier, { name: 'window' }).size() > 0;
}

export function replaceWindowWithPrivate(root, jscode) {
  const windows = root.find(jscode.Identifier, { name: 'window' });

  if (windows.size() < 1) { return; }

  windows.replaceWith(() => {
    return jscode.memberExpression(
      jscode.thisExpression(),
      jscode.identifier('_window')
    );
  });
}

export function fullWindowReplace(root, jscode) {
  if (!hasWindow(root, jscode)) { return; }

  importInject(root, jscode);
  addWindowInjectionStatement(root, jscode);
  replaceWindowWithPrivate(root, jscode);
}