#!/bin/bash

echo "Linting..."

format='codeFrame'
if [[ $1 == '--short' ]]; then
  format='verbose'
fi

tslint --fix --format $format --project tsconfig.json
retVal=$?
if [ $retVal -ne 0 ]; then
    echo ">>>>> There are linting errors. Read http://ses-book.sh.cn.ao.ericsson.se/dev/code-quality/ for help."
fi

echo

if [[ -n $1 ]]; then
  echo "Run 'yarn lint' to show detail"
else
  echo "Run 'yarn lint --short' to show violations without code frame"
fi

echo

exit $retVal