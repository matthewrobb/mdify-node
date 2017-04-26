'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const chalk = require('chalk');
const pandoc = require('node-pandoc');
const opn = require('opn');

Promise.promisifyAll(fs); // eslint-disable-line no-use-extend-native/no-use-extend-native

module.exports = class MDify {
  constructor(options) {
    this.options = options || {};
  }

  makeHTML() {
    const ora = this.options.ora;

    pandoc(
      this.options.source,
      `-f docx -t html5 -o ${this.options.debug}`,
      () => {
        if (ora) {
          ora.info(`created HTML ${chalk.blue(this.options.debug)}`);
        }
      }
    );
  }

  makeMD() {
    const ora = this.options.ora;
    const extensions = [
      'backtick_code_blocks',
      'pipe_tables'
    ].join('+');

    if (this.options.debug) {
      this.makeHTML();
    }

    return new Promise((resolve, reject) => {
      pandoc(
        this.options.source,
        `-f docx -t markdown_github+${extensions}-all_symbols_escapable -o ${this.options.destination} --atx-headers`,
        (err, res) => {
          if (err) {
            reject(err);
          }

          const destination = path.resolve(this.options.destination);

          resolve(res);

          if (this.options.open) {
            opn(destination, {
              wait: false
            });

            if (ora) {
              ora.info(
                `opening ${chalk.blue(this.options.destination)} once created`
              );
            }
          }
        }
      );
    });
  }
};
