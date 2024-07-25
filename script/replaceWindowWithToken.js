const fs = require ('node:fs');
const newImports = [`
import { WINDOW } from '../../../script/InjectionTokens';
import { inject } from '@angular/core';`
];

const injectionStatements = [`
  private _window = inject(WINDOW);
`]

function replaceDocumentWithToken(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) { return console.error(`Error reading file: ${err.message}`); }
    const updatedData = data.replace(/document/g, `this._document`);

    const lines = updatedData.split('\n');

    let [importIndex, injectionIndex] = [0, 0];

    for (let i = 0; i < lines.length; i++) {
      const trimmedLine = lines[i].trim();
      if (!trimmedLine.startsWith('import ') && trimmedLine !== '' && importIndex === 0) {
        importIndex = i;
      }
      if (trimmedLine.startsWith('export class')) {
        injectionIndex = i + 1;
        break;
      }
    }

    const updatedLines = [
      ...lines.slice(0, importIndex),
      ...newImports,
      ...lines.slice(importIndex, injectionIndex),
      ...injectionStatements,
      ...lines.slice(injectionIndex)
    ];

    const updatedContent = updatedLines.join('\n')
    fs.writeFile(filePath, updatedContent, 'utf8', (err) => {err
          ? console.error(`Could not write to file ${filePath}:`, err)
          : console.log(`Replaced document and window in ${filePath}`);
      });
  })
}

// export default replaceDocumentWithToken;

replaceDocumentWithToken('/home/Timoshenkov.AY/Desktop/моё/ssr-testing-app/src/app/some-comp/some-comp.component.ts');