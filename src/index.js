import {Writable} from 'stream';

import ansi from 'ansi';
import chalk from 'chalk';
import Reader from 'line-by-line';

import {
  DEFAULT_SPREAD,
  DEFAULT_FREQ,
  DEFAULT_SEED,
  DEFAULT_SPEED
} from 'etc/constants';



export default function LolcatJS (input, opts = {}) {
  let output = '';

  // Create a new writable stream that appends to our output string when it is
  // written to.
  const stream = new Writable({
    write(chunk, encoding, callback) {
      output += chunk.toString('utf8');
      callback();
    }
  });

  // Create a new ansi cursor using our stream.
  const cursor = ansi(stream);

  // Merge options with defaults.
  const options = {
    seed: DEFAULT_SEED,
    speed: DEFAULT_SPEED,
    spread: DEFAULT_SPREAD,
    freq: DEFAULT_FREQ,
    ...opts
  };

  function rainbow(freq, i) {
    return {
      red: Math.round(Math.sin(freq * i + 0) * 127 + 128),
      green: Math.round(Math.sin(freq * i + 2 * Math.PI / 3) * 127 + 128),
      blue: Math.round(Math.sin(freq * i + 4 * Math.PI / 3) * 127 + 128)
    };
  }

  function colorize(char, colors) {
    stream.write(chalk.rgb(colors.red, colors.green, colors.blue)(char));
  }

  function printlnPlain(colorize, line) {
    for (let i = 0; i < line.length; i++) {
      colorize(line[i], rainbow(options.freq, options.seed + i / options.spread));
    }
  }

  function println(line) {
    cursor.show();
    printlnPlain(colorize, line);
    stream.write('\n');
  }

  return new Promise((resolve, reject) => {
    if (options.mode === 'string') {
      const string = input || '';
      const lines = string.split('\n');

      lines.forEach(line => {
        options.seed += 1;
        println(line);
        cursor.show();
      });

      stream.end();
      resolve(output);
      return;
    }

    if (options.mode === 'file') {
      const fileReader = new Reader(input);

      fileReader.on('line', line => {
        options.seed += 1;
        println(line);
        cursor.show();
      });

      fileReader.on('end', () => {
        stream.end();
        resolve(output);
      });

      return;
    }

    if (options.mode === 'pipe') {
      process.stdin.resume();
      process.stdin.setEncoding('utf8');

      process.stdin.on('data', data => {
        let lines = data.split('\n');

        lines.forEach(line => {
          options.seed += 1;
          println(line);
        });
      });

      process.stdin.on('end', () => {
        stream.end();

        // Trim trailing newlines.
        resolve(output.replace(/\n$/g, ''));
      });

      return;
    }

    reject(new Error(`[lolcatjs] Unknown mode: ${options.mode}`));
  });
}
