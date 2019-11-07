#!/bin/bash

existing_version=`npm info $npm_package_name version`

if [ "$existing_version" == "$npm_package_version" ]; then
  echo "Version $npm_package_version already existed. Skipping publish."
  exit 1
else
  echo "Publish $npm_package_name@$npm_package_version"
  npm login
  npm publish --access public
fi
