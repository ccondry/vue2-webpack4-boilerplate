#!/bin/sh
echo "running yarn"
yarn
if [ $? -eq 0 ]; then
  echo "running yarn build..."
  yarn build
  while [ $? != 0 ]
  do
    echo "failed to build go-cms-ui website files. trying again..."
    yarn build
  done
  echo "yarn build successful. copying dist files to www folder..."
  mkdir -p /var/www/html/go-cms-ui
  cp -rf dist/* /var/www/html/go-cms-ui/
  if [ $? -eq 0 ]; then
    echo "successfully installed go-cms-ui website files"
  else
    echo "failed to install go-cms-ui website files"
  fi
else
  echo "yarn failed"
fi
