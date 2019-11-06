#!/bin/bash

set -euo pipefail

export NODE_ENV=development

yarn clean

echo '>>> Compiling...'

yarn -s compile
yarn _copylib

echo '>>> Testing...'
echo '(Detail log and report are generated under reports folder)'

mkdir -p reports

nyc --reporter=text-summary --reporter=html --report-dir=reports/coverage mocha --exit -r source-map-support/register --reporter mochawesome --reporter-options reportDir=reports/testcase,reportFilename=index,quiet=true 'build/test/**/test-*.js' 3>&2 2>&1 1>&3- | tee reports/testlog.json | bunyan -L -o short -l fatal

nyc check-coverage --lines 80 --functions 80 --statements 80 --branches 65

echo '>>> Linting...'
echo '(Detail report is generated under reports folder)'

set +o pipefail
tslint --format verbose --project tsconfig.json | tee reports/tslint.txt | grep ERROR || true
errors=`grep ERROR reports/tslint.txt | wc -l`
if (( errors > 0 )); then
  echo "There are lint errors"
  exit 1
fi
warnings=`grep WARNING reports/tslint.txt | wc -l`
echo "Lint warnings:" $warnings
if (( warnings > 170 )); then
  echo "Too many lint warnings! Should below 170"
  exit 1
fi

