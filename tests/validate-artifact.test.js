const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const validator = path.join(root, 'scripts', 'validate-artifact.js');
const validFixture = path.join(root, 'tests', 'fixtures', 'valid-artifact.html');
const invalidFixture = path.join(root, 'tests', 'fixtures', 'invalid-artifact.html');

function runValidator(...files) {
  return spawnSync(process.execPath, [validator, ...files], {
    cwd: root,
    encoding: 'utf8'
  });
}

test('passes a standalone artifact that satisfies the output contract', () => {
  const result = runValidator(validFixture);

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /PASS/);
});

test('fails an artifact with missing metadata and external dependencies', () => {
  const result = runValidator(invalidFixture);
  const output = `${result.stdout}\n${result.stderr}`;

  assert.notEqual(result.status, 0);
  assert.match(output, /Missing doctype/i);
  assert.match(output, /Missing charset/i);
  assert.match(output, /Missing viewport/i);
  assert.match(output, /Empty title/i);
  assert.match(output, /Stylesheet link is not allowed/i);
  assert.match(output, /Script src is not allowed/i);
  assert.match(output, /External image/i);
  assert.match(output, /Missing AI disclaimer/i);
  assert.match(output, /Missing print stylesheet/i);
  assert.match(output, /Missing focus-visible/i);
  assert.match(output, /user-select:\s*none/i);
  assert.match(output, /Fixed width exceeds mobile viewport/i);
});

test('validates multiple files in one command', () => {
  const result = runValidator(validFixture, invalidFixture);
  const output = `${result.stdout}\n${result.stderr}`;

  assert.notEqual(result.status, 0);
  assert.match(output, /valid-artifact\.html: PASS/);
  assert.match(output, /invalid-artifact\.html: FAIL/);
});

test('fails external dependencies in unquoted HTML attributes', () => {
  const { validateHtml } = require('../scripts/validate-artifact.js');
  const failures = validateHtml(`<!doctype html>
    <html lang="en">
    <head>
      <meta charset=utf-8>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Unquoted External Script</title>
      <style>:focus-visible {} @media print {}</style>
    </head>
    <body>
      <main><h1>Example</h1></main>
      <footer><p>AI-generated. Verify critical decisions independently.</p></footer>
      <script src=https://cdn.example.com/app.js></script>
    </body>
    </html>`);

  assert.match(failures.join('\n'), /Script src is not allowed/i);
});

test('fails external URLs inside inline CSS', () => {
  const { validateHtml } = require('../scripts/validate-artifact.js');
  const failures = validateHtml(`<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>External CSS URL</title>
      <style>
        :focus-visible {}
        @media print {}
        body { background-image: url("https://example.com/background.png"); }
      </style>
    </head>
    <body>
      <main><h1>Example</h1></main>
      <footer><p>AI-generated. Verify critical decisions independently.</p></footer>
    </body>
    </html>`);

  assert.match(failures.join('\n'), /External CSS URL/i);
});

test('fails local stylesheet links and local script src attributes', () => {
  const { validateHtml } = require('../scripts/validate-artifact.js');
  const failures = validateHtml(`<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Local Dependencies</title>
      <link rel="stylesheet" href="./artifact.css">
      <style>:focus-visible {} @media print {}</style>
    </head>
    <body>
      <main><h1>Example</h1></main>
      <footer><p>AI-generated. Verify critical decisions independently.</p></footer>
      <script src="./artifact.js"></script>
    </body>
    </html>`);

  const output = failures.join('\n');
  assert.match(output, /Stylesheet link is not allowed/i);
  assert.match(output, /Script src is not allowed/i);
});

test('fails multiple style or script blocks', () => {
  const { validateHtml } = require('../scripts/validate-artifact.js');
  const failures = validateHtml(`<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Multiple Blocks</title>
      <style>:focus-visible {}</style>
      <style>@media print {}</style>
    </head>
    <body>
      <main><h1>Example</h1></main>
      <footer><p>AI-generated. Verify critical decisions independently.</p></footer>
      <script>document.body.dataset.one = 'true';</script>
      <script>document.body.dataset.two = 'true';</script>
    </body>
    </html>`);

  const output = failures.join('\n');
  assert.match(output, /Multiple style blocks/i);
  assert.match(output, /Multiple script blocks/i);
});
