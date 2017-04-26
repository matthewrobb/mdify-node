'use strict';

import fs from 'fs';
import path from 'path';
import test from 'ava';
import execa from 'execa';
import stripAnsi from 'strip-ansi';

test.beforeEach(t => {
  t.context.testDocx = path.resolve('./test/fixtures/test.docx');

  t.context.testMd = path.resolve('./test/fixtures/test.md');
  t.context.testHtml = path.resolve('./test/fixtures/test.html');

  t.context.fooMd = path.resolve('./test/fixtures/foo.md');
  t.context.fooHtml = path.resolve('./test/fixtures/foo.html');
});

test.afterEach(t => {
  const files = [
    t.context.testMd,
    t.context.testHtml,
    t.context.fooMd,
    t.context.fooHtml
  ];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    fs.exists(file, exists => {
      if (exists) {
        fs.unlinkSync(file);
      }
    });
  }
});

test.serial('source', async t => {
  t.plan(1);

  await execa('./index.js', [t.context.testDocx]);
  const mdExists = fs.existsSync(t.context.testMd);

  t.true(mdExists, `${t.context.testMd} not created`);
});

test.serial('source + debug', async t => {
  t.plan(2);

  await execa('./index.js', [t.context.testDocx, '--debug']);
  const mdExists = fs.existsSync(t.context.testMd);
  const htmlExists = fs.existsSync(t.context.testHtml);

  t.true(mdExists, `${t.context.testMd} not created`);
  t.true(htmlExists, `${t.context.testHtml} not created`);
});

test.serial('source markdown', async t => {
  t.plan(1);

  await execa('./index.js', [t.context.testDocx]);
  const markdown = fs.readFileSync(t.context.testMd, 'utf8');
  const expected = fs.readFileSync(
    path.resolve('./test/expected/test.md'),
    'utf8'
  );

  t.is(markdown, expected, 'not equal');
});

test.serial('source + silent', async t => {
  t.plan(2);

  const result = await execa('./index.js', [t.context.testDocx, '--silent']);

  t.is(stripAnsi(result.stdout), '');
  t.is(stripAnsi(result.stderr), '');
});

test.serial('source + destination', async t => {
  t.plan(1);

  await execa('./index.js', [t.context.testDocx, t.context.fooMd]);
  const mdExists = fs.existsSync(t.context.fooMd);

  t.true(mdExists, `${t.context.fooMd} not created`);
});

test.serial('source + destination + debug', async t => {
  t.plan(2);

  await execa('./index.js', [t.context.testDocx, t.context.fooMd, '--debug']);
  const mdExists = fs.existsSync(t.context.fooMd);
  const htmlExists = fs.existsSync(t.context.fooHtml);

  t.true(mdExists, `${t.context.fooMd} not created`);
  t.true(htmlExists, `${t.context.fooHtml} not created`);
});

test.serial('source + destination markdown', async t => {
  t.plan(1);

  await execa('./index.js', [t.context.testDocx, t.context.fooMd]);
  const markdown = fs.readFileSync(t.context.fooMd, 'utf8');
  const expected = fs.readFileSync(
    path.resolve('./test/expected/test.md'),
    'utf8'
  );

  t.is(markdown, expected, 'not equal');
});

test.serial('source + destination + silent', async t => {
  t.plan(2);

  const result = await execa('./index.js', [t.context.testDocx, t.context.fooMd, '--silent']);

  t.is(stripAnsi(result.stdout), '');
  t.is(stripAnsi(result.stderr), '');
});
