'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const chalk = require('chalk');
const opn = require('opn');

Promise.promisifyAll(fs); // eslint-disable-line no-use-extend-native/no-use-extend-native

module.exports = class MDify {
  constructor(options) {
    this.options = options || {};
  }

  makeHTML() {
    return new Promise((resolve, reject) => {
      // TODO
    });
  }

  makeMD(html, ora) {
    return new Promise((resolve, reject) => {
      // TODO
    });
  }
};
