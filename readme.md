# mdify-node
[![Build Status](https://travis-ci.org/stoe/mdify-node.svg?branch=master)](https://travis-ci.org/stoe/mdify-node) [![Known Vulnerabilities](https://snyk.io/test/github/stoe/mdify-node/1a02fcfc15cd9550c6d5629a6719324d381681e2/badge.svg)](https://snyk.io/test/github/stoe/mdify-node/1a02fcfc15cd9550c6d5629a6719324d381681e2) [![NPM version](https://img.shields.io/npm/v/mdify-node.svg)](https://www.npmjs.com/package/mdify-node) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Convert markdown files to PDF.


## Install
```
$ npm install --global mdify-node
```

_Requires [Node.js](https://nodejs.org) 6+._


## Usage
```shell
Usage
  $ mdify <source> [<destination>] [options]

Options
  --debug   When this is set the intermediate HTML will be saved into a file.
  --open    Open the generated markdown file.

Examples
  $ mdify foo.docx
  $ mdify foo.docx foo.md --open
```


## License [![license](https://img.shields.io/github/license/stoe/mdify-node.svg)](https://github.com/stoe/mdify-node/blob/master/license)
MIT © [Stefan Stölzle](https://github.com/stoe)
