#!/bin/bash
cd frontend
npm install
npm run build
cd ..
mkdir -p build
cp -R frontend/build/* build/git add .
git commit -m "Fix build directory structure"