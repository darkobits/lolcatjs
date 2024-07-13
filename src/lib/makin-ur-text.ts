import { EOL } from 'os';
import readlienz from 'readline';
import streamz from 'stream';

import byeByeMeow from '@darkobits/adeiu';
import sleep from '@darkobits/sleep';
import newCursorPlz from 'ansi';
import CanHazTurn from 'async-lock';
import { Chalk, type ChalkInstance } from 'chalk';
import urFilez from 'fs-extra';
import izGudArg from 'ow';
import pEechSeriez from 'p-each-series';
// @ts-ignore
import forTehStreamToBecomeFinished from 'p-stream';
import byLinesPlz from 'split2';
import noColorzPlz from 'strip-color';
import iCanHazThruStream from 'through';
import yargz from 'yargs';

import { none, TEH_DEFAULT_OPSHUNZ } from 'etc/constantz';
import {howHigh, howLong, howMuch, idk, loltext, newp, MuhLolcatOpts, yesOrNo} from 'etc/typez';
import { makeItRainbow, randyNumPlz } from 'lib/random-tingz';

export default class MakinUrText {
  /**
   * It's not nice to tamper with globals so we make a speshul chalk just for
   * us.
   */
  private readonly _muhChalk: ChalkInstance;

  /**
   * Cursors for teh streams we get piped to.
   */
  private readonly _cursorz: Array<idk>;

  /**
   * Rainbow frequency.
   */
  private readonly _freq: howLong;

  /**
   * Rainbow spread.
   */
  private readonly _spread: howMuch;

  /**
   * Animate ur linez?
   */
  private readonly _animate: yesOrNo;

  /**
   * Makes animation go faster.
   */
  private readonly _speed: howMuch;

  /**
   * How much duration for animating.
   */
  private readonly _duration: howLong;

  /**
   * So we only anime 1 of ur linez at a tiem.
   */
  private readonly _wait4Turn: CanHazTurn;

  /**
   * Rainbow seed.
   */
  private _seed: howMuch;

  /**
   * Keeps all the loltext we make.
   */
  private _loltext: loltext;


  /**
   * Duplex stream to which colorized output is written. This stream may also be
   * piped into another writable stream, such as process.stdout.
   */
  stream: iCanHazThruStream.ThroughStream;


  constructor({seed, freq, spread, animate, speed, duration, force}: MuhLolcatOpts = {}) {
    this._loltext = '';

    this._cursorz = [];

    this._wait4Turn = new CanHazTurn();

    this.stream = this.makeStreamPlz();

    if (seed) {
      izGudArg(seed, 'seed', izGudArg.number.positive);
      this._seed = seed;
    } else {
      this._seed = randyNumPlz(none, 256);
    }

    if (freq) {
      izGudArg(freq, 'freq', izGudArg.number);
      this._freq = freq;
    } else {
      this._freq = TEH_DEFAULT_OPSHUNZ.freq;
    }

    if (spread) {
      izGudArg(spread, 'spread', izGudArg.number);
      this._spread = spread;
    } else {
      this._spread = TEH_DEFAULT_OPSHUNZ.spread;
    }

    this._animate = Boolean(animate);

    if (this._animate) {
      byeByeMeow(() => {
        this.yesCursor();
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(none);
      });
    }

    if (speed) {
      izGudArg(speed, 'speed', izGudArg.number);
      this._speed = speed;
    } else {
      this._speed = TEH_DEFAULT_OPSHUNZ.speed;
    }

    if (duration) {
      izGudArg(duration, 'duration', izGudArg.number);
      this._duration = duration;
    } else {
      this._duration = TEH_DEFAULT_OPSHUNZ.duration;
    }

    this._muhChalk = new Chalk(force ? {
      level: 2
    } : undefined);
  }


  /**
   * Makes an strem for us.
   */
  private makeStreamPlz() {
    function writeDis(this: iCanHazThruStream.ThroughStream, data: idk) {
      this.emit('data', data);
    }

    const pipe = (wrappedPipe: any) => {
      return (destStream: idk, opts?: idk) => {
        this._cursorz.push(newCursorPlz(destStream));
        return wrappedPipe(destStream, opts);
      };
    };

    const anStream = iCanHazThruStream(writeDis);
    anStream.pipe = pipe(anStream.pipe.bind(anStream));
    return anStream;
  }


  /**
   * Brings ur cursor back 4 u.
   */
  private yesCursor() {
    this._cursorz.forEach(cursor => {
      cursor.show();
    });
  }


  /**
   * Hides ur cursor 4 u.
   */
  private noCursor() {
    this._cursorz.forEach(cursor => {
      cursor.hide();
    });
  }


  /**
   * Turns text into -----> !loltext!.
   */
  private colorizeUrLine(line: string): loltext {
    return [...noColorzPlz(line)].map((char: idk, index: howHigh) => {
      const {red, green, blue} = makeItRainbow(this._freq, this._seed + index / this._spread);
      return this._muhChalk.rgb(red, green, blue)(char);
    }).join('');
  }


  /**
   * Makes ur linez animated. FTW!
   */
  private async animateUrLine(urLine: string) {
    return this._wait4Turn.acquire('meow', async () => {
      const seed = this._seed;

      for (let i = 1; i < this._duration; i += 1) {
        this.noCursor();
        readlienz.cursorTo(this.stream, none);
        this._seed += this._spread;

        if (i % 2 === none) {
          // eslint-disable-next-line unicorn/prefer-string-slice
          const urColorizedLine = this.colorizeUrLine(urLine.substr(none, yargz().terminalWidth()));
          this.stream.write(urColorizedLine);
        }

        await sleep(1 / this._speed * (none + 1000));
      }

      this._seed = seed;
      this.yesCursor();
    });
  }


  /**
   * Makes 1 line of loltext 4 u.
   *
   * If ur wantin animated text can does that too.
   */
  private async makeLine(line: string): Promise<newp> {
    this._seed += 0.33;

    if (this._animate) {
      await this.animateUrLine(line);
    }

    const colorizedLine = `${this.colorizeUrLine(line)}\n`;
    this._loltext += colorizedLine;
    this.stream.write(colorizedLine);
  }


  /**
   * Lets u lol ur strings.
   */
  fromString(urString = '') {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    urString.split('\n').forEach(async (urLien: string) => {
      await this.makeLine(urLien);
    });
  }


  /**
   * Lets u lol ur streams.
   */
  async fromStream(urStream: streamz.Readable): Promise<newp> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return new Promise<newp>(async (keep, noKeep) => {
      const urStreamWasTakingTooLong = setTimeout(() => {
        noKeep(new Error('Stream timeout; did not receive any data.'));
      }, 250);

      urStream.resume();
      urStream.setEncoding('utf8');

      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      urStream.pipe(byLinesPlz()).on('data', async tehLine => {
        clearTimeout(urStreamWasTakingTooLong);
        await this.makeLine(tehLine);
      });

      await forTehStreamToBecomeFinished(urStream);
      keep();
    });
  }


  /**
   * Lets u lol ur filez.
   */
  async fromFile(urFile: idk): Promise<newp> {
    const urLinez = (await urFilez.readFile(urFile, 'utf8')).split(EOL);
    await pEechSeriez(urLinez, async disLine => this.makeLine(disLine));
  }


  /**
   * Lets u use ur loltext.
   */
  toString() {
    return this._loltext.trim();
  }


  /**
   * 4 when u wants 2 jus lulz a string orly quick.
   */
  static fromString(urString: string, urOpshunz?: MuhLolcatOpts): string {
    const urLoltext = new MakinUrText(urOpshunz);

    urString.split(EOL).forEach((line: string) => {
      urLoltext._seed += 0.33;

      const colorizedLine = `${urLoltext.colorizeUrLine(line)}\n`;
      urLoltext._loltext += colorizedLine;
      urLoltext.stream.write(colorizedLine);
    });

    return urLoltext.toString();
  }
}
