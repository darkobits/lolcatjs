<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/46057592-3b63d700-c10b-11e8-92ae-f6db8d11c791.jpg">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/lolcatjs"><img src="https://img.shields.io/npm/v/@darkobits/lolcatjs.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/darkobits/lolcatjs"><img src="https://img.shields.io/travis/darkobits/lolcatjs.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/lolcatjs"><img src="https://img.shields.io/david/darkobits/lolcatjs.svg?style=flat-square"></a>
  <a href="https://github.com/conventional-changelog/standard-version"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-e271a5.svg?style=flat-square"></a>
</p>

> This is a fork of [`lolcatjs`](https://github.com/robertboloc/lolcatjs), which itself is a Node port of the [`lolcat`](https://github.com/busyloop/lolcat) Ruby gem.

## Notable Differences from [`lolcatjs`](https://github.com/robertboloc/lolcatjs):

- The dependency on [`sleep`](https://www.npmjs.com/package/sleep) has been removed. This pakcage was a C++ binding that had to be compiled from source, making the original `lolcatjs` a bit unwieldy.
- Code has been significantly... refactored.

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
