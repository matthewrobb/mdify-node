'use strict';

import fs from 'fs';
import path from 'path';
import test from 'ava';

test.beforeEach(t => {
  t.context.testMd = path.resolve('./test/fixtures/test.md');
  t.context.testDocx = path.resolve('./test/fixtures/test.docx');
});

test.afterEach(t => {
  const files = [t.context.testMd, t.context.testDocx];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    fs.exists(file, exists => {
      if (exists) {
        fs.unlinkSync(file);
      }
    });
  }
});

test.serial('source', t => {
  t.plan(1);

  t.pass();
});
