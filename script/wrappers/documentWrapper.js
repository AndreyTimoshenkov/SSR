import { ImportDeclaration, VariableDeclarator } from 'jscodeshift';

export function addDocumentInjectionStatement(root, j) {
  root.find(j.ClassDeclaration).forEach(path => {
    const classBody = path.node.body.body;

    const hasDocumentStatement = classBody.some(
      member => member.type === 'ClassProperty' && member.key.name === '_document'
    );

    if (!hasDocumentStatement) {
      const documentStatement = j.classProperty(
        j.identifier('_document'),
        j.callExpression(j.identifier('inject'), [j.identifier('DOCUMENT')])
      );

      documentStatement.accessibility = 'private';
      classBody.unshift(documentStatement);
    }
  });
}

export function importDocument(root, jscode) {
  const commonImports = root.find(ImportDeclaration, { source: { value: '@angular/common' } });

  let hasDocumentImport = false;

  commonImports.forEach(declaration => {
    declaration.value.specifiers.forEach(specifier => {
      if (specifier.local.name === 'DOCUMENT') {
        hasDocumentImport = true;
      }
    });
  });

  if (hasDocumentImport) {
    console.log('DOCUMENT is already imported');
  } else {
      if (commonImports.size() > 0) {
            commonImports.forEach(declaration => {
            declaration.value.specifiers.push(jscode.importSpecifier(jscode.identifier('DOCUMENT')));
            });
            console.log('DOCUMENT has been added to the existing imports');
      } else {
          const newImport = jscode.importDeclaration(
          [jscode.importSpecifier(jscode.identifier('DOCUMENT'))],
          jscode.literal('@angular/common')
          );
          root.get().node.program.body.unshift(newImport);
          console.log('DOCUMENT import has been added to the imports as a new line');
      }
  }
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

export function replaceDocument(root) {
  root.find(VariableDeclarator)
    .filter(path => path.value.init.callee.object.name = 'document')
    .forEach(path => path.value.init.callee.object.name = 'this._document');
}

export function hasDocument(root, jscode) {
  return root.find(jscode.VariableDeclarator)
    .filter(path =>
      path.value.init.callee.object.name === 'document'
    ).size() > 0;
}

export function fullReplaceDocument(root, jscode) {
  if (hasDocument(root, jscode)) {
    addDocumentInjectionStatement(root, jscode);
    importDocument(root, jscode);
    importInject(root, jscode);
    replaceDocument(root);
   }
}