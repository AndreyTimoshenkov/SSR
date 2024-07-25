import { ImportDeclaration, CallExpression, VariableDeclaration, VariableDeclarator, Decorator  } from 'jscodeshift';

export default function transform(file, api) {
  const jscode = api.jscodeshift;
  const root = jscode(file.source);

  const hasComponentDecorator = root.find(Decorator)
    .filter(path => {
      return path.value.expression.callee.name === 'Component';
    }).size() > 0;

  console.log(hasComponentDecorator)

  // if (!hasComponentDecorator) {
  //   console.log('File is not a component, skipping transformation.');
  //   return file.source;
  // }

  return root.toSource();
}

function importDocument(root, jscode) {
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

function importInject(root, jscode) {
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

function replaceDocument(root) {
  root.find(VariableDeclarator)
    .filter(path => path.value.init.callee.object.name = 'document')
    .forEach(path => path.value.init.callee.object.name = 'this._document');
}