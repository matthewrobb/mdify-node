'use strict';

const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const chalk = require('chalk');
const mammoth = require('mammoth');
const md = require('to-markdown');
const opn = require('opn');
const Ora = require('ora');

Promise.promisifyAll(fs); // eslint-disable-line no-use-extend-native/no-use-extend-native

module.exports = class MDify {
  constructor(options) {
    this.options = options || {};
  }

  makeHTML() {
    return new Promise((resolve, reject) => {
      const mammothOptions = {};

      if (this.options.images) {
        const outputDir = path.dirname(path.resolve(this.options.destination));
        let imageIndex = 0;

        mammothOptions.convertImage = mammoth.images.imgElement(element => {
          const [,extension] = element.contentType.split("/");
          const filename = `${++imageIndex}.${extension}`;
          const imagePath = path.join(outputDir, filename);

          return element.read().then(imageBuffer => {
            const promise = fs.writeFileAsync(imagePath, imageBuffer);
            if (!this.options.silent && Ora) {
              Ora.promise(promise, {
                text: `creating image ${chalk.blue(imagePath)}`
              });
            }
            return promise;
          }).then(()=> {
            return {src: filename};
          });
        });
      }

      mammoth
        .convertToHtml({ path: this.options.source }, mammothOptions)
        .then(result => {
          if (this.options.debug) {
            fs.writeFileAsync(this.options.debug, result.value);
          }

          resolve(result.value);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  makeMD(html, ora) {
    return new Promise((resolve, reject) => {
      try {
        const destination = path.resolve(this.options.destination);
        const markdown = md(html, {gfm: true});

        fs.writeFileAsync(this.options.destination, markdown).then(() => {
          resolve(markdown);
        });

        if (this.options.open) {
          opn(destination, {
            wait: false
          });

          if (!this.options.silent && ora) {
            ora.info(
              `opening ${chalk.blue(this.options.destination)} once created`
            );
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  }
};
