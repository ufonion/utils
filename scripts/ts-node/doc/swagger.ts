import * as shelljs from 'shelljs';
import * as path from 'path';
import * as _ from 'lodash';
import { listFiles } from '../base/fileDir';

function generateRedoc(filePath: string): void {
  const inFile = filePath;
  const outFile = path.join(path.dirname(inFile), path.basename(inFile, '.yaml') + '.html');
  console.log('Generating', inFile, '-->', outFile);
  shelljs.exec(`yarn redoc-cli bundle ${inFile} -o ${outFile}`);
}

function main(): void {
  // tslint:disable-next-line: no-console
  console.log('Generating Swagger Redoc ...');
  listFiles('./doc/api/')
    .filter((file) => _.includes(['.yaml'], path.extname(file)))
    .forEach(generateRedoc);
}

main();
