// tslint:disable-next-line: no-require-imports
const plantuml = require('plantuml-encoder');
import * as path from 'path';
import { fs } from 'mz';
import * as _ from 'lodash';
import * as fetch from 'node-fetch';
import { listFiles } from '../base/fileDir';

// tslint:disable: no-console

async function fetchUml(src: string): Promise<Buffer> {
  const url = `http://www.plantuml.com/plantuml/img/${plantuml.encode(src)}`;
  return (await fetch.default(url)).buffer();
}

async function generateUml(filePath: string): Promise<void> {
  const { dir, name } = path.parse(filePath);
  const pngFile = path.resolve(dir, name + '.png');
  console.log('Generating', filePath, '-->', pngFile);
  await fs.readFile(filePath, 'utf8')
    .then(fetchUml)
    .then((buffer) => fs.writeFile(pngFile, buffer));
}

function main(): void {
  console.log('Generating PlantUML diagrams ...');
  listFiles('./doc/uml')
    .filter((file) => _.includes(['.puml', '.uml'], path.extname(file)))
    .forEach(generateUml);
}

main();
