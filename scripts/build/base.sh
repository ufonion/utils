#!/bin/bash

set -euo pipefail

yarn clean

yarn format &
yarn doc &
yarn tsdoc &
wait

yarn compile

yarn _copylib &
yarn lint &
wait