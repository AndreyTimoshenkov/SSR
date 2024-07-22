const fs = require('node:fs');
// const path = require('node:path');
// const directoryPath = './src';
const importStatement =
  `import { WINDOW, DOCUMENT } from '../../../script/windowInjectionToken';
   import { inject } from '@angular/core';`;
const injectionStatement = `\n const _window = inject(WINDOW);
  const _document = inject(DOCUMENT);`

function replaceWindowWithToken(filePath, token) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        const updatedData = data.replace(/\bwindow\b/g, token);

        const modifiedData = !updatedData.includes(importStatement.trim())
          ? importStatement + injectionStatement + updatedData
          : injectionStatement + updatedData;

        fs.writeFile(filePath, modifiedData, 'utf8', (err) => {err
            ? console.error(`Could not write to file ${filePath}:`, err)
            : console.log(`Replaced 'window' with '_window' in ${filePath}`);
        });
    });
}

replaceWindowWithToken('/home/Timoshenkov.AY/Desktop/моё/ssr-testing-app/src/app/some-comp/some-comp.component.ts', '_window');
replaceWindowWithToken('/home/Timoshenkov.AY/Desktop/моё/ssr-testing-app/src/app/some-comp/some-comp.component.ts', '_document');

// function traverseDirectory(dir) {
//     fs.readdir(dir, (err, files) => {
//         if (err) {
//             console.error(`Could not list directory ${dir}:`, err);
//             return;
//         }

//         files.forEach((file) => {
//             const filePath = path.join(dir, file);

//             fs.stat(filePath, (err, stat) => {
//                 if (err) {
//                     console.error(`Could not stat file ${filePath}:`, err);
//                     return;
//                 }

//                 if (stat.isDirectory()) {
//                     traverseDirectory(filePath);
//                 } else if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
//                     replaceWindowWithToken(filePath);
//                 }
//             });
//         });
//     });
// }


