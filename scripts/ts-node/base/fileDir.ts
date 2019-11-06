import { fs } from 'mz';
import * as path from 'path';
import * as _ from 'lodash';

export function listFiles(filePath: string, maxDepth = 10): string[] {
  if (maxDepth === 0) {
    return [];
  }
  if (!fs.existsSync(filePath)) {
    return [];
  }
  if (fs.lstatSync(filePath).isFile()) {
    return [filePath];
  }
  return _.flatten(
    _.map(fs.readdirSync(filePath), (f) => listFiles(path.join(filePath, f), maxDepth - 1))
  );
}
