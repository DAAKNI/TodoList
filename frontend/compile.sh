#!/bin/bash

npm run build

# react
cp ./node_modules/react/umd/react.development.js build/react.js
cp ./node_modules/react-dom/umd/react-dom.development.js build/react-dom.js
