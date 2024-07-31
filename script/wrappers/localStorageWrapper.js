import { ImportDeclaration } from 'jscodeshift';

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

export function importInject(root, jscode) {
  const coreImports = root.find(ImportDeclaration, { source: { value: '@angular/core' } });

  let [hasInject, addInject] = [false, false];

  if (coreImports.size() > 0) {
    coreImports.forEach(declaration => {
      declaration.value.specifiers.forEach(specifier => {
        if (specifier.local.name === 'inject') {
          hasInject = true;
        }
      });
    });

    if (!hasInject) {
      coreImports.forEach(declaration => {
        declaration.value.specifiers.push(jscode.importSpecifier(jscode.identifier('inject')));
        addInject = true;
      });
    }
  }

  hasInject
  ? console.log('inject is already imported')
  : addInject
      ? console.log('inject has been added to the imports')
      : null;
}

export function addWindowToLocalStorage(root, jscode) {
  const localStorageArray = root.find(jscode.Identifier, { name: 'localStorage' });

  if (localStorageArray.size < 1) return;

    localStorageArray.forEach(path => {
      if (path.parentPath.parentPath.node.object) { return; }

      importInject(root, jscode);
      addWindowInjectionStatement(root, jscode);

      const newMemberExpression = jscode.memberExpression(
        jscode.memberExpression(jscode.thisExpression(), jscode.identifier('_window')),
        jscode.identifier('localStorage')
      );

      jscode(path).replaceWith(newMemberExpression)
    })
}