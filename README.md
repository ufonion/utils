<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [utils](#utils)
  - [cli](#cli)
    - [`traverseDir`](#traversedir)
      - [Usage](#usage)
  - [lib](#lib)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# utils

Collection of utilities

## cli

### `traverseDir`

Traverse an directory to get a file/directory list or apply a shell command to each file/directory.

#### Usage

```bash
@globefish/utils 0.0.2
Usage: traverseDir [--cmd, -c] [CMD] [--mode, -m] [MODE]
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
```

## lib