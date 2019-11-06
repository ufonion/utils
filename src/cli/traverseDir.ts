import * as minimist from 'minimist';
import * as minimistOptions from 'minimist-options';
import * as shelljs from 'shelljs';
import { ListMode, listFiles } from '../lib/fsDir';
import * as _ from 'lodash';
import { packageJson } from 'mrm-core';

const progName = 'traverseDir';

const argOptions = minimistOptions.default({
  cmd: {
    type: 'string',
    alias: 'c',
    default: '',
  },
  mode: {
    type: 'string',
    alias: 'm',
    default: 'dir',
  },
  depth: {
    type: 'number',
    alias: 'd',
    default: 1,
  },
  top: {
    type: 'boolean',
    alias: 't',
    default: false,
  },
  version: {
    type: 'boolean',
    default: false,
    alias: 'v',
  },
  help: {
    type: 'boolean',
    default: false,
    alias: 'h',
  },
});

function main(): void {
  const args = minimist(process.argv.slice(2), argOptions);

  if (args.v) {
    printVersion();
    process.exit(0);
  }

  if (args.h) {
    printHelp();
    process.exit(0);
  }

  let dirs = args._;

  if (!dirs || dirs.length === 0) {
    dirs = [process.cwd()];
  }

  let mode: ListMode;

  switch ((<string>args.mode).toLowerCase()) {
    case 'file':
      mode = ListMode.FILE_ONLY;
      break;
    case 'all':
      mode = ListMode.ALL;
      break;
    case 'dir':
    default:
      mode = ListMode.DIR_ONLY;
      break;
  }

  const fileList = _.flatten(dirs.map((dir) => listFiles(dir, {
    mode,
    maxDepth: <number>args.depth,
    includeTopDir: <boolean>args.top,
  })));

  if (args.cmd) {
    fileList.forEach((file) => {
      let cmd = (<string>args.cmd);
      cmd = cmd.replace(/%%DIR%%/g, file);
      const shellString = shelljs.exec(cmd);
      process.stdout.write(shellString.stdout);
      process.stderr.write(shellString.stderr);
    });
  } else {
    fileList.forEach((file) => {
      process.stdout.write(file + '\n');
    });
  }
}

function printVersion(): void {
  const pkgVersion = <string>packageJson().get('version');
  const pkgName = <string>packageJson().get('name');
  process.stdout.write(`${pkgName} ${pkgVersion}\n  - ${progName}\n`);
}

function printHelp(): void {
  const pkgVersion = <string>packageJson().get('version');
  const pkgName = <string>packageJson().get('name');
  const helpMsg =
    `${pkgName} ${pkgVersion}
Usage: ${progName} [--cmd, -c] [CMD] [--mode, -m] [MODE]
          [--depth, -d] [DEPTH] [DIR1] [DIR2] ... [DIRn]

  positional arguments:
    DIRn                        The base directories. If none is present, use current directory.

  optional parameters:
    -h, --help                  Show this help message and exit.
    -v, --version               Show the program version
    -c, --cmd CMD               CMD is the shell command that is used to applied to the file/directory list.
                                Use "%%DIR%%" as a variable macro for each file/directory.
                                If CMD is absent, the prog will only list the files/directories.
    -m, --mode MODE             MODE is the filter of target file/directory list.
                                Valid values: "file", "dir"(default) and "all".
    -d, --depth DEPTH           Traversal depth (default: 1).
    -t, --top                   Indicate whether to include top directory (default: false).

`;
  process.stdout.write(helpMsg);
}

main();
