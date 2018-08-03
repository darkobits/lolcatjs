#!/usr/bin/env node

import lolcatjs from 'index';
import chalk from 'chalk';
import supportsColor from 'supports-color';
import yargs from 'yargs';

import {
  DEFAULT_SPREAD,
  DEFAULT_FREQ,
  DEFAULT_SEED,
  DEFAULT_SPEED
} from 'etc/constants';


// Parase command-line arguments.
const argv = yargs
.usage('$0 <file>')
.option('force', {
  alias: 'f',
  type: 'boolean'
})
.option('spread', {
  alias: 'p',
  type: 'number',
  default: DEFAULT_SPREAD
})
.option('freq', {
  alias: 'F',
  type: 'number',
  default: DEFAULT_FREQ
})
.option('seed', {
  alias: 'S',
  type: 'speed',
  default: DEFAULT_SEED
})
.option('speed', {
  alias: 's',
  type: 'number',
  default: DEFAULT_SPEED
})
.version()
.help()
.argv;


function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}


async function init(argv) {
  if (argv.force) {
    chalk.enabled = true;
    chalk.level = supportsColor.supportsColor({isTTY: true}).level;
  }

  const opts = {
    spread: argv.spread,
    freq: argv.freq,
    seed: argv.seed,
    speed: argv.speed
  };

  opts.seed = opts.seed === 0 ? rand(256) : opts.seed;

  if (argv._.length === 0) {
    process.stdout.write(await lolcatjs(null, {...opts, mode: 'pipe'}));
  } else {
    process.stdout.write(await argv._.reduce(async (outputPromise, curFile) => {
      return (await outputPromise) + (await lolcatjs(curFile, {...opts, mode: curFile === '-' ? 'pipe' : 'file'}));
    }, Promise.resolve('')));
  }
}


init(argv);
