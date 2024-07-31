import { importInject, addWindowInjectionStatement } from './localStorageWrapper';

export function replaceWindowWithPrivate(root, jscode) {
  const windows = root.find(jscode.Identifier, { name: 'window' });

  if (windows.size() < 1) { return; }

  importInject(root, jscode);
  addWindowInjectionStatement(root, jscode);

  windows.replaceWith(() => {
    return jscode.memberExpression(
      jscode.thisExpression(),
      jscode.identifier('_window')
    );
  });
}