#!/usr/bin/env bash
rm -rf ./dist
npm run build
cd dist
cp index.html 404.html
git init
git remote add origin
git add -A
git commit -m "Build"
git push -f origin master
