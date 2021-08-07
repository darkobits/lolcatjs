<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/128600690-29ef818e-dd09-4a83-b7e3-2d0c9f6513ca.png">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/lolcatjs"><img src="https://img.shields.io/npm/v/@darkobits/lolcatjs.svg?style=flat-square"></a>
  <a href="https://github.com/darkobits/lolcatjs/actions?query=workflow%3Aci"><img src="https://img.shields.io/github/workflow/status/darkobits/lolcatjs/ci/master?style=flat-square"></a>
  <a href="https://depfu.com/github/darkobits/lolcatjs"><img src="https://img.shields.io/depfu/darkobits/lolcatjs?style=flat-square"></a>
  <a href="https://bundlephobia.com/package/@darkobits/lolcatjs"><img src="https://img.shields.io/bundlephobia/minzip/@darkobits/lolcatjs?label=size&style=flat-square"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"></a>
</p>

> This is a fork of [`lolcatjs`](https://github.com/robertboloc/lolcatjs), which itself is a Node port of the [`lolcat`](https://github.com/busyloop/lolcat) Ruby gem.

## Install

```
npm install -g @darkobits/lolcatjs
```

## Use (CLI)

![](https://user-images.githubusercontent.com/441546/46057579-2d15bb00-c10b-11e8-9cb4-d72053db041e.jpg)

## Use (Node)

If you just want to synchronously transform a plain string, use the static `fromString` method on the `Printer` class:

```js
import Printer from '@darkobits/lolcatjs';
const input = 'The quick brown fox\njumps over the\nlazy dog.';
const transformed = Printer.fromString(input);
```

If you need to do more exotic things, like transform streams and/or files, you'll want to instantiate a new `Printer`:

```js
import Printer from '@darkobits/lolcatjs';

// Create a new printer.
const printer = new Printer();

// The printer can accept input from strings:
printer.fromString('The quick brown fox jumps over the lazy dog.');

// Or streams (async):
await printer.fromStream(getReadableStreamSomehow());

// Or files (async):
await printer.fromFile('/path/to/muh/file.txt');

// (Or all of the above, in any combination.)

// Output can be read by calling toString():
console.log(printer.toString());

// Or by using the printer in an interpolated string literal:
console.log(`Output: ${printer}`);

// Or, you can pipe it to a writable stream:
printer.stream.pipe(process.stdout);
```

## &nbsp;
<p align="center">
  <br>
  <img width="22" height="22" src="https://cloud.githubusercontent.com/assets/441546/25318539/db2f4cf2-2845-11e7-8e10-ef97d91cd538.png">
</p>
