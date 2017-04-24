#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const meow = require('meow');
const Ora = require('ora');
const Promise = require('bluebird');
const MDify = require('./mdify');

Promise.promisifyAll(fs); // eslint-disable-line no-use-extend-native/no-use-extend-native

const cli = meow(
  `  ${chalk.bold('Usage')}
    $ mdify <source> [<destination>] [options]

  ${chalk.bold('Options')}
    --debug   foobar.
    --open    Open the generated markdown file.

  ${chalk.bold('Examples')}
    $ mdify foo.docx
    $ mdify foo.docx foo.md --open
`,
  {
    alias: {
      d: 'debug',
      o: 'open'
    }
  }
);

const ora = new Ora({
  color: 'blue'
});

const failExit = msg => {
  ora.fail(msg);
  process.exit(1);
};

const source = cli.input[0];

if (!source) {
  failExit(`${chalk.dim('<source>')} must be defined`);
}

const destination =
  cli.input[1] ||
  path.resolve(source.slice(0, source.indexOf('.docx')) + '.md');

const debug = cli.flags.debug ?
  destination.slice(0, destination.indexOf('.md')) + '.html' :
  false;

const config = {
  source: path.resolve(source),
  destination,
  debug,
  open: cli.flags.open || false
};

const mdify = new MDify(config);

mdify.makeHTML().then(html => {
  const markdown = mdify.makeMD(html, ora);

  if (debug) {
    ora.info(`created HTML ${chalk.blue(debug)}`);
  }

  Ora.promise(markdown, {
    text: `creating markdown ${chalk.blue(destination)}`
  });
});
