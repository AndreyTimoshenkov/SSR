// import { ImportDeclaration } from 'jscodeshift';
import { importInject } from './documentWrapper';

export function addWindowInjectionStatement(root, j) {

  const importPath = '/home/Timoshenkov.AY/Desktop/mine/ssr-testing-app/script/InjectionTokens';

  const hasWindowImport = root.find(j.ImportDeclaration)
    .filter(path => path.node.source.value === importPath)
    .some(path => path.node.specifiers.some(specifier => specifier.imported.name === 'WINDOW'));

    if (hasWindowImport) { return; }

    const importDeclaration = j.importDeclaration(
      [j.importSpecifier(j.identifier('WINDOW'))],
      j.literal(importPath)
    );

    root.get().node.program.body.unshift(importDeclaration);

    root.find(j.ClassDeclaration).forEach(path => {
      const classBody = path.node.body.body;

      const hasWindowStatement = classBody.some(
        member => member.type === 'ClassProperty' && member.key.name === '_window'
      );

      if (!hasWindowStatement) {
        const windowStatement = j.classProperty(
          j.identifier('_window'),
          j.callExpression(j.identifier('inject'), [j.identifier('WINDOW')])
        );

        windowStatement.accessibility = 'private';
        classBody.unshift(windowStatement);
      }
    });
}



export function hasLocalStorage(root, jscode) {
  return root.find(jscode.Identifier, { name: 'localStorage' }).size() > 1;
}

export function addWindowToLocalStorage(root, jscode) {
  root.find(jscode.Identifier, { name: 'localStorage' }).forEach(
    path => {
      if (path.parentPath.parentPath.node.object) { return; }

      const newMemberExpression = jscode.memberExpression(
        jscode.memberExpression(jscode.thisExpression(), jscode.identifier('_window')),
        jscode.identifier('localStorage')
      );

      jscode(path).replaceWith(newMemberExpression)
    })
}

export function fullReplaceLocalStorage(root, jscode) {
  if (!hasLocalStorage(root, jscode)) { return; }

  importInject(root, jscode);
  addWindowInjectionStatement(root, jscode);
  addWindowToLocalStorage(root, jscode);
}